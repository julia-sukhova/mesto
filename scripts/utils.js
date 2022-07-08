import { Card } from './Card.js';

const popupOpenedClass = 'popup_opened';

const onEscapeClosePopup = (event) => {
    if (event.key === 'Escape') {
        const popupElement = document.querySelector('.' + popupOpenedClass);
        if (popupElement !== null) {
            closePopup(popupElement);
        }
    }
};

const openPopup = (popupElement) => {
    popupElement.classList.add(popupOpenedClass);
    document.addEventListener('keydown', onEscapeClosePopup); // keydown event isn't captured on div element even with tabindex and explicit focus call
};

const closePopup = (popupElement) => {
    popupElement.classList.remove(popupOpenedClass);
    document.removeEventListener('keydown', onEscapeClosePopup);
};

const createPhotoCard = (photoCardData) => {
    const photoCard = new Card(photoCardData, '#template-photo-card');
    return photoCard.render();
};

export { openPopup, closePopup, createPhotoCard };
