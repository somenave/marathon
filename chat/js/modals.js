// import {UI} from "./view.js";

export function setActiveModal(modalBtn) {
    const activeModalName = modalBtn.getAttribute('data-modal-btn');
    const activeModal = document.querySelector(`[data-modal=${activeModalName}]`);
    activeModal.classList.add('active');
}

export function closeModal(modal) {
    modal.classList.remove('active');
}
