export const UI = {
    MODAL: {
        ITEMS: document.querySelectorAll('[data-modal]'),
        BUTTONS: document.querySelectorAll('[data-modal-btn]'),
        CLOSE_BUTTONS: document.querySelectorAll('.modal__close'),
        ACTION_BUTTONS: document.querySelectorAll('.modal__button'),
        PROFILE_ITEMS: document.querySelectorAll('.profile-modal'),
        PROFILE_BUTTON: document.querySelector('.profile-button'),
        LOGIN_CONTROL: document.querySelector('.login-control')
    },
    CHAT: {
        CONTENT: document.querySelector('.chat'),
        INPUT: document.querySelector('.chat-input'),
        BODY: document.querySelector('.chat__body'),
        SEND_FORM: document.querySelector('.send-form'),
        SEND_INPUT: document.querySelector('.send-form__input')
    },
    MESSAGE: {
        TEMPLATE: document.querySelector('.message-template'),
        AUTHOR: document.querySelector('.message-text__author'),
        CONTENT: document.querySelector('.message-text__content'),
        TIME: document.querySelector('.message__time'),
        LAST: document.querySelector('.message:last-child')
    }
};
