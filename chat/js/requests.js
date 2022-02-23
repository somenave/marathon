import Cookies from '../node_modules/js-cookie/dist/js.cookie.min.mjs';
import { userName, createMessage } from './main.js';
import { getTime } from './utils';

const CHAT_API = 'https://chat1-341409.oa.r.appspot.com/api/';
const USER_URL = CHAT_API + 'user';
const USER_DATA_URL = CHAT_API + 'user/me';
const MESSAGES_URL = CHAT_API + 'messages/';

export function sendRequest(url, options = {}) {
    options.method = options?.method ?? 'GET';
    options.headers = options?.headers ?? { Accept: 'application/json', 'Content-Type': 'application/json;charset=utf-8', Authorization: `Bearer ${Cookies.get('token')}` };
    if (options.body) options.body = JSON.stringify(options.body);
    return fetch(url, options)
        .then(data => data.json());
}

export function usernameRequest(name) {
    sendRequest(USER_URL, { method: 'PATCH', body: { name: name } })
        .then(json => {
            Cookies.set('username', json.name);
            userName = Cookies.get('username');
        })
        .catch(console.error);
}

export function getUserData() {
    // return fetch(USER_DATA_URL, {
    //     headers: { Accept: 'application/json', 'Content-Type': 'application/json;charset=utf-8', Authorization: `Bearer ${Cookies.get('token')}` },
    //     method: 'GET'
    // })
    //     .then(data => data.json());
    return sendRequest(USER_DATA_URL);
}

export function getToken(email) {
    sendRequest(USER_URL, { method: 'POST', body: { email: email }, headers: { Accept: 'application/json', 'Content-Type': 'application/json;charset=utf-8' } })
        .then(console.log)
        .catch(console.error);
}

export function loadHistory() {
    sendRequest(MESSAGES_URL, { method: 'GET' })
        .then(json => {
            console.log(json);
            json.messages.forEach(item => {
                createMessage({ author: item.user.name, content: item.text, time: getTime(new Date(item.createdAt)), isMine: Cookies.get('user-email') === item.user.email });
            });
        })
        .catch(console.error);
}
