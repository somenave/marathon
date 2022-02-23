import Cookies from '../node_modules/js-cookie/dist/js.cookie.min.mjs';
import { UI } from './view.js';
import { getUserData, getToken, loadHistory } from './requests.js';
import { getTime, checkAuth } from './utils.js';

export const DEFAULT_USER_NAME = 'Я';
export const SOCKET_URL = 'ws://chat1-341409.oa.r.appspot.com/websockets?';
export let userName = Cookies.get('username') || DEFAULT_USER_NAME;

const defaultMessageData = {
    author: Cookies.get('username'),
    content: UI.CHAT.SEND_INPUT.value.trim(),
    time: getTime(),
    isMine: false
};

const socket = new WebSocket(`${SOCKET_URL}${Cookies.get('token')}`);

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();

    if (Cookies.get('token')) {
        getUserData().then(data => {
            Cookies.set('user-email', data.email);
            Cookies.set('username', data.name);
        });
        loadHistory();
    }

    UI.CHAT.SEND_FORM.addEventListener('submit', (e) => {
        e.preventDefault();
        sendMessage();
    });
});

socket.onmessage = function(event) {
    try {
        const messageData = JSON.parse(event.data);
        const isMine = (Cookies.get('user-email') === messageData.user.email);
        createMessage({ author: messageData.user.name, content: messageData.text, time: getTime(new Date(messageData.createdAt)), isMine: isMine });
    } catch (error) {
        console.log(error);
    }
};

export function createMessage(data = defaultMessageData) {
    if (!data.content) return;
    const message = UI.MESSAGE.TEMPLATE.content.cloneNode(true);
    if (data.isMine) {
        message.querySelector('.message').classList.add('message__mine');
    }
    message.querySelector('.message-text__author').textContent = `${data.author}: `;
    message.querySelector('.message-text__content').textContent = data.content;
    message.querySelector('.message__time').textContent = data.time;
    UI.CHAT.BODY.append(message);
    UI.CHAT.CONTENT.scrollTop = UI.CHAT.CONTENT.scrollHeight;
}

function sendMessage() {
    try {
        socket.send(JSON.stringify({
            text: UI.CHAT.SEND_INPUT.value.trim()
        }));
        UI.CHAT.SEND_FORM.reset();
    } catch (e) {
        console.log(e);
    }
}
