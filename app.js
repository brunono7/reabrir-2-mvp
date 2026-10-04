const CONFIG = {
  checkoutUrl: 'https://pay.kiwify.com.br/JcCHxUJ',
  metaPixelId: '982622324847392'
};

const questions = [
  {
    id: 'time',
    title: 'Há quanto tempo aconteceu a discussão?',
    options: [
      { label: 'Menos de 1 hora', value: 'lt1h', points: 0 },
      { label: 'Entre 1 e 6 horas', value: '1to6h', points: 1 },
      { label: 'Entre 6 e 24 horas', value: '6to24h', points: 2 },
      { label: 'Mais de 24 horas', value: 'gt24h', points: 3 }
    ]
  },
  {
    id: 'ending',
    title: 'Como a conversa terminou?',
    options: [
      { label: 'Com gritos, ofensas ou muita alteração', value: 'explosive', points: 0 },
      { label: 'Um dos dois saiu muito irritado', value: 'angry', points: 1 },
      { label: 'Ficou um clima ruim, mas controlado', value: 'tense', points: 2 },
      { label: 'Terminou de forma relativamente calma', value: 'calm', points: 3 }
    ]
  },
  {
    id: 'space',
    title: 'A outra pessoa pediu espaço?',
    options: [
      { label: 'Sim, pediu claramente para não conversar agora', value: 'explicit', points: 0, override: 'red-space' },
      { label: 'Não falou diretamente, mas demonstrou querer ficar sozinha', value: 'implicit', points: 0 },
      { label: 'Não pediu espaço', value: 'none', points: 2 },
      { label: 'Já voltou a falar normalmente comigo', value: 'normal', points: 3 }
    ]
  },
  {
    id: 'state',
    title: 'Como você está emocionalmente agora?',
    options: [
      { label: 'Muito irritado, ansioso ou querendo resolver de qualquer jeito', value: 'high', points: 0, override: 'red-state' },
      { label: 'Ainda estou abalado, mas consigo me controlar', value: 'medium', points: 1 },
      { label: 'Estou mais calmo e consigo conversar sem atacar', value: 'calm', points: 2 },
      { label: 'Estou tranquilo e disposto a ouvir também', value: 'ready', points: 3 }
    ]
  },
  {
    id: 'intent',
    title: 'Qual é sua intenção ao procurar a pessoa?',
    options: [
      { label: 'Fazer a pessoa me responder', value: 'force-answer', points: 0, override: 'red-intent' },
      { label: 'Mostrar que eu estava certo(a)', value: 'prove-right', points: 0, override: 'red-intent' },
      { label: 'Pedir desculpas ou esclarecer algo', value: 'apology', points: 2 },
      { label: 'Retomar a conversa de forma tranquila', value: 'reconnect', points: 3 }
    ]
  },
  {
    id: 'severity',
    title: 'O que aconteceu durante a briga?',
    options: [
      { label: 'Ameaça, agressão, coerção, perseguição ou medo físico', value: 'safety', points: 0, override: 'safety' },
      { label: 'Ofensas muito pesadas', value: 'heavy-insults', points: 0 },
      { label: 'Discussão forte, mas sem ameaça', value: 'strong', points: 1 },
      { label: 'Foi um desentendimento comum', value: 'ordinary', points: 2 }
    ]
  }
];

const resultContent = {
  safety: {
    badge: '🛡️ Segurança',
    title: 'A prioridade agora é segurança, não retomar a conversa.',
    summary: 'Pelas suas respostas, há um sinal que muda completamente a orientação. Quando existe ameaça, agressão, coerção, perseguição ou medo físico, o foco não deve ser encontrar a mensagem perfeita para reabrir o diálogo.',
    actions: [
      ['Priorize distância e segurança', 'Evite encontros ou conversas que possam colocar você em risco.'],
      ['Procure apoio adequado', 'Considere uma pessoa de confiança e, quando necessário, suporte profissional ou serviços de emergência da sua região.'],
      ['Não use este resultado como autorização para insistir', 'O REABRIR não recomenda mensagens de reconciliação em situações de risco.']
    ]
  },
  red: {
    badge: '🔴 Vermelho',
    title: 'Não parece ser a hora de tentar resolver tudo.',
    summary: 'Pelas suas respostas, insistir agora tem uma chance maior de reacender o conflito do que de produzir uma conversa útil. O próximo passo é reduzir a pressão e criar espaço para uma abordagem melhor.',
    actions: [
      ['Não mande uma sequência de mensagens', 'Uma nova tentativa atrás da outra costuma aumentar a sensação de cobrança.'],
      ['Não tente resolver todos os pontos agora', 'Uma conversa produtiva exige algum nível de calma dos dois lados.'],
      ['Faça o check-in novamente mais tarde', 'O resultado pode mudar quando o estado emocional e o contexto mudarem.']
    ]
  },
  yellow: {
    badge: '🟡 Amarelo',
    title: 'Há espaço para conversar, mas vale preparar a abordagem.',
    summary: 'Existem condições melhores do que logo após a briga, mas ainda há sinais de que uma tentativa precipitada pode reacender a discussão. A prioridade é uma abertura curta, sem cobrança e sem tentar resolver tudo de uma vez.',
    actions: [
      ['Entre leve', 'Abra a conversa sem acusação, ultimato ou texto longo.'],
      ['Observe a resposta', 'Se a pessoa responder friamente ou pedir espaço, não transforme isso em outra disputa.'],
      ['Tenha um objetivo simples', 'Comece tentando criar uma conversa segura, não ganhar toda a discussão.']
    ]
  },
  green: {
    badge: '🟢 Verde',
    title: 'Existem condições melhores para tentar reabrir o diálogo.',
    summary: 'Pelas suas respostas, o momento parece mais favorável para uma tentativa cuidadosa. Isso não garante uma resposta positiva, mas reduz alguns dos sinais de que a conversa ainda está quente demais.',
    actions: [
      ['Comece curto', 'Uma primeira mensagem não precisa resolver a discussão inteira.'],
      ['Fale e escute', 'Explique seu ponto sem transformar a conversa em uma defesa interminável.'],
      ['Respeite qualquer novo limite', 'Se a pessoa pedir espaço, a orientação muda: pare a tentativa e respeite o pedido.']
    ]
  }
};

