/* <ypos-header> — marca, pesquisa, imprimir, tema e botão do índice. */
(function (Y) {
  'use strict';

  class YposHeader extends HTMLElement {
    connectedCallback() {
      if (this._built) return;
      this._built = true;

      this.innerHTML =
        `<button class="icon-btn menu-btn" type="button" aria-label="Abrir índice" aria-expanded="false">${Y.icon('menu')}</button>` +
        `<a class="brand" href="#"><span class="brand-mark">${Y.icon('point-of-sale')}</span>` +
        `<span class="brand-text"><strong>YPOS</strong><span>Manual de instruções</span></span></a>` +
        `<ypos-search></ypos-search>` +
        `<button class="icon-btn print-btn" type="button" aria-label="Imprimir o manual" title="Imprimir o manual">${Y.icon('printer-outline')}</button>` +
        `<button class="icon-btn theme-btn" type="button"></button>`;

      const menuBtn = this.querySelector('.menu-btn');
      menuBtn.addEventListener('click', () => Y.emit('toc-toggle'));
      Y.on('toc-state', open => {
        menuBtn.setAttribute('aria-expanded', String(open));
        menuBtn.innerHTML = Y.icon(open ? 'close' : 'menu');
      });

      this.querySelector('.print-btn').addEventListener('click', () => window.print());

      this.themeBtn = this.querySelector('.theme-btn');
      this.themeBtn.addEventListener('click', () => {
        const dark = !Y.isDark();
        document.documentElement.dataset.theme = dark ? 'dark' : 'light';
        Y.store.set('theme', dark ? 'dark' : 'light');
        this.syncTheme();
        Y.emit('theme', dark);
      });
      this.syncTheme();
    }

    syncTheme() {
      const dark = Y.isDark();
      this.themeBtn.innerHTML = Y.icon(dark ? 'white-balance-sunny' : 'weather-night');
      this.themeBtn.setAttribute('aria-label', dark ? 'Mudar para modo claro' : 'Mudar para modo escuro');
    }
  }

  customElements.define('ypos-header', YposHeader);
})(window.YPOS);
