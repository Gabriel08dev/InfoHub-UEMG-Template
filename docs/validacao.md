# Validação do InfoHub

Data: 29/10/2026. Navegador Chromium integrado à pré-visualização local.

## Verificações realizadas

- Guia: seleção de Lyceum/e-mail, instruções específicas, revisão, troca de sistema, confirmação de sucesso, encaminhamento ao atendimento e reinício. Atalho dos cartões preserva a escolha do sistema.
- E-mail: quatro etapas próprias e link para o tutorial oficial; Lyceum: três etapas, sem inferir mecanismos não documentados. O guia reutiliza os passos e avisos do tutorial correspondente.
- Teclado: seleção do e-mail com Enter, abertura da FAQ com Enter, foco no título após mudança de etapa, fechamento de diálogo por Escape e devolução do foco ao botão de origem.
- Governança: abertura/fechamento dos três diálogos originais e textos revistos para esta adaptação.
- Cópia do e-mail público: mensagem de sucesso; tratamento de indisponibilidade implementado com alternativa pelo link visível.
- Sem JavaScript: guia substituído por links aos dois tutoriais; instruções, contatos e navegação continuam disponíveis.
- Ausência de formulários de login, identificação e armazenamento no cliente; nenhum dado de estudante foi usado nos testes.
- Console sem erros ou avisos nos caminhos exercitados.
- Conferência de respostas HTTP 200 para Portal do Aluno, Outlook, PDF de orientações e retorno ao Hub. Páginas de e-mail/contatos consultadas com HTTP 200; não foi submetida recuperação real.
- Scripts `node scripts/check.mjs` e `node scripts/build.mjs`; sem dependências adicionais, sem etapa de TypeScript e sem linter preexistente.

## Larguras responsivas

| Viewport | Largura útil / documento | Rolagem horizontal |
| --- | --- | --- |
| 320 px | 305 / 305 px | Não |
| 375 px | 360 / 360 px | Não |
| 768 px | 753 / 753 px | Não |
| 1366 px | 1351 / 1351 px | Não |

A diferença de 15 px é a barra de rolagem vertical do navegador de teste. A inspeção procurou também elementos visíveis fora dos limites da página. O banner, os cartões e o guia foram revisados visualmente.

## Limites

O teste não autentica um estudante, não confirma envio de token e não altera senhas. O funcionamento dos serviços externos depende de suas próprias plataformas. As pendências editoriais estão em `fontes-e-pendencias.md` e nas seções correspondentes da página. A verificação de acessibilidade cobre semântica, foco, teclado, contraste por inspeção e comportamento responsivo; não substitui uma avaliação com usuários e leitores de tela reais.
