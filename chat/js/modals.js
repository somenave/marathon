import {UI} from "./view.js";

export function modalHandler() {
  UI.modalButtons.forEach(modalBtn => modalBtn.addEventListener('click', function() {
    const activeModal = this.getAttribute('data-modal-btn');
    document.querySelector(`[data-modal=${activeModal}]`).classList.add('active');
  }));
  
  UI.modalCloseButtons.forEach(closeBtn => closeBtn.addEventListener('click', function () {
    this.closest('.modal').classList.remove('active');
  }));
}