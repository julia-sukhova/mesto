// photocard template

const photoCardTemplate = document.querySelector('#template-photo-card').content;
const photoCardTemplateElement = photoCardTemplate.querySelector('.element');

// preview photocard section

const popupViewPhotoElement = document.querySelector('.popup_type_view-photo');
const popupViewImage = popupViewPhotoElement.querySelector('.popup__image');
const popupViewCaption = popupViewPhotoElement.querySelector('.popup__caption');


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

const createPhotoCard = (cardData) => {
    const newPhotoCardElement = photoCardTemplateElement.cloneNode(true);
    const photoCardImageElement = newPhotoCardElement.querySelector('.element__image');
    photoCardImageElement.setAttribute('src', cardData.link);
    photoCardImageElement.setAttribute('alt', cardData.name);
    photoCardImageElement.addEventListener('click', () => {
        popupViewImage.setAttribute('src', cardData.link);
        popupViewImage.setAttribute('alt', cardData.name);
        popupViewCaption.textContent = cardData.name;
        openPopup(popupViewPhotoElement);
    });
    newPhotoCardElement.querySelector('.element__title').textContent = cardData.name;
    newPhotoCardElement.querySelector('.element__button').addEventListener('click', (event) => {
        event.srcElement.classList.toggle('element__button_active');
    });
    newPhotoCardElement.querySelector('.element__button-delete').addEventListener('click', () => {
        newPhotoCardElement.remove();
    });
    return newPhotoCardElement;
};

export { openPopup, closePopup, createPhotoCard };
