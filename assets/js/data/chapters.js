/* Conteúdo do manual.
   Cada capítulo tem tarefas; cada tarefa tem passos e, se tiver `demo`, uma
   animação cujos passos correspondem um a um aos passos escritos.
   Blocos em `after`: {note, text} | {table} | {list} | {p} | {timeline}. */
(function (Y) {
  'use strict';

  Y.cover = {
    kit: [
      {icon: 'cellphone', title: 'Um telemóvel', text: 'Android ou iPhone, com o YPOS instalado. Não precisa de internet para vender.'},
      {icon: 'key-outline', title: 'Uma licença', text: 'Um código do seu fornecedor, só para o seu telemóvel, no plano Basic, Plus ou Premium.'},
      {icon: 'printer-outline', title: 'Impressora', tag: 'opcional', text: 'Térmica Bluetooth de 58 mm, para imprimir os talões.'},
    ],
    day: [
      {icon: 'store-clock-outline', when: 'Ao abrir', what: 'Entre e confirme a impressora', go: 'impressora'},
      {icon: 'cart-outline', when: 'A cada cliente', what: 'Venda no POS', go: 'vender'},
      {icon: 'truck-delivery-outline', when: 'Chega mercadoria', what: 'Registe em Compras', go: 'compras'},
      {icon: 'file-document-outline', when: 'Venda a crédito', what: 'Emita uma fatura', go: 'faturas'},
      {icon: 'weather-night', when: 'Ao fechar', what: 'Imprima o resumo e saia', go: 'painel'},
    ],
  };

  Y.groups = ['Introdução', 'Operações', 'Análise', 'Configuração', 'Ajuda'];

  Y.chapters = [
    {
      id: 'primeiros-passos',
      n: 1,
      group: 'Introdução',
      icon: 'rocket-launch-outline',
      title: 'Primeiros passos',
      lead: 'Na primeira vez: <b>ativar a licença</b> e <b>configurar a empresa</b> (ou restaurar um backup). Depois disso, basta entrar com o seu e-mail e senha.',
      tasks: [
        {
          id: 'ativar',
          icon: 'key-outline',
          title: 'Ativar a licença',
          summary: 'Só na primeira vez',
          demo: 'ativar',
          steps: [
            'Abra o YPOS. Aparece o ecrã <b>Ativar YPOS</b>.',
            'Em <b>ID DESTE APARELHO</b>, toque em <b>Enviar</b> e mande o código ao seu fornecedor, por exemplo por WhatsApp.',
            'O fornecedor responde com um código de licença, em texto ou QR code.',
            'Toque em <b>Ler QR code</b> e aponte a câmara, ou cole o texto em <b>CÓDIGO DE LICENÇA</b>.',
            'Toque em <b>Ativar licença</b>. Aparece a mensagem "Licença ativada".',
          ],
          after: [{note: 'warning', text: 'A licença fica presa a este telemóvel. Se mudar de telemóvel, peça uma nova licença ao fornecedor.'}],
        },
        {
          id: 'empresa',
          icon: 'domain',
          title: 'Configurar a empresa',
          summary: 'Só na primeira vez',
          demo: 'setup',
          steps: [
            'Em <b>Dados da empresa</b>, escreva o nome. O NUIT, o telefone e o endereço são opcionais, mas aparecem nas faturas e nos talões.',
            'Toque em <b>Seguinte</b>.',
            'Crie a conta do <b>Administrador da empresa</b>: nome, e-mail e uma senha com pelo menos 4 caracteres, repetida em <b>Confirmar senha</b>.',
            'Toque em <b>Concluir</b>. O YPOS entra na sua conta e abre o ecrã de vendas.',
          ],
          after: [
            {note: 'tip', text: 'Guarde bem este e-mail e esta senha. É a <b>conta principal</b>: a que tem mais poderes e a única que entra no plano Basic.'},
            {note: 'info', text: 'Já usava o YPOS noutro telemóvel? Em vez de preencher, toque em <b>Restaurar a partir de um backup</b> (<a href="#backup/restaurar">capítulo 11</a>).'},
          ],
        },
        {
          id: 'entrar',
          icon: 'login',
          title: 'Entrar nas vezes seguintes',
          summary: 'Todos os dias',
          demo: 'login',
          steps: [
            'Escreva o seu <b>E-MAIL</b> e a sua <b>SENHA</b>.',
            'Toque em <b>Entrar</b>. O YPOS abre sempre no ecrã de vendas (<b>POS</b>).',
          ],
        },
      ],
    },

    {
      id: 'ecra',
      n: 2,
      group: 'Introdução',
      icon: 'cellphone-screenshot',
      title: 'Conhecer o ecrã',
      lead: 'Muda de área com a <b>barra de baixo</b>. Os ícones do <b>canto superior direito</b> dão acesso às definições e ao seu menu. Só aparece o que o seu perfil e o seu plano permitem.',
      tasks: [
        {
          id: 'barra',
          icon: 'dock-bottom',
          title: 'A barra de baixo',
          summary: 'As áreas do YPOS',
          demo: 'tour',
          after: [
            {
              table: {
                head: ['Botão', 'Para que serve'],
                rows: [
                  ['<b>Venda</b> (ao centro)', 'Fazer vendas no ecrã <b>POS</b>'],
                  ['<b>Painel</b>', 'Ver as vendas, os lucros e os relatórios'],
                  ['<b>Produtos</b>', 'Produtos, compostos e serviços, e o stock'],
                  ['<b>Compras</b>', 'Registar a mercadoria comprada. <i>Só Gestor e Administrador</i>'],
                  ['<b>Faturas</b>', 'Faturas a clientes e pagamentos. <i>Planos Plus e Premium</i>'],
                ],
              },
            },
            {note: 'info', text: 'Com o perfil <b>Vendedor</b> não aparece <b>Compras</b>; no plano <b>Basic</b> não aparece <b>Faturas</b>. A área onde está fica no círculo verde, por cima da barra.'},
          ],
        },
        {
          id: 'topo',
          icon: 'dots-horizontal-circle-outline',
          title: 'O canto superior direito',
          summary: 'Definições e o seu menu',
          demo: 'topo',
          after: [
            {
              table: {
                head: ['Ícone', 'Para que serve'],
                rows: [
                  ['<b>Empresa</b>', 'Mudar os dados da empresa. Só aparece para a conta principal'],
                  ['<b>Impressora</b>', 'Ligar a impressora de talões por Bluetooth'],
                  ['<b>Sol / lua</b>', 'Mudar entre o modo claro e o modo escuro'],
                  [
                    '<b>O seu nome</b>',
                    'Menu com <b>Clientes</b>, <b>Fornecedores</b>, <b>Utilizadores</b> (administradores, Plus e Premium), <b>Backup e restauro</b> (administradores), <b>Licença</b> e <b>Sair</b>',
                  ],
                ],
              },
            },
            {p: 'Para voltar atrás em Clientes, Fornecedores ou Utilizadores, toque na seta no canto superior esquerdo.'},
          ],
        },
      ],
    },

    {
      id: 'produtos',
      n: 3,
      group: 'Operações',
      icon: 'package-variant-closed',
      title: 'Produtos e serviços',
      lead: 'Crie os produtos antes de vender. Há três tipos: <b>Simples</b>, <b>Composto</b> e <b>Serviço</b>. Depois disso, cada venda, compra e fatura atualiza o stock sozinha.',
      tasks: [
        {
          id: 'tipos',
          icon: 'shape-outline',
          title: 'Os três tipos',
          summary: 'Qual escolher',
          after: [
            {
              table: {
                head: ['Tipo', 'Como funciona o stock', 'Exemplo'],
                rows: [
                  ['<b>Simples</b>', 'Tem stock próprio: sobe com as compras e desce com as vendas', 'Arroz 5kg'],
                  ['<b>Composto</b>', 'Feito de outros produtos. O stock é calculado a partir dos componentes, e vender baixa cada componente', 'Cesta básica'],
                  ['<b>Serviço</b>', 'Sem stock. Pode gastar materiais, que descem a cada venda. <i>Só no plano Premium</i>', 'Entrega, montagem'],
                ],
              },
            },
            {
              table: {
                caption: 'Etiquetas na lista de produtos',
                head: ['Etiqueta', 'O que quer dizer'],
                rows: [
                  ['<span class="badge warn">Estoque baixo</span>', 'Chegou ao stock mínimo: reponha'],
                  ['<span class="badge ok">Composto</span>', 'Produto feito de componentes'],
                  ['<span class="badge ok">Serviço</span>', 'Sem stock próprio'],
                  ['<span class="badge">Oculto no POS</span>', 'Não aparece para vender (ver abaixo)'],
                  ['<span class="badge">Inativo</span>', 'Desativado: não aparece para vender'],
                ],
              },
            },
            {note: 'info', text: 'Com o perfil <b>Vendedor</b>, a aba <b>Produtos</b> é só de consulta: não cria, não edita e não ajusta stock.'},
          ],
        },
        {
          id: 'criar',
          icon: 'plus-box-outline',
          title: 'Criar um produto simples',
          summary: 'Nome, categoria, preço e stock',
          demo: 'produto',
          steps: [
            'Toque em <b>Produtos</b> na barra de baixo.',
            'Toque no botão redondo <kbd>+</kbd>, no canto inferior direito.',
            'Em <b>TIPO</b>, deixe <b>Simples</b>.',
            {
              text: 'Preencha os campos:',
              list: [
                '<b>NOME DO PRODUTO</b>, por exemplo "Arroz 5kg".',
                '<b>CATEGORIA</b>: escolha uma, ou escreva uma em <b>Nova categoria</b> e toque em <b>Adicionar</b>.',
                '<b>PREÇO DE VENDA</b>: o que o cliente paga.',
                '<b>CUSTO DE PRODUÇÃO</b>: quanto lhe custou. Sem ele, o Painel não calcula o lucro.',
                '<b>ESTOQUE INICIAL</b>: quanto tem agora na loja.',
                '<b>ESTOQUE MÍNIMO</b>: abaixo disto, o YPOS avisa que está a acabar.',
              ],
            },
            'Toque em <b>Salvar</b>.',
          ],
          after: [{note: 'info', text: 'Obrigatórios: <b>nome</b>, <b>categoria</b> e <b>preço de venda</b>.'}],
        },
        {
          id: 'composto',
          icon: 'package-variant-plus',
          title: 'Criar um produto composto',
          summary: 'Cestas, kits, combos',
          demo: 'composto',
          intro: 'Um composto junta vários produtos simples num só. Os componentes têm de existir antes.',
          steps: [
            'Em <b>Produtos</b>, toque em <kbd>+</kbd> e escreva o nome, por exemplo "Cesta básica".',
            'Em <b>TIPO</b>, escolha <b>Composto</b>.',
            'Escolha a <b>CATEGORIA</b> e escreva o <b>PREÇO DE VENDA</b>.',
            'Em <b>COMPONENTES (POR UNIDADE)</b>, escolha cada componente e a quantidade que leva. Para mais, toque em <b>Adicionar componente</b>.',
            'Confira o <b>Stock disponível</b> e o <b>Custo</b>, calculados sozinhos, e toque em <b>Salvar</b>.',
          ],
          after: [
            {note: 'tip', text: 'O stock de um composto é quantas unidades os componentes permitem montar. Para o aumentar, compre ou ajuste os <b>componentes</b>.'},
            {note: 'info', text: 'Só produtos simples podem ser componentes: um composto ou um serviço não pode entrar noutro composto.'},
          ],
        },
        {
          id: 'servico',
          icon: 'hand-heart-outline',
          title: 'Criar um serviço',
          summary: 'Plano Premium',
          demo: 'servico',
          steps: [
            'Em <b>Produtos</b>, toque em <kbd>+</kbd> e, em <b>TIPO</b>, escolha <b>Serviço</b>.',
            'Escreva o <b>NOME DO SERVIÇO</b>, a <b>CATEGORIA</b> e o <b>PREÇO DE VENDA</b>.',
            'Se quiser, indique o <b>CUSTO DO SERVIÇO (MÃO DE OBRA, OPCIONAL)</b>, para o lucro ficar certo.',
            'Em <b>MATERIAIS CONSUMIDOS (OPCIONAL)</b>, toque em <b>Adicionar material</b> para cada produto que o serviço gasta. Sem materiais, vender o serviço não mexe no stock.',
            'Toque em <b>Salvar</b>.',
          ],
          after: [{note: 'warning', text: 'O tipo <b>Serviço</b> só aparece no plano <b>Premium</b>. Se o plano descer, os serviços ficam guardados mas deixam de aparecer para vender.'}],
        },
        {
          id: 'ocultar',
          icon: 'eye-off-outline',
          title: 'Esconder um item do POS',
          summary: 'Itens só para componentes',
          intro: 'Útil para coisas que só usa como componente ou material, como caixas ou sacos.',
          steps: [
            'Abra a ficha do produto (ou crie-o).',
            'Desligue <b>Mostrar no painel de vendas</b>.',
            'Toque em <b>Salvar alterações</b>. Fica com a etiqueta <span class="badge">Oculto no POS</span>.',
          ],
          after: [{p: 'O item sai do POS e das faturas novas, mas continua em <b>Produtos</b> e em <b>Compras</b>.'}],
        },
        {
          id: 'editar',
          icon: 'pencil-outline',
          title: 'Procurar e editar um produto',
          summary: 'Pesquisa, ficha e unidade',
          steps: [
            'Escreva parte do nome em <b>Buscar produto...</b>.',
            'Toque no produto para abrir a ficha.',
            'Altere o que precisar, incluindo a <b>UNIDADE DE MEDIDA</b> (UN, KG, L…) ou os componentes.',
            'Toque em <b>Salvar alterações</b>.',
          ],
        },
        {
          id: 'ajustar',
          icon: 'swap-vertical',
          title: 'Acertar o stock à mão',
          summary: 'Contagens, danos e perdas',
          demo: 'ajuste',
          intro: 'Use quando a contagem na prateleira não bate certo com o YPOS, ou quando um produto se estragou.',
          steps: [
            'Abra a ficha do produto e toque em <b>Ajustar</b>, ao lado de <b>ESTOQUE ATUAL</b>.',
            {
              text: 'Escolha o <b>TIPO DE MOVIMENTO</b>:',
              list: ['<b>Entrada</b>: somar ao stock.', '<b>Saída</b>: tirar do stock.', '<b>Perda</b>: tirar por dano, validade ou roubo.'],
            },
            'Escreva a <b>QUANTIDADE</b> e o <b>MOTIVO</b>, por exemplo "Contagem física".',
            'Confira o <b>Novo estoque após o ajuste</b> e toque em <b>Confirmar ajuste</b>.',
          ],
          after: [
            {note: 'warning', text: 'Um ajuste não pode deixar o stock negativo. Mercadoria comprada regista-se em <b>Compras</b>, não aqui.'},
            {note: 'info', text: 'Não há <b>Ajustar</b> em compostos e serviços (ajuste os componentes ou materiais), nem para o perfil <b>Vendedor</b>.'},
          ],
        },
      ],
    },

    {
      id: 'vender',
      n: 4,
      group: 'Operações',
      icon: 'cart-outline',
      title: 'Vender no POS',
      lead: 'Uma venda faz-se em quatro toques: escolher os produtos, <b>Finalizar Venda</b>, indicar o valor recebido e <b>Confirmar</b>.',
      tasks: [
        {
          id: 'venda',
          icon: 'cash-register',
          title: 'Fazer uma venda',
          summary: 'O essencial do dia a dia',
          demo: 'venda',
          steps: [
            'Toque no botão central <b>Venda</b>, na barra de baixo.',
            'Toque num produto para o pôr no carrinho. Cada toque soma uma unidade. Use <b>Buscar produto...</b> para encontrar depressa.',
            'No carrinho, use <kbd>−</kbd> e <kbd>+</kbd> para corrigir quantidades. Em zero, o produto sai do carrinho.',
            'Confira o total e toque em <b>Finalizar Venda</b>.',
            'Em <b>VALOR PAGO (OPCIONAL)</b>, escreva quanto o cliente entregou. Se pagou o valor certo, deixe vazio.',
            'Toque em <b>Confirmar</b>. Aparece <b>Venda concluída</b> com o troco, e o talão sai na impressora.',
          ],
          after: [
            {note: 'warning', text: 'Se a impressora não responder, a venda fica gravada na mesma. A mensagem diz apenas "Recibo não impresso".'},
            {
              list: [
                'Um ícone amarelo junto ao stock indica que o produto está a acabar.',
                'Os serviços mostram <b>Serviço</b> em vez do stock.',
                'Vender um <b>composto</b> baixa o stock de cada componente; vender um <b>serviço</b> baixa os materiais que consome.',
                'Não aparece um produto? Pode estar <a href="#produtos/ocultar">oculto no POS</a>, inativo, ou ser um serviço fora do plano Premium.',
                'Para desistir do pagamento, toque em <b>Cancelar</b>: os produtos continuam no carrinho.',
                'No POS o pagamento fica sempre como <b>Dinheiro</b>. Para M-Pesa, e-Mola, cartão ou transferência, use uma <a href="#faturas/recibo">fatura com recibo</a>.',
              ],
            },
          ],
        },
      ],
    },

    {
      id: 'compras',
      n: 5,
      group: 'Operações',
      icon: 'truck-delivery-outline',
      title: 'Compras e fornecedores',
      lead: 'Quando chega mercadoria, registe-a em <b>Compras</b>: o stock sobe, o custo atualiza e o valor conta como despesa no Painel. Só Gestores e Administradores registam compras.',
      tasks: [
        {
          id: 'registar',
          icon: 'receipt',
          title: 'Registar uma compra',
          summary: 'Mercadoria que chegou',
          demo: 'compra',
          steps: [
            'Toque em <b>Compras</b> na barra de baixo.',
            'Toque no botão redondo <kbd>+</kbd>.',
            'Em <b>FORNECEDOR</b>, escolha quem vendeu. Novo? Escreva em <b>Novo fornecedor</b> e toque em <b>Adicionar</b>. Ou escolha <b>Não informado</b>.',
            {
              text: 'Em <b>ITENS</b>, escolha o tipo de cada linha:',
              list: [
                '<b>Produto</b>: algo que vende na loja. O stock sobe.',
                '<b>Avulso</b>: algo que não vende (sacos, limpeza). O stock não muda.',
              ],
            },
            'Escreva a quantidade e o <b>Preço unit.</b> que pagou.',
            'Mais linhas? Toque em <b>Adicionar item</b>. Para tirar uma, <b>Remover</b>.',
            'Confira o <b>Total previsto</b> e toque em <b>Salvar Compra</b>.',
          ],
          after: [
            {p: 'A compra fica registada com a data de hoje, como paga.'},
            {note: 'info', text: 'Compostos e serviços não aparecem nas compras: o stock deles vem dos componentes e materiais, que são o que deve comprar.'},
          ],
        },
        {
          id: 'fornecedores',
          icon: 'account-box-outline',
          title: 'Guardar contactos de fornecedores',
          summary: 'Nome, telefone e NUIT',
          steps: [
            'Toque no seu nome (canto superior direito) e depois em <b>Fornecedores</b>.',
            'Toque em <kbd>+</kbd> e preencha o <b>NOME</b>, o <b>TELEFONE</b> e, se quiser, o <b>NUIT</b>.',
            'Toque em <b>Salvar</b>. Para corrigir, toque no nome dele na lista.',
          ],
        },
      ],
    },

    {
      id: 'faturas',
      n: 6,
      group: 'Operações',
      icon: 'file-document-outline',
      title: 'Clientes, faturas e recibos',
      lead: 'Use faturas quando o cliente paga depois, ou por M-Pesa, e-Mola, cartão ou transferência. Primeiro a <b>fatura</b>; a cada pagamento, um <b>recibo</b>. Disponível nos planos <b>Plus</b> e <b>Premium</b>.',
      tasks: [
        {
          id: 'cliente',
          icon: 'account-plus-outline',
          title: 'Criar um cliente',
          summary: 'Para faturar a crédito',
          steps: [
            'Toque no seu nome (canto superior direito) e depois em <b>Clientes</b>.',
            'Toque em <kbd>+</kbd> e preencha o <b>NOME</b>. Telefone, NUIT, e-mail e endereço são opcionais.',
            'Toque em <b>Salvar</b>.',
          ],
          after: [{p: 'Na ficha do cliente vê o <b>SALDO DO CLIENTE</b> (quanto ainda deve) e as faturas dele.'}],
        },
        {
          id: 'emitir',
          icon: 'file-document-edit-outline',
          title: 'Emitir uma fatura',
          summary: 'Venda a crédito',
          demo: 'fatura',
          steps: [
            'Em <b>Faturas</b>, toque no botão redondo <kbd>+</kbd> (ou em <b>Nova fatura</b> na ficha do cliente).',
            'Em <b>CLIENTE</b>, escolha o cliente.',
            'Se quiser, indique a data-limite em <b>VENCIMENTO (OPCIONAL)</b>.',
            {
              text: 'Em <b>ITENS</b>, junte as linhas:',
              list: [
                '<b>Produto</b>: da loja, incluindo compostos e (no Premium) serviços. O stock desce ao guardar.',
                '<b>Avulso</b>: algo que não está nos produtos, como "Entrega".',
              ],
            },
            'Confira o <b>Total da fatura</b> e toque em <b>Salvar Fatura</b>.',
          ],
          after: [
            {note: 'warning', text: 'A mensagem vermelha "Quantidade acima do estoque disponível" não impede de guardar, mas o stock desse produto fica negativo.'},
            {p: 'Num serviço aparece "Serviço: baixa apenas os materiais que consome".'},
          ],
        },
        {
          id: 'recibo',
          icon: 'cash-check',
          title: 'Registar um pagamento (recibo)',
          summary: 'Total ou parcial',
          demo: 'recibo',
          steps: [
            'Em <b>Faturas</b>, toque na fatura.',
            'Em <b>REGISTRAR RECIBO</b>, escreva o <b>Valor recebido</b>. Pode ser só uma parte.',
            'Escolha a <b>FORMA DE PAGAMENTO</b>: Dinheiro, Cartão, M-Pesa, e-Mola, Transferência ou Outros.',
            'Toque em <b>Registrar Recibo</b>.',
          ],
          after: [
            {
              table: {
                caption: 'O estado da fatura muda sozinho',
                head: ['Estado', 'O que quer dizer'],
                rows: [
                  ['<span class="badge warn">Pendente</span>', 'Ainda não foi pago nada'],
                  ['<span class="badge warn">Parcialmente Paga</span>', 'Foi paga uma parte. O <b>Saldo em aberto</b> mostra quanto falta'],
                  ['<span class="badge ok">Paga</span>', 'Está tudo pago'],
                  ['<span class="badge danger">Cancelada</span>', 'Anulada. Os produtos voltaram ao stock'],
                ],
              },
            },
          ],
        },
        {
          id: 'enviar',
          icon: 'share-variant-outline',
          title: 'Enviar a fatura ou o recibo',
          summary: 'PDF por WhatsApp ou e-mail',
          steps: [
            'Abra a fatura e toque em <b>PDF da Fatura</b>. Para um recibo, toque nele em <b>RECIBOS EMITIDOS</b>.',
            'Escolha como enviar: WhatsApp, e-mail ou outra aplicação.',
          ],
        },
        {
          id: 'corrigir',
          icon: 'file-edit-outline',
          title: 'Corrigir uma fatura',
          summary: 'Só sem recibos',
          steps: [
            'Abra a fatura e toque em <b>Editar</b>.',
            'Mude itens, quantidades, vencimento ou observações. O cliente não se troca: se estiver errado, cancele e emita outra.',
            'Toque em <b>Salvar Alterações</b>. O stock acerta-se sozinho.',
          ],
          after: [{note: 'info', text: 'O botão <b>Editar</b> só aparece enquanto a fatura não tem recibos. Se tiver, anule-os primeiro.'}],
        },
        {
          id: 'anular',
          icon: 'close-circle-outline',
          title: 'Anular um recibo',
          summary: 'Pagamento registado por engano',
          steps: [
            'Abra a fatura e, em <b>RECIBOS EMITIDOS</b>, toque no <b>X vermelho</b> ao lado do recibo.',
            'Confirme com <b>Sim, anular</b>. O valor volta a ficar em dívida e sai do caixa.',
          ],
        },
        {
          id: 'cancelar',
          icon: 'file-cancel-outline',
          title: 'Cancelar uma fatura',
          summary: 'Os produtos voltam ao stock',
          steps: [
            'Se a fatura tiver recibos, anule-os todos primeiro.',
            'Abra a fatura, toque em <b>Cancelar</b> e confirme com <b>Sim, cancelar</b>.',
          ],
          after: [{p: 'Uma fatura cancelada não pode ser editada nem receber pagamentos.'}],
        },
        {
          id: 'encontrar',
          icon: 'file-search-outline',
          title: 'Encontrar faturas',
          summary: 'Filtros e total em aberto',
          after: [
            {
              list: [
                'No topo de <b>Faturas</b>, o <b>TOTAL EM ABERTO</b> mostra quanto os clientes lhe devem.',
                'Use os filtros <b>Todas</b>, <b>Em aberto</b>, <b>Pagas</b> e <b>Canceladas</b>, ou procure pelo nome do cliente ou número da fatura.',
              ],
            },
          ],
        },
      ],
    },

    {
      id: 'painel',
      n: 7,
      group: 'Análise',
      icon: 'view-dashboard-outline',
      title: 'Painel',
      lead: 'Quanto vendeu, quanto gastou e quanto ganhou. Os vendedores veem só o dia de hoje; gestores e administradores escolhem qualquer período.',
      tasks: [
        {
          id: 'ler',
          icon: 'chart-box-outline',
          title: 'Ver os resultados e fechar o dia',
          summary: 'Período, números e resumo',
          demo: 'painel',
          steps: [
            'Toque num período: <b>Hoje</b>, <b>7 dias</b>, <b>Este mês</b>, <b>Mês anterior</b> ou <b>Personalizado</b> (com <b>De</b> e <b>Até</b>).',
            'Leia os cartões (tabela abaixo). Mais abaixo há o gráfico, os <b>Mais vendidos</b> e as <b>Vendas por operador</b>.',
            'No fim do dia, com <b>Hoje</b>, toque em <b>Imprimir resumo do dia</b>. Sai um talão com o número de vendas e o total.',
          ],
          after: [
            {
              table: {
                head: ['Cartão', 'O que mostra'],
                rows: [
                  ['<b>VENDAS</b>', 'O total vendido e o número de vendas'],
                  ['<b>TICKET MÉDIO</b>', 'Quanto cada cliente gasta, em média'],
                  ['<b>LUCRO ESTIMADO</b>', 'O que sobra depois do custo dos produtos e das despesas'],
                  ['<b>DESPESAS PAGAS</b>', 'O que já foi pago em despesas'],
                  ['<b>COMPRAS</b>', 'O total das compras a fornecedores'],
                  ['<b>ESTOQUE BAIXO</b>', 'Quantos produtos precisam de reposição'],
                ],
              },
            },
            {
              note: 'warning',
              text: 'O lucro só está certo com os custos preenchidos: <b>CUSTO DE PRODUÇÃO</b> nos simples, componentes nos compostos e <b>CUSTO DO SERVIÇO</b> nos serviços (<a href="#produtos/criar">capítulo 3</a>).',
            },
          ],
        },
        {
          id: 'excel',
          icon: 'microsoft-excel',
          title: 'Exportar para Excel',
          summary: 'Vendas, compras, produtos, stock',
          steps: [
            'No fim do Painel, vá a <b>Exportar relatórios (Excel)</b>.',
            'Escolha <b>De</b> e <b>Até</b>, ou toque em <b>Usar período do painel</b>. Sem datas, exporta tudo.',
            'Toque no relatório: <b>Vendas</b>, <b>Compras</b>, <b>Produtos</b> (stock atual, tipo e se aparece no POS) ou <b>Movimento de Stock</b>.',
            'Escolha para onde enviar: WhatsApp, e-mail ou Google Drive.',
          ],
        },
      ],
    },

    {
      id: 'impressora',
      n: 8,
      group: 'Configuração',
      icon: 'printer-outline',
      title: 'Impressora Bluetooth',
      lead: 'Impressora térmica Bluetooth de 58 mm. Liga-se uma vez; depois o YPOS lembra-se dela e o talão sai sozinho em cada venda.',
      tasks: [
        {
          id: 'ligar',
          icon: 'bluetooth-connect',
          title: 'Ligar a impressora',
          summary: 'Uma vez só',
          demo: 'impressora',
          steps: [
            'Ligue a impressora e ative o Bluetooth do telemóvel.',
            'No canto superior direito, toque no ícone da <b>Impressora</b>.',
            'Se o telemóvel pedir autorização para o Bluetooth, toque em <b>Permitir</b>.',
            'Toque no nome da impressora em <b>DISPOSITIVOS ENCONTRADOS</b>. Não aparece? Toque no ícone de atualizar.',
            'Toque em <b>Testar impressão</b>. Se sair um talão, está pronto.',
          ],
        },
      ],
    },

    {
      id: 'utilizadores',
      n: 9,
      group: 'Configuração',
      icon: 'account-group-outline',
      title: 'Utilizadores e perfis',
      lead: 'Cada funcionário deve ter a sua conta, para o Painel mostrar quanto vendeu cada um. Só os administradores criam contas, nos planos <b>Plus</b> e <b>Premium</b>.',
      tasks: [
        {
          id: 'perfis',
          icon: 'shield-account-outline',
          title: 'Os três perfis',
          summary: 'Quem pode fazer o quê',
          after: [
            {
              table: {
                head: ['O que pode fazer', 'Vendedor', 'Gestor', 'Admin.'],
                center: true,
                rows: [
                  ['Vender, emitir faturas e recibos', '@yes', '@yes', '@yes'],
                  ['Consultar produtos e stock', '@yes', '@yes', '@yes'],
                  ['Ver vendas e compras de hoje no Painel', '@yes', '@yes', '@yes'],
                  ['Criar e editar produtos, ajustar stock', '@no', '@yes', '@yes'],
                  ['Registar compras', '@no', '@yes', '@yes'],
                  ['Ver lucro, despesas, gráficos e outros períodos', '@no', '@yes', '@yes'],
                  ['Exportar relatórios para Excel', '@no', '@yes', '@yes'],
                  ['Criar e gerir utilizadores', '@no', '@no', '@yes'],
                  ['Backup e restauro', '@no', '@no', '@yes'],
                ],
              },
            },
            {note: 'info', text: 'No plano <b>Basic</b> só entra a <b>conta principal</b> (a criada na configuração inicial). As outras contas ficam guardadas e voltam a entrar quando o plano subir.'},
          ],
        },
        {
          id: 'criar-conta',
          icon: 'account-plus-outline',
          title: 'Criar a conta de um funcionário',
          summary: 'Uma conta por pessoa',
          demo: 'utilizador',
          steps: [
            'Toque no seu nome (canto superior direito) e depois em <b>Utilizadores</b>.',
            'Toque em <kbd>+</kbd>.',
            'Preencha o <b>NOME</b>, o <b>E-MAIL</b> e uma <b>SENHA</b> com pelo menos 4 caracteres.',
            'Em <b>PERFIL</b>, escolha <b>Vendedor</b>, <b>Gestor</b> ou <b>Administrador</b>.',
            'Toque em <b>Salvar</b> e diga ao funcionário o e-mail e a senha dele.',
          ],
        },
        {
          id: 'acesso',
          icon: 'lock-reset',
          title: 'Mudar a senha ou tirar o acesso',
          summary: 'Quando alguém esquece ou sai',
          after: [
            {
              list: [
                'Mudar a senha: toque no nome da pessoa, escreva a <b>NOVA SENHA (OPCIONAL)</b> e toque em <b>Salvar alterações</b>.',
                'Funcionário saiu: toque em <b>Desativar utilizador</b>. As vendas dele ficam registadas. Para voltar, <b>Reativar utilizador</b>.',
                'Não é possível desativar a sua própria conta.',
              ],
            },
            {note: 'tip', text: 'No fim de cada turno, cada funcionário deve sair: toque no seu nome e depois em <b>Sair</b>.'},
          ],
        },
      ],
    },

    {
      id: 'licenca',
      n: 10,
      group: 'Configuração',
      icon: 'key-chain-variant',
      title: 'Licença e planos',
      lead: 'A licença diz o seu <b>plano</b> (Basic, Plus ou Premium) e a data de fim. Renove-a antes, para não interromper as vendas. Nada se perde se vencer.',
      tasks: [
        {
          id: 'planos',
          icon: 'star-circle-outline',
          title: 'Os planos Basic, Plus e Premium',
          summary: 'O que cada um inclui',
          after: [
            {
              table: {
                head: ['Inclui', 'Basic', 'Plus', 'Premium'],
                center: true,
                rows: [
                  ['Vendas, produtos, compostos, compras, stock e Painel', '@yes', '@yes', '@yes'],
                  ['Backup e restauro', '@yes', '@yes', '@yes'],
                  ['Vários utilizadores e perfis', '@no', '@yes', '@yes'],
                  ['Clientes com faturas e recibos', '@no', '@yes', '@yes'],
                  ['Serviços', '@no', '@no', '@yes'],
                ],
              },
            },
            {p: 'Vê o seu plano em <b>Licença</b>, por exemplo: "Mercearia Central · Premium · Anual · até 30/09/2027".'},
            {note: 'tip', text: 'Para mudar de plano, peça ao fornecedor um novo código e ative-o como numa renovação. Se o plano descer, nada é apagado: faturas, serviços e contas ficam guardados e voltam quando o plano subir.'},
          ],
        },
        {
          id: 'renovar',
          icon: 'autorenew',
          title: 'Ver a validade e renovar',
          summary: 'Nome → Licença',
          demo: 'renovar',
          steps: [
            'Toque em <b>Renovar</b> na faixa de aviso no topo, ou no seu nome e depois em <b>Licença</b>. Vê o estado, o plano e a data de fim.',
            'Em <b>ID DESTE APARELHO</b>, toque em <b>Enviar</b> e mande o ID ao fornecedor.',
            'Quando receber o novo código, toque em <b>Ler QR code</b> ou cole-o em <b>CÓDIGO DE LICENÇA</b>.',
            'Toque em <b>Renovar licença</b>.',
          ],
        },
        {
          id: 'vence',
          icon: 'calendar-alert',
          title: 'O que acontece quando vence',
          summary: 'Aviso, tolerância, modo consulta',
          after: [
            {
              timeline: [
                {cls: 't-ok', t: '5 dias antes do fim', p: 'Aparece uma faixa de aviso no topo. Tudo funciona.'},
                {cls: 't-warn', t: 'Até 3 dias depois', p: 'Ainda pode vender. O aviso lembra-o de renovar.'},
                {cls: 't-stop', t: 'Mais de 3 dias depois', p: '<b>Modo consulta</b>: vê os dados, mas não regista vendas, compras, faturas nem recibos.'},
              ],
            },
            {p: 'Assim que ativar o novo código, volta a trabalhar como antes.'},
          ],
        },
      ],
    },

    {
      id: 'backup',
      n: 11,
      group: 'Configuração',
      icon: 'backup-restore',
      title: 'Backup e restauro',
      lead: 'Os dados ficam só neste telemóvel. Um <b>backup</b> é um ficheiro com tudo, para guardar fora do telemóvel ou passar para outro. Só os administradores o fazem.',
      tasks: [
        {
          id: 'criar',
          icon: 'cloud-upload-outline',
          title: 'Criar um backup',
          summary: 'Uma vez por semana',
          demo: 'backup',
          steps: [
            'Toque no seu nome (canto superior direito) e depois em <b>Backup e restauro</b>.',
            'Em <b>Criar backup</b>, toque no botão <b>Criar backup</b>.',
            'Escolha onde guardar o ficheiro: Google Drive, e-mail, WhatsApp ou o computador.',
          ],
          after: [
            {note: 'warning', text: 'O ficheiro inclui os dados de acesso dos utilizadores: guarde-o num local seguro e não o partilhe.'},
            {note: 'tip', text: 'Faça um backup pelo menos uma vez por semana, e sempre antes de trocar de telemóvel ou desinstalar o YPOS.'},
          ],
        },
        {
          id: 'restaurar',
          icon: 'cellphone-arrow-down',
          title: 'Passar para outro telemóvel',
          summary: 'No YPOS acabado de instalar',
          demo: 'restaurar',
          steps: [
            'No telemóvel novo, ative a licença dele (<a href="#primeiros-passos/ativar">capítulo 1</a>). A licença não vai no backup.',
            'No ecrã <b>Bem-vindo ao YPOS</b>, toque em <b>Restaurar a partir de um backup</b>.',
            'Escolha o ficheiro <b>ypos-backup_….json</b>.',
            'Confira o resumo (empresa, data, número de produtos, vendas…) e toque em <b>Restaurar</b>.',
            'Entre com um utilizador do backup.',
          ],
        },
        {
          id: 'substituir',
          icon: 'database-refresh-outline',
          title: 'Restaurar por cima dos dados atuais',
          summary: 'Voltar a um backup antigo',
          demo: 'substituir',
          steps: [
            'Toque no seu nome e depois em <b>Backup e restauro</b>.',
            'Em <b>Restaurar backup</b>, toque em <b>Escolher ficheiro e restaurar</b> e escolha o ficheiro.',
            'Leia o aviso e toque em <b>Restaurar</b>.',
            'Entre com um utilizador do backup.',
          ],
          after: [
            {note: 'danger', text: 'Todos os dados deste telemóvel são substituídos pelos do backup e não há como desfazer. Se precisar dos dados atuais, crie antes um backup.'},
            {p: 'A licença deste telemóvel mantém-se. Se o restauro falhar a meio, os dados anteriores são repostos.'},
          ],
        },
      ],
    },

    {
      id: 'problemas',
      n: 12,
      group: 'Ajuda',
      icon: 'lifebuoy',
      title: 'Problemas frequentes',
      lead: 'Quase tudo se resolve sem ajuda técnica. Escreva a mensagem que aparece no ecrã, ou escolha um tema.',
      faq: true,
      after: [
        {note: 'danger', text: '<b>Os dados ficam só neste telemóvel.</b> Não desinstale o YPOS nem apague os dados da aplicação sem antes <a href="#backup/criar">criar um backup</a>.'},
        {
          list: [
            'Crie um backup uma vez por semana e guarde-o no Google Drive ou no e-mail (<a href="#backup/criar">capítulo 11</a>).',
            'Não mude a data do telemóvel à mão: com a data errada, o YPOS bloqueia a licença.',
            'Não partilhe a sua senha. Tudo o que fizer fica registado no seu nome.',
          ],
        },
        {note: 'info', text: '<b>O problema continua?</b> Contacte o fornecedor da licença e diga-lhe a mensagem exata que aparece no ecrã.'},
      ],
    },
  ];
})(window.YPOS);
