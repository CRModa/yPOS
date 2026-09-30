/* <ypos-faq> — mensagens de erro frequentes, com filtro por texto e por tema. */
(function (Y) {
  'use strict';

  class YposFaq extends HTMLElement {
    connectedCallback() {
      if (this._built) return;
      this._built = true;
      this.cat = null;

      this.innerHTML =
        `<label class="faq-filter">${Y.icon('magnify')}<span class="sr-only">Filtrar problemas</span>` +
        `<input type="search" placeholder="Escreva a mensagem que aparece no ecrã…" autocomplete="off"></label>` +
        `<div class="faq-cats" role="group" aria-label="Temas">` +
        [null, ...Y.faqCategories]
          .map(c => `<button type="button" class="chip" data-cat="${c || ''}" aria-pressed="${c === null}">${c || 'Todos'}</button>`)
          .join('') +
        `</div><ul class="faq"></ul>`;

      this.input = this.querySelector('input');
      this.list = this.querySelector('.faq');
      this.input.addEventListener('input', () => this.renderList());
      this.querySelectorAll('.faq-cats button').forEach(b =>
        b.addEventListener('click', () => {
          this.cat = b.dataset.cat || null;
          this.querySelectorAll('.faq-cats button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
          this.renderList();
        }),
      );
      this.renderList();
    }

    renderList() {
      const words = Y.norm(this.input.value).split(/\s+/).filter(Boolean);
      const items = Y.faq.filter(f => {
        if (this.cat && f.cat !== this.cat) return false;
        const hay = Y.norm(Y.strip(f.msg + ' ' + f.ans));
        return words.every(w => hay.includes(w));
      });
      const open = words.length > 0 && items.length <= 3;
      this.list.innerHTML = items.length
        ? items
            .map(
              f =>
                `<li><details${open ? ' open' : ''}><summary>${Y.icon('alert-circle-outline')}<span class="msg">${f.msg}</span>${Y.icon('chevron-down', 'caret')}</summary>` +
                `<p class="ans">${f.ans}</p></details></li>`,
            )
            .join('')
        : `<li class="faq-none">Nenhuma mensagem encontrada. Veja o fim desta página para contactar o fornecedor.</li>`;
    }
  }

  customElements.define('ypos-faq', YposFaq);
})(window.YPOS);
