import { sendRequest } from './requests.js';
import Cookies from 'js-cookie/dist/js.cookie.min.mjs';
import { UI } from './view.js';
import { setActiveModal } from './modals.js';

export function getTime(value = new Date()) {
    const date = value;
    const hours = date.getHours();
    const minutes = '0' + date.getMinutes();
    return hours + ':' + minutes.slice(-2);
}

export function checkAuth() {
    if (Cookies.get('token')) {
        UI.MODAL.PROFILE_BUTTON.setAttribute('data-modal-btn', 'logout');
        UI.MODAL.PROFILE_BUTTON.textContent = 'Выйти';
    } else {
        setActiveModal(UI.MODAL.PROFILE_BUTTON);
    }
}
