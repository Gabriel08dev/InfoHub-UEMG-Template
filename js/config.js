/** Links públicos institucionais e do projeto. Nunca adicionar credenciais ou identificadores acadêmicos. */
window.InfoHubConfig = Object.freeze({
  checkedAt: '2026-10-29',
  links: Object.freeze({
    university: 'https://www.uemg.br/',
    campus: 'https://www.uemg.br/carangola',
    lyceum: 'https://uemg.lyceum.com.br/aluno/#/login',
    email: 'https://outlook.cloud.microsoft/?realm=discente.uemg.br',
    lyceumGuidance: 'https://www.uemg.br/component/content/article/510-a-uemg/uemg-lyceum/20833-uemg-lyceum?Itemid=437',
    lyceumTutorial: 'https://www.uemg.br/ensino-ibirite/horario-de-aulas/category/3025-1-semestre?download=16020%3Aorientacoes-para-matricula',
    emailGuidance: 'https://www.uemg.br/publicacoes/22820-e-mail-institucional-da-uemg-acesso-e-orientacoes-para-estudantes',
    contacts: 'https://www.uemg.br/carangola-institucional/telefones-uteis'
  }),
  projectLinks: Object.freeze({
    repository: 'https://github.com/Gabriel08dev/InfoHub-UEMG-Template',
    gabrielLinkedin: 'https://lnkd.in/p/duUazDCM',
    davyLinkedin: 'https://lnkd.in/p/dqvh47RH',
    samuelLinkedin: 'https://lnkd.in/p/d-cW65JH'
  }),
  contacts: Object.freeze({
    secretariatEmail: Object.freeze({ label: 'secretaria.carangola@uemg.br', href: 'mailto:secretaria.carangola@uemg.br' }),
    secretariatPhone: Object.freeze({ label: '(32) 3741-7524', href: 'tel:+553237417524' }),
    itEmail: Object.freeze({ label: 'informatica.carangola@uemg.br', href: 'mailto:informatica.carangola@uemg.br' }),
    itPhone: Object.freeze({ label: '(32) 3741-4087', href: 'tel:+553237414087' })
  }),
  systems: Object.freeze({
    lyceum: Object.freeze({ name: 'Portal do Aluno — Lyceum', description: 'Notas, frequência, matrícula e cadastro', icon: 'academic', access: 'lyceum', source: 'lyceumTutorial', sourceLabel: 'Orientação da UEMG (PDF)', action: 'Abrir o Lyceum' }),
    email: Object.freeze({ name: 'E-mail institucional', description: 'Microsoft 365 · Outlook', icon: 'mail', access: 'email', source: 'emailGuidance', sourceLabel: 'Tutorial oficial da UEMG', action: 'Abrir o e-mail institucional' })
  })
});
