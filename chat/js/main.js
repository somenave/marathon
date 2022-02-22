import Cookies from '../node_modules/js-cookie/dist/js.cookie.min.mjs';
import { UI } from './view.js';
import { getUserData, getToken } from './requests.js';
import { getTime, checkAuth } from './utils.js';

export const DEFAULT_USER_NAME = 'Я';
export const SOCKET_URL = 'ws://chat1-341409.oa.r.appspot.com/websockets?';
export let userName = Cookies.get('username') || DEFAULT_USER_NAME;

const defaultMessageData = {
    author: userName,
    content: UI.CHAT.SEND_INPUT.value.trim(),
    time: getTime(),
    isMine: false
};

getToken('gunichdrabl@gmail.com');

const socket = new WebSocket(`${SOCKET_URL}${Cookies.get('token')}`);

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();

    if (Cookies.get('token')) {
        getUserData().then(data => {
            Cookies.set('user-email', data.email);
            Cookies.set('username', data.name);
        });
    }

    UI.CHAT.SEND_FORM.addEventListener('submit', (e) => {
        e.preventDefault();
        sendMessage();
    });
});

socket.onmessage = function(event) {
    const messageData = JSON.parse(event.data);
    const isMine = (Cookies.get('user-email') === messageData.user.email);
    createMessage({ author: messageData.user.name, content: messageData.text, time: getTime(new Date(messageData.createdAt)), isMine: isMine });
    UI.MESSAGE.LAST.scrollIntoView();
};

function createMessage(data = defaultMessageData) {
    if (data.content) {
        const message = UI.MESSAGE.TEMPLATE.content.cloneNode(true);
        if (data.isMine) {
            message.querySelector('.message').classList.add('message__mine');
        }
        message.querySelector('.message-text__author').textContent = `${data.author}: `;
        message.querySelector('.message-text__content').textContent = data.content;
        message.querySelector('.message__time').textContent = data.time;
        UI.CHAT.BODY.append(message);
    }
}

function sendMessage() {
    socket.send(JSON.stringify({
        text: UI.CHAT.SEND_INPUT.value.trim()
    }));
    UI.CHAT.SEND_FORM.reset();
}
