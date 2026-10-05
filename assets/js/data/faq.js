/* Mensagens que aparecem no ecrã e o que fazer (capítulo "Problemas frequentes"). */
(function (Y) {
  'use strict';

  Y.faqCategories = ['Licença', 'Planos e acessos', 'Entrar', 'Produtos e stock', 'Vendas e faturas', 'Impressora', 'Backup'];

  Y.faq = [
    {cat: 'Licença', msg: 'Faixa no topo: a licença está a vencer', ans: 'Renove a licença (<a href="#licenca/renovar">capítulo 10</a>).'},
    {cat: 'Licença', msg: '"A licença venceu... Renove em até X dias"', ans: 'Ainda pode vender durante esses dias. Renove antes que acabem (<a href="#licenca/renovar">capítulo 10</a>).'},
    {cat: 'Licença', msg: '"O app está em modo consulta"', ans: 'A licença venceu há mais de 3 dias. Pode ver os dados, mas não vender. Peça um novo código ao fornecedor.'},
    {cat: 'Licença', msg: '"A data do aparelho está atrasada"', ans: 'Nas definições do telemóvel, ponha a data e a hora certas (de preferência automáticas) e abra o YPOS outra vez.'},
    {cat: 'Licença', msg: '"Esta licença foi emitida para outro aparelho"', ans: 'O código não é para este telemóvel. Envie outra vez ao fornecedor o ID de <b>ID DESTE APARELHO</b>.'},
    {cat: 'Licença', msg: '"Código de licença inválido"', ans: 'Copie o código completo, do princípio ao fim, ou use <b>Ler QR code</b>.'},
    {cat: 'Licença', msg: '"QR não reconhecido"', ans: 'Esse QR code não é uma licença YPOS. Confirme com o fornecedor que enviou o código certo.'},
    {cat: 'Licença', msg: '"Esta licença já venceu em …"', ans: 'É um código antigo. Peça ao fornecedor um código novo.'},
    {cat: 'Licença', msg: '"Já existe uma licença mais recente, válida até …"', ans: 'Este telemóvel já tem uma licença mais longa. Não precisa de ativar este código.'},
    {cat: 'Licença', msg: '"Não foi possível ler a licença guardada neste aparelho"', ans: 'Feche e abra o YPOS. Se continuar, contacte o fornecedor.'},
    {cat: 'Planos e acessos', msg: 'Não aparece a aba Faturas', ans: 'O seu plano é o <b>Basic</b>. Faturas e recibos existem a partir do plano Plus (<a href="#licenca/planos">capítulo 10</a>).'},
    {cat: 'Planos e acessos', msg: 'Não aparece a aba Compras, ou não consigo criar produtos', ans: 'Entrou com o perfil <b>Vendedor</b>, que só consulta produtos. Peça a um Gestor ou Administrador (<a href="#utilizadores/perfis">capítulo 9</a>).'},
    {cat: 'Planos e acessos', msg: '"Sem permissão: apenas Gestores e Administradores podem realizar esta operação"', ans: 'O seu perfil é Vendedor. Peça a um Gestor ou Administrador que faça a operação, ou que mude o seu perfil.'},
    {cat: 'Planos e acessos', msg: '"O plano Basic permite um único utilizador"', ans: 'No Basic só entra a conta principal (a criada na configuração inicial). Entre com ela, ou peça ao fornecedor o plano Plus.'},
    {cat: 'Planos e acessos', msg: '"…: disponível a partir do plano Plus / Premium"', ans: 'Essa função não está no seu plano. Peça ao fornecedor um código do plano indicado e ative-o (<a href="#licenca/planos">capítulo 10</a>).'},
    {cat: 'Entrar', msg: '"Senha incorreta"', ans: 'Confirme a senha. Se a esqueceu, peça a um administrador que defina uma nova (<a href="#utilizadores/acesso">capítulo 9</a>).'},
    {cat: 'Entrar', msg: '"Usuário não encontrado ou inativo"', ans: 'Confirme o e-mail. Se estiver certo, a conta foi desativada: fale com um administrador.'},
    {cat: 'Produtos e stock', msg: 'O POS não mostra produtos', ans: 'Crie os produtos na aba <b>Produtos</b> (<a href="#produtos/criar">capítulo 3</a>).'},
    {cat: 'Produtos e stock', msg: 'Um produto não aparece no POS', ans: 'Veja se tem a etiqueta <b>Oculto no POS</b> ou <b>Inativo</b> (<a href="#produtos/ocultar">capítulo 3</a>). Se for um serviço, o plano tem de ser Premium.'},
    {cat: 'Produtos e stock', msg: '"… não tem stock próprio: compre os seus componentes/materiais"', ans: 'É um composto ou um serviço. Registe na compra os componentes ou materiais, não o próprio produto.'},
    {cat: 'Produtos e stock', msg: '"Um produto composto precisa de pelo menos um componente com quantidade"', ans: 'Em <b>COMPONENTES</b>, escolha pelo menos um produto e escreva a quantidade.'},
    {cat: 'Produtos e stock', msg: '"… é composto / é um serviço e não pode ser componente"', ans: 'Só produtos simples podem ser componentes ou materiais. Escolha os produtos simples que formam esse item.'},
    {cat: 'Produtos e stock', msg: 'Não aparece o botão Ajustar', ans: 'Compostos e serviços não têm stock próprio: ajuste os componentes. O perfil Vendedor também não ajusta stock.'},
    {cat: 'Vendas e faturas', msg: 'O botão Editar não aparece na fatura', ans: 'A fatura já tem recibos. Anule-os primeiro (<a href="#faturas/anular">capítulo 6</a>).'},
    {cat: 'Vendas e faturas', msg: '"Não é possível cancelar uma fatura que já tem recibos emitidos"', ans: 'Anule primeiro todos os recibos da fatura e depois cancele-a.'},
    {cat: 'Vendas e faturas', msg: '"O valor não pode exceder o saldo em aberto"', ans: 'O cliente está a pagar mais do que deve. Escreva no máximo o <b>Saldo em aberto</b> da fatura.'},
    {cat: 'Impressora', msg: '"Recibo não impresso"', ans: 'A venda ficou gravada. Confirme que a impressora está ligada, com papel e Bluetooth ativo, e faça <b>Testar impressão</b> (<a href="#impressora/ligar">capítulo 8</a>).'},
    {cat: 'Impressora', msg: '"Bluetooth desligado"', ans: 'Ative o Bluetooth do telemóvel e tente outra vez.'},
    {cat: 'Impressora', msg: '"Nenhum dispositivo encontrado por perto"', ans: 'Ligue a impressora, aproxime-a do telemóvel e toque no ícone de atualizar.'},
    {cat: 'Backup', msg: '"O ficheiro escolhido não é um backup do YPOS"', ans: 'Escolha o ficheiro com nome <b>ypos-backup_….json</b> criado em <b>Backup e restauro</b>.'},
    {cat: 'Backup', msg: '"Este backup foi criado numa versão mais recente do YPOS"', ans: 'Atualize o YPOS na loja de aplicações e tente restaurar outra vez.'},
    {cat: 'Backup', msg: '"O backup não tem nenhum administrador ativo"', ans: 'Depois de restaurar não seria possível entrar. Use um backup mais recente, de quando havia um administrador ativo.'},
    {cat: 'Backup', msg: '"O restauro falhou e os dados anteriores foram repostos"', ans: 'Nada se perdeu. Tente outra vez; se continuar, contacte o fornecedor com a mensagem completa.'},
  ];
})(window.YPOS);
