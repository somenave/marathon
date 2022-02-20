import Cookies from '../node_modules/js-cookie/dist/js.cookie.min.mjs';
import { UI } from './view.js';
import { closeModal, setActiveModal } from './modals.js';
import { sendRequest } from "./requests.js";

const DEFAULT_USER_NAME = 'Я: ';
const CHAT_API = 'https://chat1-341409.oa.r.appspot.com/api/';
const USER_URL = CHAT_API + 'user';
const USER_DATA_URL = CHAT_API + 'user/me';
let userName = Cookies.get('username') || DEFAULT_USER_NAME;


document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    UI.MODAL.BUTTONS.forEach(modalBtn => modalBtn.addEventListener('click', () => setActiveModal(modalBtn)));

    UI.MODAL.CLOSE_BUTTONS.forEach(closeBtn => closeBtn.addEventListener('click', () => closeModal(closeBtn.closest('.modal'))));

    UI.CHAT.SEND_FORM.addEventListener('submit', (e) => {
        e.preventDefault();
        checkAuth();
        sendMessage();
    });

    UI.MODAL.ITEMS.forEach(modal => {
        modal.addEventListener('submit', (e) => {
            e.preventDefault();

            switch (modal.getAttribute('data-modal')) {
            case ('login'):
                UI.MODAL.PROFILE_BUTTON.setAttribute('data-modal-btn', 'logout');
                UI.MODAL.PROFILE_BUTTON.textContent = 'Выйти';
                setToken(modal.querySelector('.modal__input').value);
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
});

function  getToken(email) {
    sendRequest(USER_URL, 'POST', {email: email})
        .then(console.log)
        .catch(alert)
}

function usernameRequest(name) {
    sendRequest(USER_URL, 'PATCH', {name: name})
        .then(json => {
            Cookies.set('username', `${json.name}`);
            userName = `${Cookies.get('username')}: `;
        })
        .catch(console.log)
}

function getUserData() {
    fetch(USER_DATA_URL, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${Cookies.get('token')}`
        }
    })
        .then(userData => userData.json())
        .then(console.log)
        .catch(console.log);
}

function checkAuth() {
    if (Cookies.get('token')) {
        UI.MODAL.PROFILE_BUTTON.setAttribute('data-modal-btn', 'logout')
        UI.MODAL.PROFILE_BUTTON.textContent = 'Выйти';
    } else {
        setActiveModal(UI.MODAL.PROFILE_BUTTON);
    }
}

function getTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = '0' + date.getMinutes();
    return hours + ':' + minutes.slice(-2);
}

function setToken(token) {
    Cookies.set('token', token);
}

function createMessage() {
    const messageContent = UI.CHAT.SEND_INPUT.value.trim();
    if (messageContent) {
        const message = UI.MESSAGE.TEMPLATE.content.cloneNode(true);
        message.querySelector('.message-text__author').textContent = userName;
        message.querySelector('.message-text__content').textContent = messageContent;
        message.querySelector('.message__time').textContent = getTime();
        UI.CHAT.BODY.append(message);
    }
}

function sendMessage() {
    createMessage();
    UI.CHAT.SEND_FORM.reset();
    document.querySelector('.message:last-child').scrollIntoView();
}
