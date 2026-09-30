/* <ypos-task chapter="vender" task="venda"> — uma tarefa do manual, em acordeão.
   Com demonstração, o passo em curso fica destacado no texto, e tocar num
   passo leva a demonstração até ele. */
(function (Y) {
  'use strict';

  class YposTask extends HTMLElement {
    connectedCallback() {
      if (this._built) return;
      this._built = true;

      const chapter = Y.chapterById(this.getAttribute('chapter'));
      const task = chapter && chapter.tasks.find(t => t.id === this.getAttribute('task'));
      if (!task) return;
      this.task = task;
      this.id = `${chapter.id}--${task.id}`;

      const demo = !this.hasAttribute('no-demo') && task.demo && Y.demos[task.demo];
      // Sem passos escritos, os passos da demonstração servem de lista.
      const steps = task.steps || (demo ? demo.steps.map(s => s.cap) : null);
      const panelId = this.id + '-panel';
      const chipsHtml =
        (steps ? `<span class="chip">${steps.length} passos</span>` : '') +
        (demo ? `<span class="chip video">${Y.icon('play-circle')}Vídeo</span>` : '');

      this.innerHTML =
        `<button class="task-toggle" type="button" aria-expanded="false" aria-controls="${panelId}">` +
        `<span class="task-icon">${Y.icon(task.icon || 'checkbox-blank-circle-outline')}</span>` +
        `<span class="task-label"><h2>${task.title}</h2>${task.summary ? `<p>${task.summary}</p>` : ''}</span>` +
        `<span class="task-chips">${chipsHtml}</span>${Y.icon('chevron-down', 'task-caret')}</button>` +
        `<div class="task-panel" id="${panelId}" role="region" aria-label="${Y.esc(task.title)}"><div>` +
        `<div class="task-body${demo ? ' has-demo' : ''}"><div>` +
        (task.intro ? `<p class="task-intro">${task.intro}</p>` : '') +
        (steps ? Y.ui.steps(steps, !!demo) : '') +
        Y.ui.blocks(task.after) +
        `</div>${demo ? `<ypos-demo demo="${task.demo}"></ypos-demo>` : ''}</div></div></div>`;

      this.toggleBtn = this.querySelector('.task-toggle');
      this.panel = this.querySelector('.task-panel');
      this.items = [...this.querySelectorAll('.steps > li')];
      this.demoEl = this.querySelector('ypos-demo');
      this.setOpen(false);

      this.toggleBtn.addEventListener('click', () => {
        const open = !this.classList.contains('open');
        this.setOpen(open);
        if (open) this.dispatchEvent(new CustomEvent('task-open', {bubbles: true}));
      });

      if (this.demoEl) {
        this.addEventListener('demo-step', e => this.highlight(e.detail.index));
        this.items.forEach((li, n) =>
          li.addEventListener('click', e => {
            if (e.target.closest('a')) return;
            this.demoEl.seek(n);
          }),
        );
      }
    }

    setOpen(open) {
      this.classList.toggle('open', open);
      this.toggleBtn.setAttribute('aria-expanded', String(open));
      // Painel fechado fora da ordem de tabulação e do leitor de ecrã.
      if (open) this.panel.removeAttribute('inert');
      else this.panel.setAttribute('inert', '');
      // Fechar pausa a demonstração; reabrir retoma-a de onde ficou.
      if (!open && this.demoEl && this.demoEl.playing && !this.demoEl.paused) {
        this.demoEl.pause();
        this.demoEl.autoPaused = true;
      }
    }

    highlight(index) {
      this.items.forEach((li, n) => {
        li.classList.toggle('current', n === index);
        li.classList.toggle('past', index >= 0 && n < index);
      });
    }

    /** Abre, desliza até à tarefa e dá-lhe um destaque breve. */
    reveal() {
      this.setOpen(true);
      this.dispatchEvent(new CustomEvent('task-open', {bubbles: true}));
      requestAnimationFrame(() => {
        this.scrollIntoView({behavior: Y.reducedMotion ? 'auto' : 'smooth', block: 'start'});
        this.classList.remove('flash');
        void this.offsetWidth;
        this.classList.add('flash');
      });
    }
  }

  customElements.define('ypos-task', YposTask);
})(window.YPOS);
