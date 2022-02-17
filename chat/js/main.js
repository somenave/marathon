import {UI} from "./view.js";
import {modalHandler} from "./modals.js";

document.addEventListener('DOMContentLoaded', () => {
  modalHandler();
  sendMessageHandler();
});

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