# InfoHub UEMG — Guia de acesso

Portal de orientação para estudantes da UEMG Carangola. Ajuda a identificar o sistema correto, consultar instruções de recuperação e encontrar os canais institucionais de atendimento.

Esta implementação adapta o fork [Gabriel08dev/InfoHub-UEMG-Template](https://github.com/Gabriel08dev/InfoHub-UEMG-Template). Preserva HTML, CSS e JavaScript puro, os tokens do template, as imagens locais, o cabeçalho, o banner, o rodapé e os modais nativos. Os arquivos `base-uemg.css` e `base-uemg.js` permanecem intactos.

O InfoHub é um **projeto acadêmico de extensão**. Não representa um serviço oficial de autenticação, não recupera senhas e não presume endosso institucional da Universidade.

## Executar

Não é necessário instalar pacotes. Abra `index.html` em um navegador atual. Os tutoriais e contatos funcionam mesmo sem JavaScript; o guia interativo, a cópia de e-mail e os modais usam JavaScript.

Para desenvolvimento por HTTP, com Node.js instalado:

```sh
git clone https://github.com/Gabriel08dev/InfoHub-UEMG-Template.git
cd InfoHub-UEMG-Template
node scripts/serve.mjs
```

Acesse `http://127.0.0.1:4173`. Encerre o servidor com Ctrl+C. É possível escolher outra porta pela variável de ambiente `PORT`. Uma extensão de servidor estático, como Live Server, também pode ser usada.

## Funcionalidades

- Página inicial com identidade InfoHub, apresentação e chamada para recuperar acesso.
- Atalhos separados para Portal do Aluno — Lyceum e e-mail institucional — Microsoft 365.
- Guia com escolha do sistema, instruções, confirmação do resultado, sucesso e encaminhamento ao apoio.
- Tutoriais numerados, com fontes e avisos, disponíveis independentemente do guia.
- E-mail, telefone e endereço verificados da secretaria; canais publicados da informática.
- FAQ acessível com `details`/`summary`, apresentação do projeto e informações de governança.
- Navegação interna, salto para o conteúdo, foco visível, redução de movimento e layout responsivo.
- Nenhum formulário de credenciais, CPF ou matrícula; sem backend, cookies de aplicação, analytics ou armazenamento de escolhas.

## Estrutura

```text
index.html                     Conteúdo, navegação, tutoriais e modais
css/base-uemg.css               Design original do template, preservado
css/setor.css                   Adaptação visual e responsividade
js/base-uemg.js                 Modais e proteção de links, preservado
js/config.js                   URLs oficiais, contatos e identificação dos sistemas
js/setor.js                    Guia, atalhos, navegação e cópia do e-mail
images/                        Imagens locais do template
scripts/serve.mjs              Servidor opcional de desenvolvimento
scripts/check.mjs              Verificações de conteúdo, links e JavaScript
scripts/build.mjs              Exportação dos arquivos públicos para dist/
docs/analise-do-template.md     Diagnóstico da base e plano de implementação
docs/fontes-e-pendencias.md     Fontes, limites e dados a confirmar
docs/validacao.md               Registro dos testes
GUIA_DO_ESTUDANTE.md            Guia original da disciplina, preservado
.openai/hosting.json            Identidade e configuração de hospedagem Sites
```

A navegação usa âncoras na mesma página, sem roteador. Os passos do guia são copiados dos tutoriais estáticos em tempo de execução; não há duas implementações independentes das instruções. O estado do guia fica apenas na memória da página.

## Verificações e exportação

```sh
node scripts/check.mjs
node scripts/build.mjs
```

O primeiro comando verifica sintaxe dos scripts, âncoras, rótulos, arquivos referenciados, links externos protegidos, consistência entre HTML e configuração e ausência dos mecanismos de coleta/persistência previstos na verificação. Não realiza chamadas aos sistemas da UEMG.

O segundo copia somente HTML, CSS, JavaScript e imagens para `dist/`. Essa pasta gerada pode ser publicada em uma hospedagem estática. Não há instalação de dependências nem compilação de framework. O projeto original não possuía linter, TypeScript ou suíte de testes.

Consulte [o registro de validação](docs/validacao.md) para os caminhos exercitados no navegador e as larguras verificadas. A recuperação real exige o ambiente oficial e não foi executada com dados de estudantes.

## Atualizar informações

1. Consulte a fonte oficial e confirme a data e o conteúdo aplicável à unidade.
2. Atualize URLs e contatos em `js/config.js`.
3. Atualize também os links HTML com `data-official`/`data-contact`, preservando o funcionamento sem JavaScript. A verificação detecta divergências.
4. Edite os passos em `index.html`, nos artigos `tutorial-lyceum` e `tutorial-email`. O guia reutiliza automaticamente esses passos.
5. Revise FAQ, avisos, datas e `docs/fontes-e-pendencias.md` quando uma orientação mudar.
6. Execute as verificações e repita os caminhos afetados no navegador.

Todo link externo deve usar `target="_blank" rel="noopener noreferrer"`. Não acrescente formulários de identificação, captura de senhas, telemetria ou serviços externos desnecessários.

## Fontes e pendências

Fontes principais, conferidas em **29/10/2026**:

- [Lyceum na UEMG](https://www.uemg.br/component/content/article/510-a-uemg/uemg-lyceum/20833-uemg-lyceum?Itemid=437).
- [E-mail institucional: acesso e orientações para estudantes](https://www.uemg.br/publicacoes/22820-e-mail-institucional-da-uemg-acesso-e-orientacoes-para-estudantes).
- [Endereço e Canais de Comunicação — Carangola](https://www.uemg.br/carangola-institucional/telefones-uteis).
- Entrevista com representante da secretaria, fornecida pela equipe no briefing; seus relatos são identificados separadamente de documentação oficial.

**Permanecem a confirmar:** horários específicos dos setores, prazos de resposta, detalhes técnicos do fluxo do Lyceum para diferentes perfis e nomes/responsabilidades da equipe e orientação docente. Esses pontos estão sinalizados no site. Não foram atribuídos os horários gerais da unidade à secretaria.

## Privacidade e governança

O estudante informa qualquer dado solicitado somente no serviço institucional de destino. O InfoHub não possui integração com autenticação, banco de dados, armazenamento local ou envio de requisições de recuperação. Os contatos são links públicos `mailto:` e `tel:`; clicar em um deles usa o aplicativo do visitante.

O provedor de hospedagem e as páginas externas podem ter políticas e registros técnicos próprios. O guia não faz alegações de anonimato absoluto nem de endosso oficial. Os textos herdados que alegavam validação institucional ou custódia garantida foram ajustados para refletir o escopo desta adaptação.