const goalMessages = {
  apology: {
    label: 'Pedir desculpas',
    message: '“Pensei melhor sobre o que aconteceu e percebi que poderia ter lidado com algumas coisas de outra forma. Não quero recomeçar a discussão. Quando você quiser, gostaria de conversar.”'
  },
  explain: {
    label: 'Explicar meu lado',
    message: '“Quero explicar melhor o que eu quis dizer, mas sem transformar isso em outra discussão. Também quero ouvir como você enxergou o que aconteceu.”'
  },
  misunderstanding: {
    label: 'Resolver um mal-entendido',
    message: '“Acho que algumas coisas ficaram mal explicadas entre nós. Se você estiver disposto(a), queria esclarecer isso com calma.”'
  },
  reconnect: {
    label: 'Voltar a conversar',
    message: '“Não quero fingir que nada aconteceu, mas também não quero que a discussão continue definindo nosso contato. Quando você se sentir confortável, podemos conversar.”'
  },
  ignored: {
    label: 'Já mandei mensagem e fui ignorado(a)',
    message: 'Se você já enviou uma mensagem e não recebeu resposta, a recomendação inicial é não mandar outra imediatamente. O silêncio também é informação; insistir agora pode aumentar a pressão.'
  }
};

let currentQuestion = 0;
const answers = {};
let finalResult = null;

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];

function loadMetaPixel() {
  if (window.fbq || !CONFIG.metaPixelId) return;
  !(function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)})(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', CONFIG.metaPixelId);
  fbq('track', 'PageView');
}

function track(eventName, data = {}) {
  if (window.fbq) fbq('trackCustom', eventName, data);
}

function setupConsent() {
  const consent = localStorage.getItem('reabrir_marketing_consent');
  const banner = $('#cookie-banner');
  if (consent === 'accepted') {
    loadMetaPixel();
  } else if (!consent) {
    banner.hidden = false;
  }

  $('#accept-cookies').addEventListener('click', () => {
    localStorage.setItem('reabrir_marketing_consent', 'accepted');
    banner.hidden = true;
    loadMetaPixel();
  });

  $('#decline-cookies').addEventListener('click', () => {
    localStorage.setItem('reabrir_marketing_consent', 'declined');
    banner.hidden = true;
  });
}

function startQuiz() {
  currentQuestion = 0;
  Object.keys(answers).forEach(k => delete answers[k]);
  finalResult = null;
  $('#result').hidden = true;
  $('#quiz').hidden = false;
  renderQuestion();
  $('#quiz').scrollIntoView({ behavior: 'smooth', block: 'start' });
  track('QuizStarted');
}

