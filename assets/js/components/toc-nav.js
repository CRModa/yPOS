/* <ypos-toc> — índice lateral com o progresso de leitura.
   Em ecrãs estreitos é uma gaveta aberta pelo botão do cabeçalho. */
(function (Y) {
  'use strict';

  class YposToc extends HTMLElement {
    connectedCallback() {
      if (this._built) return;
      this._built = true;
      this.setAttribute('aria-label', 'Índice');
      this.scrim = document.querySelector('.toc-scrim');

      this.innerHTML =
        `<div class="toc-progress"><span class="toc-progress-text"></span><div class="toc-progress-bar"><span></span></div></div>` +
        `<nav><ul class="toc-list"><li><a href="#" data-id="">` +
        `<span class="toc-num">${Y.icon('book-open-variant')}</span><span class="toc-title">Capa e índice</span></a></li></ul>` +
        Y.groups
          .map(
            g =>
              `<div class="toc-group eyebrow">${g}</div><ul class="toc-list">${Y.chapters
                .filter(c => c.group === g)
                .map(
                  c =>
                    `<li><a href="#${c.id}" data-id="${c.id}"><span class="toc-num">${String(c.n).padStart(2, '0')}</span>` +
                    `<span class="toc-title">${c.title}</span>${Y.icon('check-circle', 'toc-done')}</a></li>`,
                )
                .join('')}</ul>`,
          )
          .join('') +
        `</nav>`;

      this.links = [...this.querySelectorAll('a[data-id]')];
      this.links.forEach(a => a.addEventListener('click', () => this.setOpen(false)));
      if (this.scrim) this.scrim.addEventListener('click', () => this.setOpen(false));

      Y.on('toc-toggle', () => this.setOpen(!this.classList.contains('open')));
      Y.on('route', ({chapter}) => this.update(chapter));
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape') this.setOpen(false);
      });
      this.update(null);
    }

    setOpen(open) {
      this.classList.toggle('open', open);
      if (this.scrim) this.scrim.classList.toggle('open', open);
      Y.emit('toc-state', open);
    }

    update(current) {
      const visited = Y.store.get('visited', []);
      this.links.forEach(a => {
        const id = a.dataset.id;
        if (id === (current || '')) a.setAttribute('aria-current', 'page');
        else a.removeAttribute('aria-current');
        a.classList.toggle('done', !!id && visited.includes(id));
      });
      const done = Y.chapters.filter(c => visited.includes(c.id)).length;
      this.querySelector('.toc-progress-text').textContent = `${done} de ${Y.chapters.length} capítulos lidos`;
      this.querySelector('.toc-progress-bar span').style.width = (done / Y.chapters.length) * 100 + '%';
    }
  }

  customElements.define('ypos-toc', YposToc);
})(window.YPOS);
