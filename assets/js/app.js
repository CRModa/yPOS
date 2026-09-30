/* Arranque: mostra uma página de cada vez conforme o endereço.
     #                 capa e índice
     #vender           capítulo
     #faturas/recibo   capítulo com a tarefa aberta
   Os endereços do manual antigo (#vender, #faturas, …) continuam a funcionar. */
(function (Y) {
  'use strict';

  const main = document.getElementById('main');
  let current = {chapter: undefined};

  function parse() {
    const hash = decodeURIComponent(location.hash.replace(/^#\/?/, ''));
    const [chapter, task] = hash.split('/');
    if (!Y.chapterById(chapter)) return {chapter: null, task: null};
    return {chapter, task: task || null};
  }

  function markVisited(id) {
    const visited = Y.store.get('visited', []);
    if (!visited.includes(id)) Y.store.set('visited', visited.concat(id));
  }

  function route() {
    const {chapter, task} = parse();

    // Mesmo capítulo: só abrir a tarefa pedida (ex.: resultado da pesquisa).
    if (chapter && chapter === current.chapter) {
      const page = main.querySelector('ypos-chapter');
      if (task) page.openTask(task);
      else window.scrollTo({top: 0, behavior: Y.reducedMotion ? 'auto' : 'smooth'});
      return;
    }

    const firstLoad = current.chapter === undefined;
    current = {chapter};
    main.innerHTML = `<article class="sheet${firstLoad ? '' : ' page-enter'}">${
      chapter ? `<ypos-chapter chapter="${chapter}"></ypos-chapter>` : '<ypos-cover></ypos-cover>'
    }</article>`;

    const ch = chapter && Y.chapterById(chapter);
    document.title = ch ? `${ch.n}. ${ch.title} · Manual YPOS` : 'Manual do Utilizador YPOS';
    if (ch) markVisited(ch.id);

    if (task) {
      main.querySelector('ypos-chapter').openTask(task);
    } else {
      if (ch) main.querySelector('ypos-chapter').openTask(null);
      window.scrollTo(0, 0);
    }

    // Leva o foco para o título, para quem navega com teclado ou leitor de ecrã.
    if (!firstLoad) {
      const h1 = main.querySelector('h1');
      if (h1) {
        h1.setAttribute('tabindex', '-1');
        h1.focus({preventScroll: !!task});
      }
    }

    Y.emit('route', {chapter});
  }

  // ← e → mudam de capítulo, como virar a página.
  document.addEventListener('keydown', e => {
    if (e.altKey || e.ctrlKey || e.metaKey || /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    const idx = Y.chapters.findIndex(c => c.id === current.chapter);
    const next = e.key === 'ArrowRight' ? Y.chapters[idx + 1] : idx > 0 ? Y.chapters[idx - 1] : idx === 0 ? {id: ''} : null;
    if (next) location.hash = next.id;
  });

  // Impressão: o manual inteiro, uma folha por capítulo.
  window.addEventListener('beforeprint', () => {
    main.innerHTML =
      `<article class="sheet"><ypos-cover print></ypos-cover></article>` +
      Y.chapters.map(c => `<article class="sheet"><ypos-chapter chapter="${c.id}" print></ypos-chapter></article>`).join('');
    main.querySelectorAll('details').forEach(d => (d.open = true));
  });

  window.addEventListener('afterprint', () => {
    current = {chapter: undefined};
    route();
  });

  window.addEventListener('hashchange', route);
  route();
})(window.YPOS);
