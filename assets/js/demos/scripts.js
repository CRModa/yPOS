/* Guiões das demonstrações.
   Cada demo tem `steps`; o passo N da demo corresponde ao passo N da tarefa
   no manual (ou, se a tarefa não tiver passos, `cap` é mostrado como passo).
   Operações:
     ['go', ecrã, patch?]      muda de ecrã (com transição)
     ['tap', alvo, patch?]     o dedo toca em [data-t=alvo] e aplica o patch
     ['type', campo, texto]    toca no campo e escreve letra a letra
     ['set', patch]            muda o estado sem tocar
     ['spot', alvo] / ['unspot']  destaca um elemento
     ['scroll', alvo]          desliza o ecrã até ao alvo
     ['wait', ms]
   Um patch pode ser um objeto ou uma função (estado) => objeto. */
(function (Y) {
  'use strict';

  const addCart = id => s => ({cart: {...s.cart, [id]: ((s.cart || {})[id] || 0) + 1}});
  const subCart = id => s => ({cart: {...s.cart, [id]: ((s.cart || {})[id] || 0) - 1}});
  const noFocus = {focus: null};

  Y.demos = {
    ativar: {
      title: 'Ativar a licença',
      start: 'ativar',
      steps: [
        {cap: 'Ao abrir pela primeira vez, aparece o ecrã Ativar YPOS.', ops: [['wait', 900], ['spot', 'idbox'], ['wait', 1400], ['unspot']]},
        {cap: 'Toque em Enviar e mande o ID pelo WhatsApp.', ops: [['tap', 'enviar', {sheet: 'share'}], ['wait', 900], ['tap', 'wa', {sheet: null}], ['wait', 500]]},
        {
          cap: 'O fornecedor responde com o código de licença.',
          ops: [['set', {notif: {t: 'Fornecedor YPOS', m: 'YPOS1.8F2KQ7.X9LM3PA4TZ'}}], ['wait', 2200], ['set', {notif: null}]],
        },
        {cap: 'Cole o código (ou use Ler QR code).', ops: [['type', 'codigo', 'YPOS1.8F2KQ7.X9LM3PA4TZ'], ['wait', 400]]},
        {
          cap: 'Toque em Ativar licença.',
          ops: [
            ['tap', 'ativarbtn', {focus: null, lic: 'ok'}],
            ['wait', 500],
            ['set', {alert: {t: 'Licença ativada', m: 'Licença válida até 30/09/2027.'}}],
            ['wait', 1600],
          ],
        },
      ],
    },

    setup: {
      title: 'Configurar a empresa',
      start: 'setup1',
      steps: [
        {cap: 'Escreva o nome da empresa (e, se quiser, o NUIT).', ops: [['type', 'emp', 'Mercearia Central, Lda'], ['type', 'nuit', '400123456']]},
        {cap: 'Toque em Seguinte.', ops: [['tap', 'seguinte', noFocus], ['go', 'setup2']]},
        {
          cap: 'Crie a conta do administrador.',
          ops: [
            ['type', 'anome', 'Ana Macuácua'],
            ['type', 'aemail', 'ana@mercearia.co.mz'],
            ['type', 'asenha', '2468'],
            ['type', 'aconf', '2468'],
          ],
        },
        {cap: 'Toque em Concluir: abre o ecrã de vendas.', ops: [['tap', 'concluir', noFocus], ['go', 'pos'], ['wait', 1200]]},
      ],
    },

    login: {
      title: 'Entrar',
      start: 'login',
      steps: [
        {cap: 'Escreva o e-mail e a senha.', ops: [['type', 'email', 'ana@mercearia.co.mz'], ['type', 'senha', '2468']]},
        {cap: 'Toque em Entrar.', ops: [['tap', 'entrar', noFocus], ['go', 'pos'], ['wait', 1200]]},
      ],
    },

    tour: {
      title: 'A barra de baixo',
      start: 'pos',
      steps: [
        {cap: '<b>Venda</b> (ao centro): fazer vendas. O YPOS abre sempre aqui.', ops: [['spot', 'tab-venda'], ['wait', 2000], ['unspot']]},
        {cap: '<b>Painel</b>: vendas, lucros e relatórios.', ops: [['tap', 'tab-painel'], ['go', 'painel'], ['wait', 1600]]},
        {cap: '<b>Produtos</b>: criar, editar e ver o stock.', ops: [['tap', 'tab-produtos'], ['go', 'produtos'], ['wait', 1600]]},
        {cap: '<b>Compras</b>: mercadoria comprada aos fornecedores.', ops: [['tap', 'tab-compras'], ['go', 'compras'], ['wait', 1600]]},
        {cap: '<b>Faturas</b>: faturas a clientes e pagamentos.', ops: [['tap', 'tab-faturas'], ['go', 'faturas'], ['wait', 1600]]},
      ],
    },

    topo: {
      title: 'O canto superior direito',
      start: 'pos',
      steps: [
        {cap: '<b>Empresa</b>: dados da empresa (só o administrador inicial).', ops: [['spot', 'empresa'], ['wait', 1800], ['unspot']]},
        {cap: '<b>Impressora</b>: ligar a impressora de talões.', ops: [['spot', 'printer'], ['wait', 1800], ['unspot']]},
        {
          cap: '<b>Sol / lua</b>: modo claro ou escuro.',
          ops: [['tap', 'theme', s => ({dark: !s.dark})], ['wait', 1300], ['tap', 'theme', s => ({dark: !s.dark})], ['wait', 600]],
        },
        {cap: '<b>O seu nome</b>: Clientes, Fornecedores, Utilizadores, Licença e Sair.', ops: [['tap', 'avatar', {menu: true}], ['wait', 2600]]},
      ],
    },

    produto: {
      title: 'Criar um produto',
      start: 'pos',
      steps: [
        {cap: 'Toque em Produtos.', ops: [['tap', 'tab-produtos'], ['go', 'produtos'], ['wait', 500]]},
        {cap: 'Toque no botão +.', ops: [['tap', 'fab'], ['go', 'produtoForm'], ['wait', 300]]},
        {cap: 'Em TIPO, deixe Simples.', ops: [['spot', 'tipo-Simples'], ['wait', 1300], ['unspot']]},
        {
          cap: 'Preencha nome, categoria, preços e stock.',
          ops: [
            ['type', 'pnome', 'Farinha 2kg'],
            ['tap', 'cat-Mercearia', {cat: 'Mercearia', focus: null}],
            ['type', 'ppreco', '150,00'],
            ['type', 'pcusto', '110,00'],
            ['type', 'pest', '30'],
            ['type', 'pmin', '5'],
          ],
        },
        {cap: 'Toque em Salvar.', ops: [['tap', 'salvar', noFocus], ['go', 'produtos', {novo: true}], ['wait', 1600]]},
      ],
    },

    composto: {
      title: 'Criar um produto composto',
      start: 'produtos',
      steps: [
        {cap: 'Toque em + e escreva o nome.', ops: [['wait', 400], ['tap', 'fab'], ['go', 'produtoForm'], ['type', 'pnome', 'Cesta básica']]},
        {cap: 'Em TIPO, escolha Composto.', ops: [['tap', 'tipo-Composto', {tipo: 'Composto', focus: null}], ['wait', 500]]},
        {cap: 'Categoria e preço de venda.', ops: [['tap', 'cat-Mercearia', {cat: 'Mercearia'}], ['type', 'ppreco', '790,00']]},
        {
          cap: 'Escolha cada componente e a quantidade.',
          ops: [
            ['tap', 'c0', {c0: 'Arroz 5kg', focus: null}],
            ['type', 'cq0', '1'],
            ['tap', 'addcomp', {nc: 2, focus: null}],
            ['tap', 'c1', {c1: 'Óleo 1L'}],
            ['type', 'cq1', '1'],
            ['tap', 'addcomp', {nc: 3, focus: null}],
            ['tap', 'c2', {c2: 'Açúcar 1kg'}],
            ['type', 'cq2', '2'],
          ],
        },
        {
          cap: 'Stock e custo calculados sozinhos. Salvar.',
          ops: [
            ['set', noFocus],
            ['spot', 'compres'],
            ['wait', 1800],
            ['unspot'],
            ['tap', 'salvar'],
            ['go', 'produtos', {novoComp: true}],
            ['wait', 1600],
          ],
        },
      ],
    },

    servico: {
      title: 'Criar um serviço',
      start: 'produtos',
      steps: [
        {
          cap: 'Toque em + e, em TIPO, escolha Serviço.',
          ops: [['wait', 400], ['tap', 'fab'], ['go', 'produtoForm'], ['tap', 'tipo-Serviço', {tipo: 'Serviço', nc: 0}], ['wait', 500]],
        },
        {
          cap: 'Nome do serviço, categoria e preço.',
          ops: [['type', 'pnome', 'Embrulho para presente'], ['tap', 'cat-Serviços', {cat: 'Serviços', focus: null}], ['type', 'ppreco', '50,00']],
        },
        {cap: 'Custo da mão de obra (opcional).', ops: [['type', 'pcusto', '20,00']]},
        {
          cap: 'Materiais que cada serviço gasta (opcional).',
          ops: [
            ['set', noFocus],
            ['tap', 'addcomp', {nc: 1}],
            ['tap', 'c0', {c0: 'Papel de embrulho'}],
            ['type', 'cq0', '1'],
            ['set', noFocus],
            ['spot', 'compres'],
            ['wait', 1500],
            ['unspot'],
          ],
        },
        {cap: 'Toque em Salvar.', ops: [['tap', 'salvar'], ['go', 'produtos', {novoServ: true}], ['wait', 1600]]},
      ],
    },

    substituir: {
      title: 'Restaurar por cima dos dados atuais',
      start: 'pos',
      steps: [
        {cap: 'O seu nome → Backup e restauro.', ops: [['tap', 'avatar', {menu: true}], ['wait', 500], ['tap', 'm-backup', {menu: false}], ['go', 'backupScr'], ['wait', 500]]},
        {
          cap: 'Escolher ficheiro e restaurar → escolha o backup.',
          ops: [['tap', 'restaurarbk', {sheet: 'picker'}], ['wait', 700], ['tap', 'file1', {sheet: null}], ['wait', 300]],
        },
        {
          cap: 'Leia o aviso e toque em Restaurar.',
          ops: [
            [
              'set',
              {
                alert: {
                  t: 'Restaurar backup?',
                  m:
                    'Empresa: Mercearia Central\nCriado em: 04/10/2026, 18:30\n152 produtos/serviços · 1240 vendas · 87 faturas · 46 clientes · 3 utilizadores\n\n' +
                    'TODOS os dados atuais deste aparelho serão substituídos pelos do backup. Esta ação não pode ser desfeita.',
                  btns: [['Cancelar', 'cancelar'], ['Restaurar', 'restaurarok']],
                },
              },
            ],
            ['wait', 2600],
            ['tap', 'restaurarok', {alert: null}],
            ['wait', 600],
            ['go', 'login', {alert: {t: 'Backup restaurado', m: 'Entre com um utilizador do backup.'}}],
            ['wait', 1300],
            ['tap', 'ok', {alert: null}],
          ],
        },
        {
          cap: 'Entre com um utilizador do backup.',
          ops: [['type', 'email', 'ana@mercearia.co.mz'], ['type', 'senha', '2468'], ['tap', 'entrar', noFocus], ['go', 'pos'], ['wait', 1000]],
        },
      ],
    },

    backup: {
      title: 'Criar um backup',
      start: 'pos',
      steps: [
        {cap: 'O seu nome → Backup e restauro.', ops: [['tap', 'avatar', {menu: true}], ['wait', 500], ['tap', 'm-backup', {menu: false}], ['go', 'backupScr'], ['wait', 600]]},
        {cap: 'Toque em Criar backup.', ops: [['tap', 'criarbk', {sheet: 'shareFile'}], ['wait', 900]]},
        {cap: 'Escolha onde guardar: aqui, o Google Drive.', ops: [['tap', 'drive', {sheet: null, toast: 'Guardado no Drive'}], ['wait', 1800]]},
      ],
    },

    restaurar: {
      title: 'Passar para outro telemóvel',
      start: 'setup1',
      steps: [
        {cap: 'Com a licença ativa, aparece Bem-vindo ao YPOS.', ops: [['set', {toast: 'Licença ativada'}], ['wait', 1600], ['set', {toast: null}]]},
        {cap: 'Toque em Restaurar a partir de um backup.', ops: [['tap', 'restaurar', {sheet: 'picker'}], ['wait', 600]]},
        {cap: 'Escolha o ficheiro de backup.', ops: [['tap', 'file1', {sheet: null}], ['wait', 300]]},
        {
          cap: 'Confira o resumo e toque em Restaurar.',
          ops: [
            [
              'set',
              {
                alert: {
                  t: 'Restaurar este backup?',
                  m: 'Empresa: Mercearia Central\nCriado em: 04/10/2026, 18:30\n152 produtos/serviços · 1240 vendas · 87 faturas · 46 clientes · 3 utilizadores\n\nNo fim, entre com um utilizador do backup.',
                  btns: [['Cancelar', 'cancelar'], ['Restaurar', 'restaurarok']],
                },
              },
            ],
            ['wait', 2200],
            ['tap', 'restaurarok', {alert: null}],
            ['wait', 700],
            ['set', {alert: {t: 'Backup restaurado', m: 'Entre com um utilizador do backup.'}}],
            ['wait', 1200],
            ['tap', 'ok', {alert: null}],
          ],
        },
        {
          cap: 'Entre com um utilizador do backup.',
          ops: [['go', 'login'], ['type', 'email', 'ana@mercearia.co.mz'], ['type', 'senha', '2468'], ['tap', 'entrar', noFocus], ['go', 'pos'], ['wait', 1000]],
        },
      ],
    },

    ajuste: {
      title: 'Acertar o stock',
      start: 'produtos',
      steps: [
        {cap: 'Abra o produto e toque em Ajustar.', ops: [['tap', 'prod-4'], ['go', 'produtoDet'], ['wait', 500], ['tap', 'ajustar', {sheet: 'ajuste'}], ['wait', 400]]},
        {cap: 'Escolha o tipo: aqui, Perda.', ops: [['tap', 'tipo-Perda', {tipo: 'Perda'}], ['wait', 400]]},
        {cap: 'Escreva a quantidade e o motivo.', ops: [['type', 'qtd', '1'], ['type', 'motivo', 'Garrafa partida']]},
        {
          cap: 'Confira o novo stock e confirme.',
          ops: [
            ['set', noFocus],
            ['spot', 'novo'],
            ['wait', 1400],
            ['unspot'],
            ['tap', 'confirmar-aj', {sheet: null, estoque: 2, toast: 'Estoque ajustado'}],
            ['wait', 1800],
          ],
        },
      ],
    },

    venda: {
      title: 'Fazer uma venda',
      start: 'pos',
      state: {cart: {}},
      steps: [
        {cap: 'Toque em Venda, ao centro da barra.', ops: [['tap', 'tab-venda'], ['wait', 600]]},
        {
          cap: 'Toque nos produtos: cada toque soma uma unidade.',
          ops: [['tap', 'p-1', addCart(1)], ['tap', 'p-3', addCart(3)], ['tap', 'p-3', addCart(3)], ['tap', 'p-4', addCart(4)]],
        },
        {cap: 'Corrija com − e +.', ops: [['tap', 'minus-3', subCart(3)], ['wait', 500]]},
        {cap: 'Confira o total e toque em Finalizar Venda.', ops: [['spot', 'total'], ['wait', 1100], ['unspot'], ['tap', 'finalizar', {sheet: 'pay'}]]},
        {cap: 'Escreva quanto o cliente entregou.', ops: [['type', 'pago', '1000']]},
        {
          cap: 'Toque em Confirmar: aparece o troco.',
          ops: [
            ['tap', 'confirmar', {sheet: null, focus: null, cart: {}, pago: '', alert: {t: 'Venda concluída', m: 'Troco: 335,00 MZN'}}],
            ['wait', 2000],
          ],
        },
      ],
    },

    compra: {
      title: 'Registar uma compra',
      start: 'pos',
      steps: [
        {cap: 'Toque em Compras.', ops: [['tap', 'tab-compras'], ['go', 'compras'], ['wait', 400]]},
        {cap: 'Toque no botão +.', ops: [['tap', 'fab'], ['go', 'compraForm']]},
        {cap: 'Escolha o fornecedor.', ops: [['tap', 'forn-Distribuidora Maputo', {forn: 'Distribuidora Maputo'}]]},
        {cap: 'Tipo Produto, e escolha o produto.', ops: [['spot', 'tipo-Produto'], ['wait', 900], ['unspot'], ['tap', 'cprod', {cprod: 'Arroz 5kg'}]]},
        {cap: 'Quantidade e preço unitário.', ops: [['type', 'cqtd', '10'], ['type', 'cpreco', '380']]},
        {cap: 'Mais linhas com Adicionar item; Remover tira-as.', ops: [['tap', 'additem', {linha2: true, focus: null}], ['wait', 700], ['tap', 'remover2', {linha2: false}]]},
        {cap: 'Confira o total e toque em Salvar Compra.', ops: [['spot', 'ctotal'], ['wait', 1000], ['unspot'], ['tap', 'salvarc'], ['go', 'compras', {nova: true}], ['wait', 1500]]},
      ],
    },

    fatura: {
      title: 'Emitir uma fatura',
      start: 'faturas',
      steps: [
        {cap: 'Em Faturas, toque no botão +.', ops: [['wait', 500], ['tap', 'fab'], ['go', 'faturaForm']]},
        {cap: 'Escolha o cliente.', ops: [['tap', 'cliente', {cliente: 'João Tembe'}]]},
        {cap: 'Vencimento (opcional).', ops: [['type', 'venc', '2026-10-30']]},
        {cap: 'Junte os itens.', ops: [['tap', 'fsel', {fsel: 'Óleo 1L', focus: null}], ['type', 'fqtd', '6']]},
        {cap: 'Toque em Salvar Fatura.', ops: [['tap', 'salvarf', noFocus], ['go', 'faturas', {nova: true}], ['wait', 1600]]},
      ],
    },

    recibo: {
      title: 'Registar um recibo',
      start: 'faturas',
      steps: [
        {cap: 'Toque na fatura.', ops: [['wait', 500], ['tap', 'fat-1'], ['go', 'faturaDet'], ['wait', 400]]},
        {cap: 'Escreva o valor recebido (pode ser parcial).', ops: [['type', 'valor', '500']]},
        {cap: 'Escolha a forma de pagamento.', ops: [['tap', 'fp-M-Pesa', {fp: 'M-Pesa', focus: null}]]},
        {
          cap: 'Toque em Registrar Recibo: a fatura fica Parcialmente Paga.',
          ops: [['tap', 'registrar', {recibos: 1, valor: '', toast: 'Recibo registado'}], ['wait', 600], ['scroll', 'recibos'], ['wait', 1800]],
        },
      ],
    },

    painel: {
      title: 'Painel',
      start: 'painel',
      steps: [
        {cap: 'Escolha o período.', ops: [['wait', 600], ['tap', 'per-7 dias', {per: '7 dias'}], ['wait', 900]]},
        {cap: 'Leia os cartões.', ops: [['spot', 'kpis'], ['wait', 2200], ['unspot']]},
        {
          cap: 'No fim do dia: Hoje → Imprimir resumo do dia.',
          ops: [['tap', 'per-Hoje', {per: 'Hoje'}], ['wait', 500], ['tap', 'resumo', {sheet: 'resumo'}], ['wait', 2600]],
        },
      ],
    },

    impressora: {
      title: 'Ligar a impressora',
      start: 'pos',
      steps: [
        {cap: 'Ligue a impressora e o Bluetooth.', ops: [['set', {toast: 'Bluetooth ativado'}], ['wait', 1500], ['set', {toast: null}]]},
        {cap: 'Toque no ícone da Impressora.', ops: [['tap', 'printer', {sheet: 'imp', scan: true}], ['wait', 500]]},
        {
          cap: 'Autorize o Bluetooth: Permitir.',
          ops: [
            ['set', {alert: {t: 'Permitir que YPOS encontre dispositivos próximos?', m: '', btns: [['Não permitir', 'negar'], ['Permitir', 'permitir']]}}],
            ['wait', 700],
            ['tap', 'permitir', {alert: null}],
            ['wait', 1100],
            ['set', {scan: false, devices: true}],
          ],
        },
        {cap: 'Toque no nome da impressora.', ops: [['wait', 500], ['tap', 'dev-1', {ligada: true}], ['wait', 600]]},
        {cap: 'Testar impressão: sai um talão.', ops: [['tap', 'testar', {print: true}], ['wait', 2600]]},
      ],
    },

    utilizador: {
      title: 'Criar um utilizador',
      start: 'pos',
      steps: [
        {cap: 'O seu nome → Utilizadores.', ops: [['tap', 'avatar', {menu: true}], ['wait', 500], ['tap', 'm-usuarios', {menu: false}], ['go', 'usuarios']]},
        {cap: 'Toque em +.', ops: [['tap', 'fab'], ['go', 'userForm']]},
        {
          cap: 'Nome, e-mail e senha.',
          ops: [['type', 'unome', 'Carlos Nhantumbo'], ['type', 'uemail', 'carlos@mercearia.co.mz'], ['type', 'usenha', '1357']],
        },
        {cap: 'Escolha o perfil.', ops: [['tap', 'perfil-Vendedor', {perfil: 'Vendedor', focus: null}]]},
        {cap: 'Toque em Salvar.', ops: [['tap', 'usalvar'], ['go', 'usuarios', {novo: true}], ['wait', 1500]]},
      ],
    },

    renovar: {
      title: 'Renovar a licença',
      start: 'pos',
      state: {banner: true, lic: 'warn'},
      steps: [
        {cap: 'Toque em Renovar na faixa de aviso.', ops: [['wait', 900], ['tap', 'renovar'], ['go', 'licenca', {banner: false}], ['wait', 700]]},
        {cap: 'Envie o ID ao fornecedor.', ops: [['tap', 'enviar', {sheet: 'share'}], ['wait', 900], ['tap', 'wa', {sheet: null}]]},
        {cap: 'Cole o novo código.', ops: [['type', 'codigo', 'YPOS1.3HT9QW.K2VB7NZ8RY']]},
        {
          cap: 'Toque em Renovar licença.',
          ops: [['tap', 'ativarbtn', {focus: null, lic: 'ok'}], ['wait', 500], ['set', {alert: {t: 'Licença ativada', m: 'Licença válida até 30/09/2027.'}}], ['wait', 1600]],
        },
      ],
    },
  };
})(window.YPOS);
