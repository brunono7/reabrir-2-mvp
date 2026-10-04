# REABRIR 2.0 — MVP de validação

Projeto estático pronto para publicar. Não precisa de npm, React, banco de dados ou build. A versão pronta para deploy está na pasta `public`.

## O que esta versão faz

- landing page nova focada em um check-in gratuito;
- 6 perguntas;
- regras de prioridade para segurança, pedido de espaço, estado emocional e intenção;
- resultado Vermelho, Amarelo, Verde ou Segurança;
- sugestões de próximo passo;
- seleção de objetivo e uma abertura de mensagem;
- oferta do REABRIR completo por R$29,90;
- checkout atual configurado: https://pay.kiwify.com.br/JcCHxUJ
- preserva UTMs e fbclid ao enviar para o checkout;
- rastreamento com eventos próprios: QuizStarted, QuizCompleted, ResultViewed, GoalSelected e CheckoutClick;
- NÃO dispara InitiateCheckout ao clicar no botão da landing. Isso evita confundir clique de CTA com checkout realmente carregado.
- banner simples de consentimento antes de carregar o Meta Pixel.

## Arquivos

- index.html — estrutura da página
- styles.css — identidade visual e responsividade
- app.js — quiz, pontuação, regras, rastreamento e checkout

## Importante sobre o produto pago

Esta é uma versão de validação. O quiz e o resultado funcionam no front-end. O pagamento e a entrega do e-book continuam pela Kiwify.

Ainda NÃO há uma área premium personalizada liberada automaticamente após o pagamento. Não anuncie isso como se já existisse.

Se esta nova oferta gerar vendas, a próxima versão pode incluir login, confirmação de compra e plano personalizado pós-pagamento usando Supabase + webhook da Kiwify.
