import {UI} from "./view.js";

export function modalHandler() {
  setActiveModal();
  closeModalHandler();
  profileActionsHandler();
}

function setActiveModal() {
  UI.MODAL.BUTTONS.forEach(modalBtn => modalBtn.addEventListener('click', function() {
    const activeModalName = this.getAttribute('data-modal-btn');
    const activeModal = document.querySelector(`[data-modal=${activeModalName}]`);
    activeModal.classList.add('active');
  }));
}

function closeModalHandler() {
  UI.MODAL.CLOSE_BUTTONS.forEach(closeBtn => closeBtn.addEventListener('click', function () {
    this.closest('.modal').classList.remove('active');
  }));
}

function profileActionsHandler() {
  UI.MODAL.PROFILE_ITEMS.forEach(modal => modal.addEventListener('submit', function (e) {
    e.preventDefault();
    if (modal.getAttribute('data-modal') === 'login') {
      UI.MODAL.PROFILE_BUTTON.setAttribute('data-modal-btn', 'logout');
      UI.MODAL.PROFILE_BUTTON.textContent = 'Выйти';
    } else {
      UI.MODAL.PROFILE_BUTTON.setAttribute('data-modal-btn', 'login');
      UI.MODAL.PROFILE_BUTTON.textContent = 'Войти';
    }
    modal.classList.remove('active');
  }));
}
