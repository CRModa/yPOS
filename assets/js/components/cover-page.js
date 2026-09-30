/* <ypos-cover> — capa do manual: apresentação, o que precisa, o dia a dia
   e o índice. */
(function (Y) {
  'use strict';

  class YposCover extends HTMLElement {
    connectedCallback() {
      if (this._built) return;
      this._built = true;

      const print = this.hasAttribute('print');
      const {kit, day} = Y.cover;
      const videos = Y.chapters.reduce((n, c) => n + (c.tasks || []).filter(t => t.demo).length, 0);
      const minutes = Y.chapters.reduce((n, c) => n + Y.readingMinutes(c), 0);
      const first = Y.chapters[0];
      const pad = n => String(n).padStart(2, '0');

      this.innerHTML =
        `<section class="cover"><div>` +
        `<div class="eyebrow">Manual de instruções · Edição ${new Date().getFullYear()}</div>` +
        `<h1>Venda, controle o stock e fature com o <em>YPOS</em>.</h1>` +
        `<p class="cover-lead">Tudo o que precisa para usar o YPOS na sua loja, passo a passo e com demonstrações animadas. Sem conhecimentos técnicos.</p>` +
        `<div class="cover-meta"><span>${Y.icon('book-open-page-variant-outline')}${Y.chapters.length} capítulos</span>` +
        `<span>${Y.icon('play-circle-outline')}${videos} demonstrações</span>` +
        `<span>${Y.icon('clock-outline')}≈ ${minutes} min de leitura</span></div>` +
        `<div class="cover-actions"><a class="btn btn-primary" href="#${first.id}">${Y.icon('rocket-launch-outline')}Começar pelo capítulo 1</a>` +
        `<a class="btn btn-ghost" href="#vender">${Y.icon('cart-outline')}Fazer uma venda</a></div>` +
        `</div>${print ? '' : '<ypos-demo demo="venda"></ypos-demo>'}</section>` +
        `<section class="block"><div class="block-title"><span class="eyebrow">Antes de começar</span><h2>O que precisa</h2></div>` +
        `<div class="kit">${kit
          .map(
            k =>
              `<div class="kit-item"><span class="kit-icon">${Y.icon(k.icon)}</span><div><h3>${k.title}${k.tag ? ` <span class="kit-tag">(${k.tag})</span>` : ''}</h3><p>${k.text}</p></div></div>`,
          )
          .join('')}</div></section>` +
        `<section class="block"><div class="block-title"><span class="eyebrow">Rotina</span><h2>O dia a dia em 5 passos</h2></div>` +
        `<ol class="day">${day
          .map(
            d =>
              `<li><a href="#${d.go}"><span class="day-dot">${Y.icon(d.icon)}</span><span><span class="day-when">${d.when}</span><span class="day-what">${d.what}</span></span></a></li>`,
          )
          .join('')}</ol></section>` +
        `<section class="block"><div class="block-title"><span class="eyebrow">Conteúdo</span><h2>Índice</h2></div><div class="index-cols">` +
        Y.groups
          .map(
            g =>
              `<div class="index-group"><div class="eyebrow">${g}</div><ol>${Y.chapters
                .filter(c => c.group === g)
                .map(
                  c =>
                    `<li><a href="#${c.id}"><span class="index-name">${c.n}. ${c.title}</span><span class="index-dots"></span><span class="index-num">${pad(c.n)}</span></a></li>`,
                )
                .join('')}</ol></div>`,
          )
          .join('') +
        `</div></section>` +
        `<footer class="sheet-foot"><span>YPOS · Manual de instruções</span><span>Capa</span></footer>`;
    }
  }

  customElements.define('ypos-cover', YposCover);
})(window.YPOS);
