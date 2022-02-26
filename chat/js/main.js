import Cookies from '../node_modules/js-cookie/dist/js.cookie.min.mjs';
import { UI } from './view.js';
import { getUserData, loadHistory } from './requests.js';
import { getTime, checkAuth, scrollToBottom } from './utils.js';

export const DEFAULT_USER_NAME = 'Я';
export const SOCKET_URL = 'wss://chat1-341409.oa.r.appspot.com/websockets?';
export let userName = localStorage.getItem('username') || DEFAULT_USER_NAME;
const DEFAULT_MESSAGES_COUNT = 20;

export const socket = new WebSocket(`${SOCKET_URL}${Cookies.get('token')}`);

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();

    if (Cookies.get('token')) {
        getUserData().then(data => {
            localStorage.setItem('user-email', data.email);
            localStorage.setItem('username', data.name);
        });
        loadHistory();
        scrollToBottom();
    }

    UI.CHAT.SEND_FORM.addEventListener('submit', (e) => {
        e.preventDefault();
        sendMessage();
        UI.CHAT.SEND_FORM.reset();
        scrollToBottom();
    });

    UI.CHAT.CONTENT.addEventListener('scroll', (e) => {
        if (e.target.scrollTop === 0) {
            const prevScrollHeight = e.target.scrollHeight;
            loadPartOfMessages();
            e.target.scrollTo(0, e.target.scrollHeight - prevScrollHeight);
        }
    });
});

socket.onmessage = function(event) {
    try {
        const messageData = JSON.parse(event?.data);
        const message = createMessage(messageData);
        UI.CHAT.BODY.append(message);
    } catch (error) {
        console.log(error);
    }
};

export function createMessage(data) {
    if (!data.text) return;
    const message = UI.MESSAGE.TEMPLATE.content.cloneNode(true);
    if ((localStorage.getItem('user-email') === data.user.email)) {
        message.querySelector('.message').classList.add('message__mine');
    }
    message.querySelector('.message-text__author').textContent = `${data.user.name}: `;
    message.querySelector('.message-text__content').textContent = data.text;
    message.querySelector('.message__time').textContent = getTime(new Date(data.createdAt));
    return message;
}

function sendMessage() {
    try {
        socket.send(JSON.stringify({
            text: UI.CHAT.SEND_INPUT.value.trim()
        }));
    } catch (e) {
        console.error(e);
    }
}

export function loadPartOfMessages() {
    const messages = JSON.parse(localStorage.getItem('messages'));

    if (messages.length === 0) {
        UI.CHAT.LOADED_NOTICE.classList.add('show');
    }

    for (let i = 0; i < DEFAULT_MESSAGES_COUNT; i++) {
        const message = createMessage(messages.pop());
        UI.CHAT.BODY.prepend(message);
    }
    localStorage.setItem('messages', JSON.stringify(messages));
}