function closeQuiz() {
  $('#quiz').hidden = true;
  $('#inicio').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderQuestion() {
  const q = questions[currentQuestion];
  $('#quiz-title').textContent = `Pergunta ${currentQuestion + 1} de ${questions.length}`;
  $('#progress-bar').style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;

  const selectedValue = answers[q.id]?.value;
  $('#question-area').innerHTML = `
    <h3>${q.title}</h3>
    <div class="options">
      ${q.options.map((opt, idx) => `
        <button type="button" class="option ${selectedValue === opt.value ? 'selected' : ''}" data-index="${idx}">
          <span class="option-bullet">${selectedValue === opt.value ? '✓' : ''}</span>
          <span>${opt.label}</span>
        </button>
      `).join('')}
    </div>
  `;

  $$('.option').forEach(btn => {
    btn.addEventListener('click', () => {
      const opt = q.options[Number(btn.dataset.index)];
      answers[q.id] = opt;
      renderQuestion();
    });
  });

  $('#back-btn').disabled = currentQuestion === 0;
  $('#next-btn').disabled = !answers[q.id];
  $('#next-btn').textContent = currentQuestion === questions.length - 1 ? 'Ver meu resultado' : 'Continuar';
}

function nextQuestion() {
  if (!answers[questions[currentQuestion].id]) return;
  if (currentQuestion < questions.length - 1) {
    currentQuestion += 1;
    renderQuestion();
    return;
  }
  finishQuiz();
}

function previousQuestion() {
  if (currentQuestion === 0) return;
  currentQuestion -= 1;
  renderQuestion();
}

function calculateResult() {
  const selected = Object.values(answers);

  if (selected.some(a => a.override === 'safety')) {
    return { type: 'safety', reason: 'safety', score: 0 };
  }
  if (selected.some(a => a.override === 'red-space')) {
    return { type: 'red', reason: 'space', score: 0 };
  }
  if (selected.some(a => a.override === 'red-state')) {
    return { type: 'red', reason: 'state', score: 0 };
  }
  if (selected.some(a => a.override === 'red-intent')) {
    return { type: 'red', reason: 'intent', score: 0 };
  }

  if (answers.time?.value === 'lt1h' && answers.ending?.value === 'explosive') {
    return { type: 'red', reason: 'too-soon-intense', score: 0 };
  }

  const score = selected.reduce((sum, item) => sum + (item.points || 0), 0);
  if (score <= 5) return { type: 'red', reason: 'score', score };
  if (score <= 9) return { type: 'yellow', reason: 'score', score };
  return { type: 'green', reason: 'score', score };
}

function contextualSummary(result) {
  if (result.type !== 'red') return resultContent[result.type].summary;

  if (result.reason === 'space') {
    return 'A outra pessoa colocou um limite claro. Respeitar esse pedido é mais importante agora do que encontrar a mensagem perfeita. Insistir imediatamente pode transformar a tentativa de aproximação em pressão.';
  }
  if (result.reason === 'state') {
    return 'Sua própria resposta indica que você ainda está muito ativado emocionalmente. Antes de tentar resolver a relação, vale reduzir a urgência de resolver tudo agora.';
  }
  if (result.reason === 'intent') {
    return 'A intenção atual está muito ligada a obter uma resposta ou provar um ponto. Essa costuma ser uma base ruim para reabrir uma conversa depois de uma briga.';
  }
  if (result.reason === 'too-soon-intense') {
    return 'A discussão foi intensa e aconteceu há muito pouco tempo. Mesmo sem outros bloqueios, o intervalo ainda parece curto para uma tentativa de resolução.';
  }
  return resultContent.red.summary;
}

function finishQuiz() {
  finalResult = calculateResult();
  const content = resultContent[finalResult.type];

  $('#quiz').hidden = true;
  $('#result').hidden = false;

  const badge = $('#result-badge');
  badge.className = `result-badge ${finalResult.type}`;
  badge.textContent = content.badge;
  $('#result-title').textContent = content.title;
  $('#result-summary').textContent = contextualSummary(finalResult);
  $('#result-actions').innerHTML = content.actions.map(([title, text]) => `
    <div class="action-card"><strong>${title}</strong><p>${text}</p></div>
  `).join('');

  const goalBox = $('#goal-box');
  if (finalResult.type === 'yellow' || finalResult.type === 'green') {
    goalBox.hidden = false;
    renderGoals();
  } else {
    goalBox.hidden = true;
  }

  track('QuizCompleted', { result: finalResult.type, score: finalResult.score });
  track('ResultViewed', { result: finalResult.type });
  $('#result').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderGoals() {
  const wrap = $('#goal-options');
  wrap.innerHTML = Object.entries(goalMessages).map(([key, item]) => `
    <button type="button" class="goal-chip" data-goal="${key}">${item.label}</button>
  `).join('');
  $('#message-preview').hidden = true;

  $$('.goal-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.goal-chip').forEach(x => x.classList.remove('active'));
      btn.classList.add('active');
      const item = goalMessages[btn.dataset.goal];
      const box = $('#message-preview');
      box.hidden = false;
      box.innerHTML = `<strong>Uma abertura possível:</strong>${item.message}`;
      track('GoalSelected', { goal: btn.dataset.goal, result: finalResult?.type });
    });
  });
}

function checkoutHref() {
  const target = new URL(CONFIG.checkoutUrl);
  const current = new URL(window.location.href);
  ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','fbclid'].forEach(key => {
    const value = current.searchParams.get(key);
    if (value) target.searchParams.set(key, value);
  });
  if (finalResult?.type) target.searchParams.set('src_result', finalResult.type);
  return target.toString();
}

function goToCheckout() {
  track('CheckoutClick', { result: finalResult?.type || 'unknown', value: 29.90, currency: 'BRL' });
  window.location.href = checkoutHref();
}

$$('[data-start-quiz]').forEach(btn => btn.addEventListener('click', startQuiz));
$('#close-quiz').addEventListener('click', closeQuiz);
$('#next-btn').addEventListener('click', nextQuestion);
$('#back-btn').addEventListener('click', previousQuestion);
$('#restart-btn').addEventListener('click', startQuiz);
$('#checkout-btn').addEventListener('click', goToCheckout);

setupConsent();
