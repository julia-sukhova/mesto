import { closePopup, createPhotoCard } from "./utils.js";
import { initValidation, validationConfig } from "./validate.js";

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

const initPhotoCards = (photoCardsSectionElement) => {
    initialPhotoCards.forEach((photoCardData) => {
        const photoCard = createPhotoCard(photoCardData);
        photoCardsSectionElement.append(photoCard);
    });
};

const initGlobalHanlders = () => {
    document.addEventListener('mousedown', (event) => {
        if (event.target.classList.contains('popup_opened')) {
            closePopup(event.target);
            return;
        }
        if (event.target.classList.contains('popup__close-button')) {
            const popup = event.target.closest('.popup');
            closePopup(popup);
            return;
        }
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closePopup(null);
        }
    });
};

const initPage = (photoCardsSectionElement) => {
    initPhotoCards(photoCardsSectionElement);
    initGlobalHanlders();
    initValidation(validationConfig);
};

export { initPage };