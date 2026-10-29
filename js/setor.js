/** Guia local: nenhuma credencial, persistência, requisição ou autenticação. */
document.addEventListener('DOMContentLoaded', () => {
  const config = window.InfoHubConfig;
  if (!config) return; // Os tutoriais e os links HTML continuam disponíveis.

  document.querySelectorAll('[data-official]').forEach((link) => {
    const url = config.links[link.dataset.official];
    if (url) link.href = url;
  });
  document.querySelectorAll('[data-contact]').forEach((link) => {
    const contact = config.contacts[link.dataset.contact];
    if (!contact) return;
    link.href = contact.href;
    link.textContent = contact.label;
  });

  initRecoveryGuide(config);
  initEmailCopy(config);
  initSectionNavigation();
});

function createIcon(name) {
  const namespace = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(namespace, 'svg');
  svg.classList.add('icon');
  svg.setAttribute('aria-hidden', 'true');
  const use = document.createElementNS(namespace, 'use');
  use.setAttribute('href', `#icon-${name}`);
  svg.append(use);
  return svg;
}

function createElement(tag, text, className) {
  const node = document.createElement(tag);
  if (text) node.textContent = text;
  if (className) node.className = className;
  return node;
}

function createOfficialLink(text, href, className = 'button button-outline') {
  const link = createElement('a', text, className);
  link.href = href;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.append(createIcon('external'));
  return link;
}

function createButton(text, onClick, className = 'button button-outline') {
  const button = createElement('button', text, className);
  button.type = 'button';
  button.addEventListener('click', onClick);
  return button;
}

