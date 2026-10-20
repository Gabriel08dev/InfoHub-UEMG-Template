/**
 * InfoHub UEMG Carangola — Lógica Base Institucional para Páginas Setoriais
 * ATENÇÃO: ESTE ARQUIVO É PADRONIZADO E NÃO DEVE SER ALTERADO PELOS ALUNOS.
 * Ele gerencia a acessibilidade, os modais institucionais do rodapé e a segurança contra tabnabbing.
 */

document.addEventListener('DOMContentLoaded', () => {
  initModals();
  enforceExternalLinksSecurity();
});

/**
 * Inicialização e controle dos Modais Semânticos (<dialog>)
 */
function initModals() {
  const triggers = document.querySelectorAll('.footer-modal-trigger');

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const targetId = trigger.getAttribute('data-modal-target');
      const dialog = document.getElementById(targetId);
      if (dialog && typeof dialog.showModal === 'function') {
        dialog.showModal();
      }
    });
  });

  // Fecha modais ao clicar em botões com [data-close-modal]
  document.querySelectorAll('.app-dialog').forEach((dialog) => {
    dialog.querySelectorAll('[data-close-modal]').forEach((closeBtn) => {
      closeBtn.addEventListener('click', () => {
        dialog.close();
      });
    });

    // Fecha se o usuário clicar no backdrop fora do conteúdo
    dialog.addEventListener('click', (e) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width;
      if (!isInDialog) {
        dialog.close();
      }
    });
  });
}

/**
 * Aplica automaticamente proteção contra tabnabbing reverso em qualquer link externo
 * adicionado pelos alunos que abra em nova aba (target="_blank").
 */
function enforceExternalLinksSecurity() {
  const externalLinks = document.querySelectorAll('a[target="_blank"]');
  externalLinks.forEach((link) => {
    const rel = link.getAttribute('rel') || '';
    if (!rel.includes('noopener') || !rel.includes('noreferrer')) {
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
}
