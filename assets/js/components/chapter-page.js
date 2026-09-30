/* <ypos-chapter chapter="faturas"> — uma página do manual: cabeçalho do
   capítulo, tarefas em acordeão (uma aberta de cada vez), notas finais e
   navegação para o capítulo anterior e seguinte. */
(function (Y) {
  'use strict';

  class YposChapter extends HTMLElement {
    connectedCallback() {
      if (this._built) return;
      this._built = true;

      const chapters = Y.chapters;
      const idx = chapters.findIndex(c => c.id === this.getAttribute('chapter'));
      const ch = chapters[idx];
      if (!ch) return;
      const print = this.hasAttribute('print');
      const prev = chapters[idx - 1];
      const next = chapters[idx + 1];
      const tasks = ch.tasks || [];
      const videos = tasks.filter(t => t.demo).length;
      const pad = n => String(n).padStart(2, '0');

      this.innerHTML =
        `<header class="ch-head"><div class="ch-num" aria-hidden="true">${pad(ch.n)}</div>` +
        `<div><div class="eyebrow">Capítulo ${ch.n} · ${ch.group}</div><h1>${ch.title}</h1></div>` +
        `<div class="ch-meta">` +
        `<span>${Y.icon('clock-outline')}${Y.readingMinutes(ch)} min</span>` +
        (tasks.length ? `<span>${Y.icon('format-list-checks')}${tasks.length} ${tasks.length === 1 ? 'tarefa' : 'tarefas'}</span>` : '') +
        (videos ? `<span>${Y.icon('play-circle-outline')}${videos} ${videos === 1 ? 'vídeo' : 'vídeos'}</span>` : '') +
        `</div><p class="ch-lead">${ch.lead}</p></header>` +
        (tasks.length
          ? `<div class="tasks">${tasks
              .map(t => `<ypos-task chapter="${ch.id}" task="${t.id}"${print ? ' no-demo' : ''}></ypos-task>`)
              .join('')}</div>`
          : '') +
        (ch.faq ? `<ypos-faq></ypos-faq>` : '') +
        (ch.after ? `<div class="block">${Y.ui.blocks(ch.after)}</div>` : '') +
        `<nav class="pager" aria-label="Capítulos">` +
        (prev
          ? `<a class="prev" href="#${prev.id}"><small>${Y.icon('arrow-left')} Anterior</small><span>${prev.n}. ${prev.title}</span></a>`
          : `<a class="prev" href="#"><small>${Y.icon('arrow-left')} Anterior</small><span>Capa e índice</span></a>`) +
        (next ? `<a class="next" href="#${next.id}"><small>Seguinte ${Y.icon('arrow-right')}</small><span>${next.n}. ${next.title}</span></a>` : '') +
        `</nav>` +
        `<footer class="sheet-foot"><span>YPOS · Manual de instruções</span><span>Pág. ${pad(ch.n)} / ${pad(chapters.length)}</span></footer>`;

      this.tasks = [...this.querySelectorAll('ypos-task')];

      // Acordeão: abrir uma tarefa fecha as outras, para a página não crescer.
      this.addEventListener('task-open', e => {
        this.tasks.forEach(t => {
          if (t !== e.target) t.setOpen(false);
        });
      });

      if (print) this.tasks.forEach(t => t.setOpen(true));
    }

    /** Abre a tarefa pedida no endereço, ou a primeira. */
    openTask(taskId) {
      const target = taskId && this.tasks.find(t => t.getAttribute('task') === taskId);
      if (target) {
        target.reveal();
      } else if (this.tasks[0]) {
        this.tasks[0].setOpen(true);
      }
    }
  }

  customElements.define('ypos-chapter', YposChapter);
})(window.YPOS);
