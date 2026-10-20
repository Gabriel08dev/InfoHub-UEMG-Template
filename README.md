# Template Oficial de Página Setorial — InfoHub UEMG Carangola

Este repositório é o modelo (boilerplate) institucional oficial para o desenvolvimento das páginas setoriais da disciplina de **Programação 2** (Bacharelado em Sistemas de Informação - UEMG Carangola).

---

## 🚀 Como Começar (Início Rápido)

Este projeto foi construído em **HTML5 semântico, CSS3 e JavaScript ES6+ puro**, sem dependência de Node.js, npm ou frameworks pesados.

1. Clone ou baixe este repositório para o seu computador.
2. Abra a pasta no **VS Code** (ou editor de sua preferência).
3. Abra o arquivo `index.html` no navegador dando dois cliques ou utilize a extensão **Live Server** no VS Code para desenvolvimento com recarregamento automático.

---

## 📁 Estrutura do Projeto

```text
├── index.html              # Estrutura principal da página (Header, Hero, Miolo do Setor e Footer)
├── GUIA_DO_ESTUDANTE.md    # MANUAL COMPLETO de boas práticas, regras de ouro e avaliação
├── css/
│   ├── base-uemg.css       # ⛔ NÃO ALTERAR: Estilos oficiais da UEMG (Header, Footer, Modais)
│   └── setor.css           # ✏️ ÁREA LIVRE: Escreva aqui os estilos CSS do seu setor
├── js/
│   ├── base-uemg.js        # ⛔ NÃO ALTERAR: Controle dos modais (<dialog>) e segurança anti-tabnabbing
│   └── setor.js            # ✏️ ÁREA LIVRE: Escreva aqui a interatividade JavaScript do seu setor
└── images/
    ├── logo_uemg_2.jpg     # Logotipo oficial institucional com fundo branco
    └── UEMG-fachada-1.jpg  # Fotografia histórica da fachada da Unidade Carangola
```

---

## 🛑 O que pode e o que NÃO pode ser alterado

| Componente | Pode Alterar? | O que fazer? |
|---|---|---|
| **Header (Barra Superior)** | ❌ NÃO | Manter intacto para preservar a identidade visual institucional e o link de retorno ao Hub. |
| **Hero Banner** | ⚠️ PARCIAL | Altere **apenas** o número do setor, o título oficial, a síntese descritiva e os 3 indicadores. Não altere as classes CSS base. |
| **Conteúdo do Setor (`<main>`)** |  SIM | **Área 100% livre!** Crie seções, cards, sanfonas de dúvidas frequentes, fluxos de atendimento, tabelas e botões. |
| **Footer & Modais** | ❌ NÃO | Manter intacto para garantir conformidade legal com a LGPD e termos do projeto de extensão. |

---

> 📖 **IMPORTANTE:** Leia atentamente o arquivo [GUIA_DO_ESTUDANTE.md](GUIA_DO_ESTUDANTE.md) antes de iniciar a codificação para conferir as regras de acessibilidade, links seguros e critérios de aceite do projeto.
