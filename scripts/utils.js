import { Card } from './Card.js';

const openPopup = (popupElement) => {
    popupElement.classList.add('popup_opened');
};

const closePopup = (popupElement) => {
    if (popupElement === null) {
        popupElement = document.querySelector('.popup_opened');
    }
    if (popupElement === null) {
        return;
    }
    popupElement.classList.remove('popup_opened');
};

const createPhotoCard = (photoCardData) => {
    const photoCard = new Card(photoCardData, '#template-photo-card');
    return photoCard.render();
};

export { openPopup, closePopup, createPhotoCard };
