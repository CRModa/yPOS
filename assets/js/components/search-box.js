/* <ypos-search> — pesquisa em todo o manual (capítulos, tarefas, passos e
   mensagens de erro). Setas para escolher, Enter para abrir, "/" para focar. */
(function (Y) {
  'use strict';

  const MAX_RESULTS = 8;

  /** Texto de um bloco de conteúdo (nota, tabela, lista…), para indexar. */
  function blockText(b) {
    if (b.note) return b.text;
    if (b.p) return b.p;
    if (b.list) return b.list.join(' ');
    if (b.timeline) return b.timeline.map(t => t.t + ' ' + t.p).join(' ');
    if (b.table) return [b.table.caption || '', ...b.table.head, ...b.table.rows.flat()].join(' ').replace(/@(yes|no)/g, '');
    return '';
  }

  const stepText = s => (typeof s === 'string' ? s : s.text + ' ' + (s.list || []).join(' '));

  function buildIndex() {
    const entries = [];
    Y.chapters.forEach(ch => {
      entries.push({href: `#${ch.id}`, where: `Capítulo ${ch.n}`, title: ch.title, text: Y.strip(ch.lead)});
      (ch.tasks || []).forEach(t => {
        const parts = [t.summary || '', t.intro || '', ...(t.steps || []).map(stepText), ...(t.after || []).map(blockText)];
        entries.push({href: `#${ch.id}/${t.id}`, where: `${ch.n}. ${ch.title}`, title: t.title, text: Y.strip(parts.join(' '))});
      });
    });
    Y.faq.forEach(f =>
      entries.push({href: '#problemas', where: 'Problemas frequentes', title: Y.strip(f.msg), text: Y.strip(f.ans)}),
    );
    entries.forEach(e => {
      e.nTitle = Y.norm(e.title);
      e.nText = Y.norm(e.text);
    });
    return entries;
  }

  /** Realça as palavras pesquisadas; normalizar mantém um carácter por carácter. */
  function highlight(text, words) {
    const n = Y.norm(text);
    if (n.length !== text.length) return Y.esc(text);
    const marks = [];
    words.forEach(w => {
      let at = n.indexOf(w);
      while (at !== -1) {
        marks.push([at, at + w.length]);
        at = n.indexOf(w, at + w.length);
      }
    });
    marks.sort((a, b) => a[0] - b[0]);
    let out = '';
    let pos = 0;
    marks.forEach(([a, b]) => {
      if (a < pos) return;
      out += Y.esc(text.slice(pos, a)) + '<mark>' + Y.esc(text.slice(a, b)) + '</mark>';
      pos = b;
    });
    return out + Y.esc(text.slice(pos));
  }

  function snippet(text, words) {
    const n = Y.norm(text);
    const at = Math.max(0, n.indexOf(words[0]));
    const start = Math.max(0, at - 40);
    return (start > 0 ? '…' : '') + text.slice(start, start + 150);
  }

  class YposSearch extends HTMLElement {
    connectedCallback() {
      if (this._built) return;
      this._built = true;

      this.innerHTML =
        `<label class="search-field">${Y.icon('magnify')}<span class="sr-only">Pesquisar no manual</span>` +
        `<input type="search" placeholder="Pesquisar no manual…" autocomplete="off" role="combobox" aria-expanded="false" aria-controls="search-results" aria-autocomplete="list">` +
        `<kbd aria-hidden="true">/</kbd></label>` +
        `<div class="search-results" id="search-results" role="listbox"></div>`;

      this.input = this.querySelector('input');
      this.box = this.querySelector('.search-results');
      this.active = -1;
      this.results = [];

      this.input.addEventListener('input', () => this.search());
      this.input.addEventListener('focus', () => {
        this.classList.add('expanded');
        if (this.input.value.trim()) this.search();
      });
      this.input.addEventListener('blur', () => {
        if (!this.input.value) this.classList.remove('expanded');
      });
      this.input.addEventListener('keydown', e => this.onKey(e));
      this.querySelector('.search-field').addEventListener('click', () => this.input.focus());

      document.addEventListener('click', e => {
        if (!this.contains(e.target)) this.close();
      });
      document.addEventListener('keydown', e => {
        const typing = /INPUT|TEXTAREA/.test(document.activeElement.tagName);
        if (e.key === '/' && !typing) {
          e.preventDefault();
          this.input.focus();
        }
      });
    }

    search() {
      if (!this.index) this.index = buildIndex();
      const words = Y.norm(this.input.value).split(/\s+/).filter(w => w.length > 1);
      if (!words.length) return this.close();

      this.results = this.index
        .map(e => {
          let score = 0;
          for (const w of words) {
            const inTitle = e.nTitle.includes(w);
            if (!inTitle && !e.nText.includes(w)) return null;
            score += inTitle ? 3 : 1;
          }
          return {e, score};
        })
        .filter(Boolean)
        .sort((a, b) => b.score - a.score)
        .slice(0, MAX_RESULTS)
        .map(r => r.e);

      this.active = this.results.length ? 0 : -1;
      this.box.innerHTML = this.results.length
        ? this.results
            .map(
              (r, n) =>
                `<a href="${r.href}" role="option" id="sr-${n}" aria-selected="${n === 0}">` +
                `<div class="r-where">${Y.esc(r.where)}</div><div class="r-title">${highlight(r.title, words)}</div>` +
                `<div class="r-snip">${highlight(snippet(r.text, words), words)}</div></a>`,
            )
            .join('')
        : `<div class="search-empty">Nada encontrado para "${Y.esc(this.input.value)}". Experimente outra palavra, por exemplo "troco" ou "recibo".</div>`;
      this.box.querySelectorAll('a').forEach(a => a.addEventListener('click', () => this.close(true)));
      this.box.classList.add('open');
      this.input.setAttribute('aria-expanded', 'true');
      this.syncActive();
    }

    onKey(e) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        if (!this.results.length) return;
        e.preventDefault();
        const d = e.key === 'ArrowDown' ? 1 : -1;
        this.active = (this.active + d + this.results.length) % this.results.length;
        this.syncActive();
      } else if (e.key === 'Enter' && this.active >= 0) {
        e.preventDefault();
        location.hash = this.results[this.active].href;
        this.close(true);
      } else if (e.key === 'Escape') {
        this.input.value = '';
        this.close(true);
      }
    }

    syncActive() {
      this.box.querySelectorAll('a').forEach((a, n) => a.setAttribute('aria-selected', String(n === this.active)));
      if (this.active >= 0) {
        this.input.setAttribute('aria-activedescendant', 'sr-' + this.active);
        const el = this.box.querySelector('#sr-' + this.active);
        if (el) el.scrollIntoView({block: 'nearest'});
      }
    }

    close(blur) {
      this.box.classList.remove('open');
      this.input.setAttribute('aria-expanded', 'false');
      this.input.removeAttribute('aria-activedescendant');
      if (blur) {
        this.input.blur();
        this.classList.remove('expanded');
      }
    }
  }

  customElements.define('ypos-search', YposSearch);
})(window.YPOS);
