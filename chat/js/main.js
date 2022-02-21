import Cookies from '../node_modules/js-cookie/dist/js.cookie.min.mjs';
import { UI } from './view.js';
import { closeModal, setActiveModal } from './modals.js';
import { sendRequest } from "./requests.js";

const DEFAULT_USER_NAME = 'Я: ';
const CHAT_API = 'https://chat1-341409.oa.r.appspot.com/api/';
const USER_URL = CHAT_API + 'user';
const USER_DATA_URL = CHAT_API + 'user/me';
const MESSAGES_URL = CHAT_API + 'messages/';
let userName = Cookies.get('username') || DEFAULT_USER_NAME;


document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    
    if (Cookies.get('token')) loadHistory();
    
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
    sendRequest(USER_URL, {method: 'POST', body: {email: email}})
        .then(console.log)
        .catch(console.error)
}

// getToken('gunichdrabl@gmail.com');


function usernameRequest(name) {
    sendRequest(USER_URL, {method: 'PATCH', body: {name: name}})
        .then(json => {
            Cookies.set('username', `${json.name}`);
            userName = `${Cookies.get('username')}: `;
        })
        .catch(console.error)
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

function loadHistory() {
    sendRequest(MESSAGES_URL, {method: 'GET'})
        .then(json => {
            console.log(json)
            json.messages.forEach(item => {
                createMessage(`${item.username}: `, item.message, getTime(new Date(item.createdAt)));
            })
        })
        .catch(console.error)
}

function checkAuth() {
    if (Cookies.get('token')) {
        UI.MODAL.PROFILE_BUTTON.setAttribute('data-modal-btn', 'logout')
        UI.MODAL.PROFILE_BUTTON.textContent = 'Выйти';
    } else {
        setActiveModal(UI.MODAL.PROFILE_BUTTON);
    }
}

function getTime(value = new Date()) {
    const date = value;
    const hours = date.getHours();
    const minutes = '0' + date.getMinutes();
    return hours + ':' + minutes.slice(-2);
}

function setToken(token) {
    Cookies.set('token', token);
}

function createMessage(author = userName, content = UI.CHAT.SEND_INPUT.value.trim(), time = getTime()) {
    if (content) {
        const message = UI.MESSAGE.TEMPLATE.content.cloneNode(true);
        if (author === userName) message.querySelector('.message').classList.add('message__mine');
        message.querySelector('.message-text__author').textContent = author;
        message.querySelector('.message-text__content').textContent = content;
        message.querySelector('.message__time').textContent = time;
        UI.CHAT.BODY.append(message);
    }
}

function sendMessage() {
    createMessage();
    UI.CHAT.SEND_FORM.reset();
    document.querySelector('.message:last-child').scrollIntoView();
}
