import Cookies from '../node_modules/js-cookie/dist/js.cookie.min.mjs';
import { userName, loadPartOfMessages } from './main.js';
import { scrollToBottom } from './utils.js';
import { UI } from './view.js';

const CHAT_API = 'https://chat1-341409.oa.r.appspot.com/api/';
const USER_URL = CHAT_API + 'user';
const USER_DATA_URL = CHAT_API + 'user/me';
const MESSAGES_URL = CHAT_API + 'messages/';

export function sendRequest(url, options = {}) {
    options.method = options?.method ?? 'GET';
    options.headers = options?.headers ?? {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${Cookies.get('token')}`
    };
    if (options.body) options.body = JSON.stringify(options.body);
    return fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
        });
}

export function usernameRequest(name) {
    sendRequest(USER_URL, { method: 'PATCH', body: { name: name } })
        .then(json => {
            localStorage.setItem('username', json.name);
            userName = localStorage.getItem('username');
        })
        .catch(console.error);
}

export function getUserData() {
    return sendRequest(USER_DATA_URL);
}

export function getToken(email) {
    sendRequest(USER_URL, {
        method: 'POST',
        body: { email: email },
        headers: { Accept: 'application/json', 'Content-Type': 'application/json;charset=utf-8' }
    })
        .then(console.log)
        .catch(console.error);
}

export function loadHistory() {
    UI.CHAT.BODY.innerHTML = '';
    sendRequest(MESSAGES_URL, { method: 'GET' })
        .then(response => {
            localStorage.setItem('messages', JSON.stringify(response.messages));
            loadPartOfMessages();
            scrollToBottom();
        })
        .catch(console.error);
}
