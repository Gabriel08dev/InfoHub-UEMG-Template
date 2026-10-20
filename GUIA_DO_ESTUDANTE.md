# Guia do Estudante — Desenvolvimento de Páginas Setoriais

## Atividade de Extensão Curricularizada • Programação 2 (BSI — UEMG Carangola)

Olá, futuro(a) Engenheiro(a) de Software!

Este guia foi elaborado para orientar você e sua equipe no desenvolvimento do portal setorial da UEMG Carangola sob sua responsabilidade. O objetivo é garantir **autonomia criativa** para o seu grupo enquanto mantemos um **padrão unificado de excelência visual, acessibilidade e segurança** em todo o ecossistema do InfoHub.

---

## 🎯 1. O Desafio do Seu Grupo

Cada equipe de discentes foi designada para um setor institucional da Unidade Carangola (ex: *Estágios*, *CPA*, *Pesquisa*, *NAE*, *Matrícula*, *Formatura*, etc.).

Sua missão é:

1. Mapear as reais dúvidas e necessidades dos estudantes e professores que procuram esse setor.
2. Identificar normativas, regulamentos, resoluções e fluxogramas oficiais de atendimento.
3. Construir uma página estática de autoatendimento rápida, intuitiva, acessível e responsiva.

---

## 🛡️ 2. As Regras de Ouro (Invioláveis)

### Regra 1: "Vanilla First" — Zero Framework Bloat

* **Permitido:** HTML5 puro, CSS3 moderno com variáveis nativas (`var(...)`), JavaScript ES6+ puro.
* **Proibido:** Não utilize frameworks pesados (React, Angular, Vue), pré-processadores complexos ou bibliotecas CSS infladas (Tailwind CSS, Bootstrap).
* **Por quê?** Páginas Vanilla têm carregamento instantâneo, não quebram com atualizações de versões de pacotes e podem ser facilmente compreendidas e auditadas por qualquer aluno de períodos seguintes.

### Regra 2: Preservação da Casca Institucional

* O **Header** e o **Footer** do arquivo `index.html` e o arquivo `css/base-uemg.css` **NÃO DEVEM SER MODIFICADOS**.
* O **Hero Banner** deve manter sua estrutura de classes, alterando-se apenas os textos referentes ao seu setor.
* Toda a criação do seu grupo deve ficar concentrada entre as tags `<main id="main-content">` e estilizada no arquivo `css/setor.css`.

### Regra 3: Segurança Anti-Tabnabbing em Links Externos

Sempre que você criar um link (`<a>`) apontando para um site externo (como formulários do Google, portal da UEMG, editais em PDF), utilize **obrigatoriamente**:

```html
<a href="https://exemplo.com/edital.pdf" target="_blank" rel="noopener noreferrer">
  Baixar Edital Oficial (PDF) ↗
</a>
```

> *Nota: O script `js/base-uemg.js` já audita e força essa proteção automaticamente, mas é boa prática de engenharia já escrever com os atributos corretos.*

### Regra 4: Conformidade com a LGPD (Privacy-by-Design)

* **NUNCA** crie formulários que solicitem dados sensíveis dos alunos (como CPF, senhas de portal institucional ou dados bancários).
* O portal deve ser estritamente informativo e de autoatendimento. Para formulários de requerimento oficial, aponte para os canais institucionais oficiais da UEMG.

---

## 🎨 3. Como Usar o Design System da UEMG

O arquivo `css/base-uemg.css` já disponibiliza as variáveis oficiais da universidade no `:root`. No seu arquivo `css/setor.css`, **reaproveite essas variáveis** em vez de inventar códigos hexadecimais aleatórios:

| Variável | Valor | Quando Usar |
| --- | --- | --- |
| `var(--color-primary)` | `#003366` | Azul institucional da UEMG. Títulos principais, bordas e destaques. |
| `var(--color-primary-dark)` | `#002244` | Fundo noturno, cabeçalhos de tabela. |
| `var(--color-accent-amber)` | `#e65100` | Laranja/Âmbar. Botões de ação, avisos e chamadas de atenção. |
| `var(--color-surface)` | `#ffffff` | Fundo de cards, caixas e modais. |
| `var(--color-bg)` | `#f4f6f9` | Fundo neutro da página. |
| `var(--radius-md)` / `var(--radius-lg)` | `8px` / `12px` | Arredondamento suave de cantos de cards e botões. |
| `var(--shadow-card)` | Sombra suave | Elevação profissional de cartões informativos. |

---

## 💡 4. Exemplos Práticos de Componentes para o seu Setor

### A. Perguntas Frequentes (FAQ) com `<details>` e `<summary>` (Nativo e Acessível)

Não use JavaScript complicado para sanfonas. O HTML5 possui suporte nativo acessível:

```html
<section class="setor-faq">
  <h3>Perguntas Frequentes do Setor</h3>
  
  <details class="setor-faq-item">
    <summary>Qual é o prazo para entrega do relatório de estágio?</summary>
    <p>O relatório deve ser protocolado até 15 dias corridos após o término do período letivo através do e-mail da coordenação.</p>
  </details>

  <details class="setor-faq-item">
    <summary>Quem assina o Termo de Compromisso?</summary>
    <p>O termo deve conter a assinatura do discente, do responsável na empresa concedente e do professor orientador da UEMG.</p>
  </details>
</section>
```

No `css/setor.css`:

```css
.setor-faq-item {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-sm);
}

.setor-faq-item summary {
  font-weight: 700;
  color: var(--color-primary);
  cursor: pointer;
}

.setor-faq-item p {
  margin-top: var(--spacing-sm);
  color: var(--color-text-main);
}
```

---

### B. Tabela Responsiva de Horários e Canais de Contato

```html
<div class="setor-table-wrapper">
  <table class="setor-table">
    <thead>
      <tr>
        <th>Atividade / Plantão</th>
        <th>Dias e Horários</th>
        <th>Responsável</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Atendimento Presencial</td>
        <td>Segunda a Quinta, 18h às 21h</td>
        <td>Secretaria Acadêmica</td>
      </tr>
      <tr>
        <td>Dúvidas por E-mail</td>
        <td>estagios.carangola@uemg.br</td>
        <td>Prof. Coordenador</td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## ✅ 5. Checklist de Entrega Final

Antes de submeter o repositório da sua equipe para avaliação e integração com a landing page principal do InfoHub, verifique cada item:

* [ ] **Título e Metadados:** O `<title>` e a `<meta name="description">` do `index.html` estão preenchidos com o nome do seu setor.
* [ ] **Hero do Setor:** O badge, título e resumo no Hero Banner condizem exatamente com o setor.
* [ ] **Link de Retorno:** O botão "Voltar ao Hub" no topo está funcionando.
* [ ] **Responsividade:** A página foi testada no celular (telas estreitas de 320px e 375px) e no computador sem barras de rolagem horizontais indesejadas.
* [ ] **Contraste e Acessibilidade:** Todos os textos possuem alto contraste com os fundos (legibilidade fácil).
* [ ] **Links Externos Seguros:** Todo link externo possui `target="_blank" rel="noopener noreferrer"`.
* [ ] **Zero Erros no Console:** Ao abrir a página e inspecionar o Console do Desenvolvedor (F12), não há erros vermelhos de script.
* [ ] **Modais de Governança:** Clicar nos links de rodapé ("Sobre o Projeto", "Termos de Uso" e "Política de Privacidade") abre os modais corretamente.

---

Bom desenvolvimento a toda a equipe!
