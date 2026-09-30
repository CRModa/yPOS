/* Peças de conteúdo sem comportamento: devolvem HTML a partir dos dados. */
(function (Y) {
  'use strict';

  const NOTES = {
    warning: ['alert-outline', 'Atenção'],
    info: ['information-outline', 'Nota'],
    tip: ['lightbulb-on-outline', 'Importante'],
    danger: ['alert-octagon-outline', 'Cuidado'],
  };

  const stepText = s => (typeof s === 'string' ? s : s.text);

  const ui = {
    stepText,

    steps(steps, linked) {
      return (
        `<ol class="steps${linked ? ' linked' : ''}">` +
        steps
          .map((s, n) => {
            const sub = typeof s === 'object' && s.list ? `<ul>${s.list.map(li => `<li>${li}</li>`).join('')}</ul>` : '';
            const hint = linked ? ` title="Ver este passo na demonstração"` : '';
            return `<li data-n="${n}"${hint}><div>${stepText(s)}${sub}</div></li>`;
          })
          .join('') +
        `</ol>`
      );
    },

    note(type, text) {
      const [icon, label] = NOTES[type] || NOTES.info;
      return `<div class="note ${type}" role="note">${Y.icon(icon)}<div><span class="note-label">${label}</span><p>${text}</p></div></div>`;
    },

    table({caption, head, rows, center}) {
      const cell = (v, n) => {
        const cls = center && n > 0 ? ' class="c"' : '';
        if (v === '@yes') return `<td${cls}><span class="yes">${Y.icon('check-circle')}</span><span class="sr-only">Sim</span></td>`;
        if (v === '@no') return `<td${cls}><span class="no">${Y.icon('minus')}</span><span class="sr-only">Não</span></td>`;
        return `<td${cls}>${v}</td>`;
      };
      return (
        `<div class="ref">${caption ? `<div class="ref-caption">${caption}</div>` : ''}<table>` +
        `<thead><tr>${head.map((h, n) => `<th${center && n > 0 ? ' class="c"' : ''}>${h}</th>`).join('')}</tr></thead>` +
        `<tbody>${rows.map(r => `<tr>${r.map(cell).join('')}</tr>`).join('')}</tbody></table></div>`
      );
    },

    list: items => `<ul class="plain-list">${items.map(li => `<li>${li}</li>`).join('')}</ul>`,

    timeline: items =>
      `<div class="timeline">${items.map(t => `<div class="${t.cls}"><strong>${t.t}</strong><p>${t.p}</p></div>`).join('')}</div>`,

    block(b) {
      if (b.note) return ui.note(b.note, b.text);
      if (b.table) return ui.table(b.table);
      if (b.list) return ui.list(b.list);
      if (b.timeline) return ui.timeline(b.timeline);
      if (b.p) return `<p class="task-p">${b.p}</p>`;
      return '';
    },

    blocks: list => (list || []).map(ui.block).join(''),
  };

  Y.ui = ui;
})(window.YPOS);
