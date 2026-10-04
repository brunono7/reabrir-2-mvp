# O que fazer em seguida — passo a passo

## Etapa 1 — não mexer no site antigo

Mantenha o site atual online como está. Não sobrescreva o projeto antigo enquanto esta versão não estiver validada.

## Etapa 2 — criar um repositório novo no GitHub

Nome recomendado: `reabrir-2-mvp`

Envie a pasta `public` e os arquivos de documentação para o repositório. O site que será publicado fica dentro de `public`.

## Etapa 3 — publicar no Cloudflare Pages

Como este projeto é estático, não há build.

Configuração sugerida:

- Framework preset: None
- Build command: deixar vazio
- Build output directory: `public`

## Etapa 4 — testar antes de anunciar

Faça o teste em aba anônima e no celular:

1. landing abre;
2. botão inicia o quiz;
3. todas as 6 perguntas funcionam;
4. resultado vermelho funciona;
5. resultado amarelo funciona;
6. resultado verde funciona;
7. opção de segurança funciona;
8. botão de compra abre o checkout correto;
9. valor no checkout é R$29,90;
10. Kiwify continua entregando o e-book correto.

## Etapa 5 — conferir rastreamento

No Meta Events Manager, depois de aceitar cookies no site, devem aparecer eventos como:

- PageView
- QuizStarted
- QuizCompleted
- ResultViewed
- GoalSelected
- CheckoutClick

Não use `CheckoutClick` como venda.

A fonte de verdade de pedidos e receita continua sendo a Kiwify.

## Etapa 6 — campanha nova, não reaproveitar dados ruins

Crie uma nova campanha/conjunto ou, no mínimo, um teste claramente separado da campanha anterior.

Não misture os resultados da versão antiga com a versão do quiz.

Orçamento inicial sugerido: R$15/dia, por poucos dias, com limite financeiro definido antes de começar.

Não aumentar orçamento só porque CTR ou CPC estão bons.

## Etapa 7 — criativos

A promessa principal muda.

Em vez de anunciar “e-book para depois da briga”, anunciar o check-in gratuito.

Ângulos para testar:

- “Brigaram agora? Descubra se é melhor falar ou esperar.”
- “Antes de mandar outra mensagem, faça este check-in de 60 segundos.”
- “Você quer resolver, mas talvez agora ainda não seja a hora.”

O CTA do anúncio deve levar para a landing do quiz, não direto para a Kiwify.

## Etapa 8 — métricas que realmente importam

Acompanhar separadamente:

1. cliques no link;
2. visualizações da landing;
3. QuizStarted;
4. QuizCompleted;
5. ResultViewed;
6. CheckoutClick;
7. pedidos na Kiwify;
8. vendas aprovadas;
9. custo por venda.

## Etapa 9 — regra de decisão

Não julgar o produto por 10 ou 20 visitas.

Também não continuar gastando indefinidamente.

Primeiro objetivo: obter uma amostra limpa de visitantes e comparar:

landing -> quiz iniciado -> quiz concluído -> clique no checkout -> pedido -> venda.

Se houver muitos quizzes concluídos e quase ninguém clicar no checkout, o problema tende a estar na oferta/valor percebido.

Se houver muitos cliques no checkout e nenhum pedido, revisar checkout, confiança, preço e fricção.

Se houver vendas, calcular CPA e decidir se vale escalar.

## Etapa 10 — só depois das primeiras vendas

Se esta versão vender, construir REABRIR 3.0:

- conta/login;
- resultado salvo;
- personalização com IA;
- acesso premium pós-pagamento;
- plano personalizado;
- histórico de check-ins;
- possibilidade de assinatura ou app.

Não construir isso antes de provar que as pessoas pagam.
