/* <ypos-demo demo="venda"> — "vídeo" de instrução animado.
   Reproduz um guião de Y.demos num telemóvel com a réplica da app.
   Emite `demo-step` (detail.index) a cada passo, para o texto do manual
   acompanhar; aceita `seek(index)` para saltar para um passo. */
(function (Y) {
  'use strict';

  const CANCELLED = Symbol('cancelled');
  const TAP_MS = 600;
  const TYPE_MS = 65;

  const delay = ms => new Promise(r => setTimeout(r, ms));

  class YposDemo extends HTMLElement {
    connectedCallback() {
      if (this._built) return;
      this._built = true;
      this.demo = Y.demos[this.getAttribute('demo')];
      if (!this.demo) return;

      this.token = 0;
      this.stepIndex = -1;
      this.playing = false;
      this.paused = false;
      this.played = false;
      this.build();
      this.reset();
      this.render(false);
      this.setCaption(`Toque em ${Y.icon('play')} para ver a demonstração.`);
      this.observe();

      Y.on('theme', () => {
        if (this.playing) return;
        this.state.dark = Y.isDark();
        this.render(false);
      });
    }

    disconnectedCallback() {
      this.token++;
      if (this.io) this.io.disconnect();
    }

    /* ---------- Estrutura ---------- */

    build() {
      const steps = this.demo.steps;
      this.innerHTML =
        `<figure class="demo-fig">` +
        `<div class="demo-tag"><b>${Y.icon('play-circle-outline')} Demonstração</b><span>${steps.length} passos</span></div>` +
        `<div class="phone" role="img" aria-label="Demonstração animada: ${Y.esc(this.demo.title)}"><div class="ph-screen">` +
        `<div class="ph-stage"></div>${Y.app.tabbar()}<div class="ph-over"></div><div class="finger"></div></div></div>` +
        `<div class="demo-bar"><button class="demo-play" type="button" aria-label="Reproduzir">${Y.icon('play')}</button>` +
        `<div class="demo-segs">${steps
          .map((s, n) => `<button class="demo-seg" type="button" data-n="${n}" aria-label="Ir para o passo ${n + 1}"><span></span></button>`)
          .join('')}</div></div>` +
        `<figcaption class="demo-caption" aria-live="polite"></figcaption></figure>`;

      this.phone = this.querySelector('.phone');
      this.screenEl = this.querySelector('.ph-screen');
      this.stage = this.querySelector('.ph-stage');
      this.over = this.querySelector('.ph-over');
      this.tabbar = this.querySelector('.a-tabbar');
      this.finger = this.querySelector('.finger');
      this.playBtn = this.querySelector('.demo-play');
      this.segs = [...this.querySelectorAll('.demo-seg')];
      this.caption = this.querySelector('.demo-caption');

      this.playBtn.addEventListener('click', () => this.toggle());
      this.segs.forEach(seg => seg.addEventListener('click', () => this.seek(Number(seg.dataset.n))));
    }

    observe() {
      if (!('IntersectionObserver' in window)) return;
      this.io = new IntersectionObserver(
        entries => {
          const visible = entries[0].isIntersecting;
          if (visible && !this.played && !Y.reducedMotion) {
            this.play();
          } else if (visible && this.autoPaused) {
            this.autoPaused = false;
            this.resume();
          } else if (!visible && this.playing && !this.paused) {
            this.autoPaused = true;
            this.pause();
          }
        },
        {threshold: 0.6},
      );
      this.io.observe(this.phone);
    }

    /* ---------- Controlo ---------- */

    toggle() {
      if (!this.playing) this.play();
      else if (this.paused) this.resume();
      else this.pause();
    }

    play() {
      this.seek(0);
    }

    pause() {
      this.paused = true;
      this.setPlayIcon();
    }

    resume() {
      this.paused = false;
      this.setPlayIcon();
    }

    /** Recomeça a demonstração a partir do passo `index`. */
    seek(index) {
      this.autoPaused = false;
      this.run(Math.max(0, Math.min(index, this.demo.steps.length - 1)));
    }

    setPlayIcon() {
      const icon = !this.playing ? 'replay' : this.paused ? 'play' : 'pause';
      const label = !this.playing ? 'Repetir' : this.paused ? 'Continuar' : 'Pausar';
      this.playBtn.innerHTML = Y.icon(this.played || this.playing ? icon : 'play');
      this.playBtn.setAttribute('aria-label', label);
    }

    reset() {
      this.state = Object.assign({dark: Y.isDark()}, JSON.parse(JSON.stringify(this.demo.state || {})));
      this.screen = this.demo.start;
      this.curTab = undefined;
      this.stage.innerHTML = '';
      this.unspot();
      this.finger.classList.remove('show', 'press');
      const end = this.screenEl.querySelector('.demo-end');
      if (end) end.remove();
    }

    async run(from) {
      const token = ++this.token;
      this.playing = true;
      this.played = true;
      this.paused = false;
      this.setPlayIcon();
      this.reset();

      // Avança sem animação até ao passo pedido.
      for (let n = 0; n < from; n++) {
        for (const op of this.demo.steps[n].ops) this.apply(op);
      }
      this.state.alert = null;
      this.render(false);

      try {
        for (let n = from; n < this.demo.steps.length; n++) {
          const step = this.demo.steps[n];
          this.setStep(n);
          for (let k = 0; k < step.ops.length; k++) {
            await this.gate(token);
            await this.exec(step.ops[k], token);
            this.setFill(n, (k + 1) / step.ops.length);
          }
          await this.sleep(500, token);
        }
        this.finish();
      } catch (e) {
        if (e !== CANCELLED) throw e;
      }
    }

    finish() {
      this.playing = false;
      this.finger.classList.remove('show');
      this.setPlayIcon();
      const end = document.createElement('div');
      end.className = 'demo-end';
      end.innerHTML = `<button type="button">${Y.icon('replay')}Ver outra vez</button>`;
      end.querySelector('button').addEventListener('click', () => this.play());
      this.screenEl.appendChild(end);
      this.dispatchEvent(new CustomEvent('demo-step', {bubbles: true, detail: {index: -1}}));
    }

    setStep(n) {
      this.stepIndex = n;
      this.segs.forEach((seg, k) => seg.firstElementChild.style.setProperty('--fill', k < n ? '100%' : '0%'));
      const total = this.demo.steps.length;
      this.setCaption(`<b>${n + 1}/${total}</b>${this.demo.steps[n].cap}`);
      this.dispatchEvent(new CustomEvent('demo-step', {bubbles: true, detail: {index: n}}));
    }

    setFill(n, fraction) {
      this.segs[n].firstElementChild.style.setProperty('--fill', Math.round(fraction * 100) + '%');
    }

    setCaption(html) {
      this.caption.innerHTML = html;
    }

    /* ---------- Tempo (respeita a pausa e o cancelamento) ---------- */

    check(token) {
      if (token !== this.token) throw CANCELLED;
    }

    async gate(token) {
      this.check(token);
      while (this.paused) {
        await delay(80);
        this.check(token);
      }
    }

    async sleep(ms, token) {
      let left = ms;
      while (left > 0) {
        const t = Math.min(left, 50);
        await delay(t);
        this.check(token);
        if (!this.paused) left -= t;
      }
    }

    /* ---------- Operações ---------- */

    patch(p) {
      if (!p) return;
      Object.assign(this.state, typeof p === 'function' ? p(this.state) : p);
    }

    /** Aplica o efeito de uma operação sem animação (para saltar passos). */
    apply([kind, a, b]) {
      if (kind === 'go') {
        this.screen = a;
        this.patch(b);
      } else if (kind === 'tap') {
        this.patch(b);
      } else if (kind === 'type') {
        this.state[a] = b;
        this.state.focus = a;
      } else if (kind === 'set') {
        this.patch(a);
      }
    }

    async exec(op, token) {
      const [kind, a, b] = op;
      switch (kind) {
        case 'go':
          this.screen = a;
          this.patch(b);
          this.render(true);
          await this.sleep(380, token);
          break;
        case 'tap':
          await this.tap(a, token);
          this.patch(b);
          this.render(false);
          await this.sleep(260, token);
          break;
        case 'type': {
          await this.tap(a, token);
          this.state.focus = a;
          this.state[a] = '';
          this.render(false);
          for (const ch of b) {
            await this.sleep(TYPE_MS, token);
            this.state[a] += ch;
            this.render(false);
          }
          await this.sleep(250, token);
          break;
        }
        case 'set':
          this.patch(a);
          this.render(false);
          break;
        case 'spot':
          this.spot(a);
          await this.sleep(200, token);
          break;
        case 'unspot':
          this.unspot();
          break;
        case 'scroll': {
          const el = this.find(a);
          if (el) await this.reveal(el, token, true);
          break;
        }
        case 'wait':
          await this.sleep(a, token);
          break;
        default:
          break;
      }
    }

    find(target) {
      const sel = `[data-t="${target}"]`;
      const el =
        this.over.querySelector(sel) ||
        this.tabbar.querySelector(sel) ||
        (this.stage.lastElementChild && this.stage.lastElementChild.querySelector(sel));
      if (!el) console.warn(`[demo ${this.getAttribute('demo')}] alvo não encontrado: ${target}`);
      return el;
    }

    /** Posição do centro de um elemento, em px do ecrã do telemóvel. */
    pointOf(el) {
      const sr = this.screenEl.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      const scale = sr.width / this.screenEl.offsetWidth || 1;
      return {
        x: (r.left - sr.left + r.width / 2) / scale,
        y: (r.top - sr.top + r.height / 2) / scale,
        w: r.width / scale,
        h: r.height / scale,
        left: (r.left - sr.left) / scale,
        top: (r.top - sr.top) / scale,
      };
    }

    /** Desliza a lista do ecrã para o elemento ficar visível. */
    async reveal(el, token, toTop) {
      const box = el.closest('.a-scroll');
      if (!box) return;
      const br = box.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      let delta = 0;
      if (toTop || r.bottom > br.bottom - 8) delta = r.top - br.top - (toTop ? 8 : br.height / 2 - r.height / 2);
      else if (r.top < br.top) delta = r.top - br.top - 8;
      if (Math.abs(delta) < 2) return;
      box.scrollTo({top: box.scrollTop + delta, behavior: 'smooth'});
      await this.sleep(450, token);
    }

    async tap(target, token) {
      const el = this.find(target);
      if (!el) return;
      await this.reveal(el, token);
      const p = this.pointOf(el);
      this.finger.classList.add('show');
      this.finger.style.transform = `translate(${p.x}px, ${p.y}px)`;
      await this.sleep(TAP_MS, token);
      this.finger.classList.add('press');
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = p.x + 'px';
      ripple.style.top = p.y + 'px';
      this.screenEl.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
      await this.sleep(170, token);
      this.finger.classList.remove('press');
    }

    spot(target) {
      const el = this.find(target);
      if (!el) return;
      const p = this.pointOf(el);
      if (!this.spotEl) {
        this.spotEl = document.createElement('div');
        this.spotEl.className = 'spot';
        this.screenEl.appendChild(this.spotEl);
      }
      Object.assign(this.spotEl.style, {
        left: p.left - 4 + 'px',
        top: p.top - 4 + 'px',
        width: p.w + 8 + 'px',
        height: p.h + 8 + 'px',
      });
    }

    unspot() {
      if (this.spotEl) this.spotEl.remove();
      this.spotEl = null;
    }

    /* ---------- Desenho ---------- */

    render(animate) {
      const def = Y.app.screens[this.screen];
      const html = def.render(this.state);
      const current = this.stage.lastElementChild;

      this.phone.classList.toggle('app-dark', !!this.state.dark);
      this.phone.classList.toggle('app-light', !this.state.dark);

      if (animate && current) {
        current.classList.add('leave');
        setTimeout(() => current.remove(), 320);
        const scr = document.createElement('div');
        scr.className = 'scr enter';
        scr.innerHTML = html;
        this.stage.appendChild(scr);
      } else if (current) {
        patchHTML(current, html);
      } else {
        const scr = document.createElement('div');
        scr.className = 'scr';
        scr.innerHTML = html;
        this.stage.appendChild(scr);
      }

      this.setTab(def.tab);
      patchHTML(this.over, Y.app.overlays(this.state));
    }

    setTab(tab) {
      const bar = this.tabbar;
      bar.style.display = tab === null ? 'none' : '';
      if (tab === null) return;
      const idx = Y.app.TABS.findIndex(t => t[0] === tab);
      const secondary = idx < 0;
      bar.querySelector('.a-fabcol').style.opacity = secondary ? 0 : 1;
      bar.querySelector('.a-notch').style.opacity = secondary ? 0 : 1;
      bar.querySelectorAll('.a-tab').forEach((t, n) => t.classList.toggle('active', n === idx));
      if (!secondary && this.curTab !== tab) {
        const [, icon, label] = Y.app.TABS[idx];
        bar.style.setProperty('--i', idx);
        bar.querySelector('.a-fabcircle').innerHTML = Y.icon(icon);
        bar.querySelector('.a-fablabel').textContent = label;
      }
      this.curTab = tab;
    }
  }

  /** Troca o HTML mantendo o scroll e sem repetir animações já vistas. */
  function patchHTML(el, html) {
    const seen = new Set([...el.querySelectorAll('[data-k]')].map(n => n.dataset.k));
    const box = el.querySelector('.a-scroll');
    const top = box ? box.scrollTop : 0;
    el.innerHTML = html;
    el.querySelectorAll('[data-k]').forEach(n => {
      if (seen.has(n.dataset.k)) n.classList.add('held');
    });
    const nbox = el.querySelector('.a-scroll');
    if (nbox) nbox.scrollTop = top;
  }

  customElements.define('ypos-demo', YposDemo);
})(window.YPOS);
