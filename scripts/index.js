import { Card } from './Card.js';
import { PopupWithForm } from './PopupWithForm.js';
import { PopupWithImage } from './PopupWithImage.js';
import { Section } from './Section.js';
import { UserInfo } from './UserInfo.js';

// default photocards

const initialPhotoCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// validation
const validationConfig = {
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_disabled',
    inputErrorClass: 'form__item_type_error',
    errorClass: 'form__item-error'
};

const createPhotoCard = (photoCardData) => {
    const photoCard = new Card(photoCardData, '#template-photo-card', () => {
        const popup = new PopupWithImage('.popup_type_view-photo', '.popup__image', '.popup__caption', photoCardData);
        popup.setEventListeners();
        popup.open();
    });
    return photoCard.render();
};

const userInfo = new UserInfo('.profile__name', '.profile__subtitle');

const editProfilePopup = new PopupWithForm('.popup_type_user', '.form', '.form__submit-button', validationConfig, (inputs) => {
    userInfo.setUserInfo({
        name: inputs['form__name'].trim(),
        info: inputs['form__job'].trim()
    });
});
editProfilePopup.setEventListeners();

const addNewCardPopup = new PopupWithForm('.popup_type_photo-card', '.form', '.form__submit-button', validationConfig, (inputs) => {
    const photoCardData = {
        name: inputs['form__name'].trim(),
        link: inputs['form__link'].trim()
    };
    const card = createPhotoCard(photoCardData);
    imagesSection.addItem(card);
});
addNewCardPopup.setEventListeners();

const imagesSection = new Section({
    items: initialPhotoCards,
    renderer: (photoCardData) => {
        return createPhotoCard(photoCardData)
    }
}, '.elements');

imagesSection.render();

document.querySelector('.profile__edit-button').addEventListener('click', () => {
    editProfilePopup.open();
});

document.querySelector('.profile__add-button').addEventListener('click', () => {
    addNewCardPopup.open();
});