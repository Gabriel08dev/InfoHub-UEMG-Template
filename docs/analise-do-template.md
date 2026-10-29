# Análise do template e plano

Base inspecionada: `Gabriel08dev/InfoHub-UEMG-Template`, branch `main`, commit `fbb52ad`.

## Estrutura original

- Uma página `index.html`, com navegação por links e três modais nativos `<dialog>`.
- HTML5, CSS3 com variáveis e JavaScript clássico ES6+. Sem framework, roteador, gerenciador de pacotes ou dependências de execução.
- `css/base-uemg.css`: tokens, reset, cabeçalho, banner, rodapé e diálogos.
- `css/setor.css` e `js/setor.js`: espaços destinados à adaptação do setor.
- `js/base-uemg.js`: controle dos modais e proteção de links externos.
- Duas imagens locais: logotipo e foto da fachada. Reutilizadas.
- `GUIA_DO_ESTUDANTE.md`: regras do template; mantido como referência histórica.

## Diagnóstico

O template já oferece uma base institucional leve, bons tokens de cores, HTML semântico e diálogos nativos. O conteúdo principal e os metadados eram exemplos, sem fluxos funcionais. Faltavam navegação interna, salto de conteúdo e adaptação do cabeçalho para telas estreitas. Os textos de governança afirmavam validação e custódia institucionais não demonstradas para este fork.

## Plano executado

1. Preservar HTML/CSS/JS puro, imagens e estrutura de cabeçalho, hero, rodapé e modais. Manter os dois arquivos `base-uemg.*` intactos.
2. Substituir exemplos por sistemas, guia, tutoriais, atendimento, FAQ e apresentação do projeto; personalizar o hero e os metadados.
3. Centralizar destinos e contatos em `js/config.js`. Reutilizar no guia os passos dos tutoriais estáticos, evitando duas versões das instruções.
4. Identificar fontes oficiais, dados pendentes e relatos da entrevista. Corrigir apenas afirmações de governança incompatíveis com o briefing, mantendo os componentes do template.
5. Verificar teclado, diálogos, estados do guia, links e larguras móveis/desktop. Acrescentar exportação e verificações opcionais em Node, sem pacotes externos.

A necessidade de corrigir afirmações de endosso e garantir acessibilidade decorre do briefing do usuário e prevalece sobre a proibição genérica de editar textos de rodapé/modais no guia original. A aparência e os mecanismos desses componentes foram preservados.
