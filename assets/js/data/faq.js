/* Mensagens que aparecem no ecrã e o que fazer (capítulo 11). */
(function (Y) {
  'use strict';

  Y.faqCategories = ['Licença', 'Entrar', 'Impressora', 'Vendas e faturas'];

  Y.faq = [
    {cat: 'Licença', msg: 'Faixa no topo: a licença está a vencer', ans: 'Renove a licença (<a href="#licenca/renovar">capítulo 10</a>).'},
    {cat: 'Licença', msg: '"A licença venceu... Renove em até X dias"', ans: 'Ainda pode vender durante esses dias. Renove antes que acabem (<a href="#licenca/renovar">capítulo 10</a>).'},
    {cat: 'Licença', msg: '"O app está em modo consulta"', ans: 'A licença venceu há mais de 3 dias. Pode ver os dados, mas não vender. Peça um novo código ao fornecedor.'},
    {cat: 'Licença', msg: '"A data do aparelho está atrasada"', ans: 'Nas definições do telemóvel, ponha a data e a hora certas (de preferência automáticas) e abra o YPOS outra vez.'},
    {cat: 'Licença', msg: '"Esta licença foi emitida para outro aparelho"', ans: 'O código não é para este telemóvel. Envie outra vez ao fornecedor o ID de <b>ID DESTE APARELHO</b>.'},
    {cat: 'Licença', msg: '"Código de licença inválido"', ans: 'Copie o código completo, do princípio ao fim, ou use <b>Ler QR code</b>.'},
    {cat: 'Licença', msg: '"QR não reconhecido"', ans: 'Esse QR code não é uma licença YPOS. Confirme com o fornecedor que enviou o código certo.'},
    {cat: 'Entrar', msg: '"Senha incorreta"', ans: 'Confirme a senha. Se a esqueceu, peça a um administrador que defina uma nova (<a href="#utilizadores/acesso">capítulo 9</a>).'},
    {cat: 'Entrar', msg: '"Usuário não encontrado ou inativo"', ans: 'Confirme o e-mail. Se estiver certo, a conta foi desativada: fale com um administrador.'},
    {cat: 'Impressora', msg: '"Recibo não impresso"', ans: 'A venda ficou gravada. Confirme que a impressora está ligada, com papel e Bluetooth ativo, e faça <b>Testar impressão</b> (<a href="#impressora/ligar">capítulo 8</a>).'},
    {cat: 'Impressora', msg: '"Bluetooth desligado"', ans: 'Ative o Bluetooth do telemóvel e tente outra vez.'},
    {cat: 'Impressora', msg: '"Nenhum dispositivo encontrado por perto"', ans: 'Ligue a impressora, aproxime-a do telemóvel e toque no ícone de atualizar.'},
    {cat: 'Vendas e faturas', msg: 'O POS não mostra produtos', ans: 'Crie os produtos na aba <b>Produtos</b> (<a href="#produtos/criar">capítulo 3</a>).'},
    {cat: 'Vendas e faturas', msg: 'O botão Editar não aparece na fatura', ans: 'A fatura já tem recibos. Anule-os primeiro (<a href="#faturas/anular">capítulo 6</a>).'},
    {cat: 'Vendas e faturas', msg: '"Não é possível cancelar uma fatura que já tem recibos emitidos"', ans: 'Anule primeiro todos os recibos da fatura e depois cancele-a.'},
    {cat: 'Vendas e faturas', msg: '"O valor não pode exceder o saldo em aberto"', ans: 'O cliente está a pagar mais do que deve. Escreva no máximo o <b>Saldo em aberto</b> da fatura.'},
  ];
})(window.YPOS);
