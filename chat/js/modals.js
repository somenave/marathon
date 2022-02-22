// import {UI} from "./view.js";

import { UI } from './view';
import Cookies from 'js-cookie/dist/js.cookie.min.mjs';
import { usernameRequest } from './requests.js';

export function setActiveModal(modalBtn) {
    const activeModalName = modalBtn.getAttribute('data-modal-btn');
    const activeModal = document.querySelector(`[data-modal=${activeModalName}]`);
    activeModal.classList.add('active');
}

export function closeModal(modal) {
    modal.classList.remove('active');
}

UI.MODAL.BUTTONS.forEach(modalBtn => modalBtn.addEventListener('click', () => setActiveModal(modalBtn)));

UI.MODAL.CLOSE_BUTTONS.forEach(closeBtn => closeBtn.addEventListener('click', () => closeModal(closeBtn.closest('.modal'))));

UI.MODAL.ITEMS.forEach(modal => {
    modal.addEventListener('submit', (e) => {
        e.preventDefault();

        switch (modal.getAttribute('data-modal')) {
        case ('login'):
            UI.MODAL.PROFILE_BUTTON.setAttribute('data-modal-btn', 'logout');
            UI.MODAL.PROFILE_BUTTON.textContent = 'Выйти';
            Cookies.set('token', modal.querySelector('.modal__input').value);
            break;
        case ('settings'):
            usernameRequest(modal.querySelector('.name-input').value);
            break;
        case ('logout'):
            Cookies.remove('token');
            UI.MODAL.PROFILE_BUTTON.setAttribute('data-modal-btn', 'login');
            UI.MODAL.PROFILE_BUTTON.textContent = 'Войти';
            break;
        }
        closeModal(modal);
    });
});
