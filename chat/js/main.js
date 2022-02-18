import {UI} from "./view.js";
import {modalHandler} from "./modals.js";
import Cookies from '../node_modules/js-cookie/dist/js.cookie.min.mjs';

const DEFAULT_USER_NAME = 'Я: '
let userName = DEFAULT_USER_NAME;

document.addEventListener('DOMContentLoaded', () => {
  modalHandler();
  sendMessageHandler();
});

function setToken(token) {
  Cookies.set('token', token);
}

console.log(document.querySelector('.message-text__author'));

UI.MODAL.ITEMS.forEach(modal => {
  modal.addEventListener('submit', (e) => {
    e.preventDefault();
    if (modal.getAttribute('data-modal') === 'login') {
      setToken(modal.querySelector('.modal__input').value);
    }
    if (modal.getAttribute('data-modal') === 'settings') {
      // console.log(Cookies.get('token'));
      // fetch('https://chat1-341409.oa.r.appspot.com/api/user', {
      //   credentials: "include",
      //   method: 'PATCH',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json;charset=utf-8',
      //     'Access-Control-Allow-Origin': 'https://chat1-341409.oa.r.appspot.com/',
      //     'Access-Control-Request-Method': 'PATCH',
      //     'Access-Control-Request-Headers': 'Content-Type, Authorization, Access-Control-Allow-Origin',
      //     'Access-Control-Allow-Credentials': true,
      //     'Authorization': `Bearer ${Cookies.get('token')}`
      //   },
      //   body: JSON.stringify({name: modal.querySelector('.name-input').value})
      // })
      //     .then(console.log)
      //     .catch(console.log)
      userName = `${modal.querySelector('.name-input').value}: `;
      console.log(usernameRequest(modal.querySelector('.name-input').value));
    }
  });
});

function usernameRequest(name) {
  fetch('https://chat1-341409.oa.r.appspot.com/api/user', {
    method: 'PATCH',
    headers: {
      'Origin': 'http://localhost:63342/chat/index.html',
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Request-Origin': 'https://chat1-341409.oa.r.appspot.com/',
      'Access-Control-Request-Method': 'PATCH',
      'Access-Control-Request-Headers': 'Authorization;Content-Type',
      'Access-Control-Request-Credentials': true,
      'Authorization': `Bearer ${Cookies.get('token')}`
    },
    body: JSON.stringify({name: name})
  })
      .then(response => response.json())
      .then(json => {
        console.log(JSON.stringify(json));
        return JSON.stringify(json);
      })
      .catch(console.log)
}

function getTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = '0' + date.getMinutes();
  return hours + ':' + minutes.slice(-2);
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

function sendMessageHandler() {
  UI.CHAT.SEND_FORM.addEventListener('submit', (e) => {
    e.preventDefault();
    createMessage();
    UI.CHAT.SEND_FORM.reset();
    document.querySelector('.message:last-child').scrollIntoView();
  })
}