function initRecoveryGuide(config) {
  const flow = document.getElementById('recovery-flow');
  const content = document.getElementById('flow-content');
  const fallback = document.getElementById('guide-fallback');
  if (!flow || !content || !fallback) return;
  let selectedSystem = null;

  function setStage(stage, title, focus) {
    content.replaceChildren();
    const stages = ['choose', 'instructions', 'result'];
    flow.querySelectorAll('[data-progress]').forEach((item) => {
      const active = item.dataset.progress === stage;
      if (active) item.setAttribute('aria-current', 'step');
      else item.removeAttribute('aria-current');
      item.classList.toggle('is-complete', stages.indexOf(item.dataset.progress) < stages.indexOf(stage));
    });
    if (selectedSystem) content.append(createElement('span', config.systems[selectedSystem].name, 'flow-context'));
    const heading = createElement('h3', title);
    heading.tabIndex = -1;
    content.append(heading);
    // O foco no título anuncia a mudança sem uma região aria-live duplicada.
    if (focus) heading.focus();
  }

  function showChoice(focus = true) {
    selectedSystem = null;
    setStage('choose', 'Em qual sistema ocorre a dificuldade de acesso?', focus);
    content.append(createElement('p', 'Selecione o sistema institucional para consultar as orientações disponíveis.'));
    const options = createElement('div', '', 'flow-options');
    Object.entries(config.systems).forEach(([key, system]) => {
      const button = createButton('', () => showInstructions(key), 'flow-option');
      const tile = createElement('span', '', `icon-tile${key === 'email' ? ' icon-tile-warm' : ''}`);
      tile.append(createIcon(system.icon));
      const label = createElement('span');
      label.append(createElement('strong', system.name), createElement('small', system.description));
      button.append(tile, label, createIcon('arrow'));
      options.append(button);
    });
    content.append(options, createElement('p', 'O guia não solicita informações pessoais ou credenciais.', 'flow-source'));
  }

  function showInstructions(key) {
    const system = config.systems[key];
    if (!system) return;
    selectedSystem = key;
    setStage('instructions', 'Instruções para recuperação de acesso', true);
    const prelude = document.querySelector(`#tutorial-${key} .tutorial-prelude`);
    const steps = document.querySelector(`#tutorial-${key} [data-tutorial-steps]`);
    const note = document.querySelector(`#tutorial-${key} [data-tutorial-note]`);
    if (prelude) content.append(prelude.cloneNode(true));
    if (steps) content.append(steps.cloneNode(true));
    if (note) content.append(note.cloneNode(true));
    const source = createElement('p', 'Fonte: ', 'flow-source');
    source.append(createOfficialLink(system.sourceLabel, config.links[system.source], 'text-link'));
    const actions = createElement('div', '', 'button-row');
    actions.append(
      createOfficialLink(system.action, config.links[system.access], 'button button-dark'),
      createButton('Confirmar resultado da tentativa', showResolution)
    );
    content.append(source, actions, createButton('← Selecionar outro sistema', () => showChoice(), 'flow-back'));
  }

  function showResolution() {
    if (!selectedSystem) return showChoice();
    setStage('result', 'O acesso ao sistema foi restabelecido?', true);
    content.append(createElement('p', 'Informe o resultado da tentativa realizada no serviço oficial. A resposta é utilizada apenas para apresentar a orientação seguinte.'));
    const actions = createElement('div', '', 'button-row');
    actions.append(createButton('Sim, acesso restabelecido', showSuccess, 'button button-dark'), createButton('Não, consultar atendimento', showSupport));
    content.append(actions, createButton('← Rever as orientações', () => showInstructions(selectedSystem), 'flow-back'));
  }

  function showSuccess() {
    setStage('result', 'Acesso restabelecido', true);
    const badge = createElement('div', '', 'flow-result-icon');
    badge.append(createIcon('check'));
    content.prepend(badge);
    content.append(createElement('p', 'Mantenha as informações de recuperação atualizadas e armazene suas credenciais com segurança. Esta confirmação considera a resposta informada; o InfoHub não verifica o acesso à conta.'));
    content.append(createButton('Iniciar nova consulta', () => showChoice(), 'flow-back'));
  }

  function showSupport() {
    setStage('result', 'Orientações para solicitar atendimento', true);
    const guidance = selectedSystem === 'email'
      ? 'Caso o e-mail pessoal cadastrado no Lyceum esteja incorreto ou indisponível, solicite orientação à Secretaria Acadêmica para atualização cadastral.'
      : 'Solicite à Secretaria Acadêmica a verificação do cadastro e as orientações aplicáveis ao acesso ao Lyceum.';
    content.append(createElement('p', guidance));
    const contact = createElement('div', '', 'flow-contact');
    contact.append(createElement('h4', 'Secretaria Acadêmica · Carangola'));
    ['secretariatEmail', 'secretariatPhone'].forEach((key) => {
      const link = createElement('a', config.contacts[key].label);
      link.href = config.contacts[key].href;
      contact.append(link);
    });
    const channelSource = createElement('p', 'Contatos: ', 'flow-source');
    channelSource.append(createOfficialLink('Página oficial da unidade', config.links.contacts, 'text-link'));
    const supportLink = createElement('a', 'Consultar canais de atendimento', 'button button-dark');
    supportLink.href = '#apoio';
    const actions = createElement('div', '', 'button-row');
    actions.append(supportLink);
    content.append(contact,
      createElement('p', 'Segundo a entrevista do projeto, o atendimento pode começar por e-mail; a secretaria encaminha à TI os casos não resolvidos. Não envie senhas ou códigos. A eventual identificação deve ocorrer apenas no canal institucional.', 'flow-source'),
      channelSource, actions, createButton('← Iniciar nova consulta', () => showChoice(), 'flow-back'));
  }

  showChoice(false);
  flow.hidden = false;
  fallback.hidden = true;
  document.querySelectorAll('[data-start-guide]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const key = link.dataset.startGuide;
      if (!config.systems[key]) return;
      event.preventDefault();
      showInstructions(key);
      document.getElementById('recuperar').scrollIntoView({ block: 'start' });
    });
  });
}

function initEmailCopy(config) {
  const button = document.querySelector('[data-copy-email]');
  const status = document.getElementById('copy-status');
  if (!button || !status || !navigator.clipboard?.writeText) return;
  button.hidden = false;
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(config.contacts.secretariatEmail.label);
      status.textContent = 'Endereço de e-mail copiado.';
    } catch {
      status.textContent = 'Cópia indisponível. Selecione o endereço de e-mail ou utilize o link para abrir o aplicativo de e-mail.';
    }
  });
}

function initSectionNavigation() {
  if (!('IntersectionObserver' in window)) return;
  const links = document.querySelectorAll('.section-nav a');
  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    links.forEach((link) => {
      if (link.hash === `#${visible.target.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-10% 0px -55% 0px', threshold: 0 });
  links.forEach((link) => {
    const section = document.getElementById(link.hash.slice(1));
    if (section) observer.observe(section);
  });
}
