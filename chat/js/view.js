export const UI = {
  modals: document.querySelectorAll('[data-modal]'),
  modalButtons: document.querySelectorAll('[data-modal-btn]'),
  modalCloseButtons: document.querySelectorAll('.modal__close'),
  chatInput: document.querySelector('.chat-input'),
  chatBody: document.querySelector('.chat__body'),
  messageTemplate: document.querySelector('.message-template'),
  messageFrom: document.querySelector('.message-text__from'),
  messageContent: document.querySelector('.message-text__content'),
  messageTime: document.querySelector('.message__time'),
  sendForm: document.querySelector('.send-form'),
  sendFormInput: document.querySelector('.send-form__input')
}