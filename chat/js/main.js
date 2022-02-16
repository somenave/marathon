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
  const messageContent = UI.sendFormInput.value;
  const message = UI.messageTemplate.content.cloneNode(true);
  message.querySelector('.message-text__content').textContent = messageContent;
  message.querySelector('.message__time').textContent = getTime();
  UI.chatBody.append(message);
}

function sendMessageHandler() {
  UI.sendForm.addEventListener('submit', (e) => {
    e.preventDefault();
    createMessage();
    UI.sendForm.reset();
    document.querySelector('.message:last-child').scrollIntoView();
  })
}