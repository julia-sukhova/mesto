const onEscapeClosePopupHandler = (event) => {
    if (event.key === 'Escape') {
        closePopup(null);
    }
}

const openPopup = (popupElement) => {
    popupElement.validate();
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', onEscapeClosePopupHandler);
}

const closePopup = (popupElement) => {
    if (popupElement === null) {
        popupElement = document.querySelector('.popup_opened');
    }
    if (popupElement === null) {
        return;
    }
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', onEscapeClosePopupHandler);
}

const handlePopupClose = (popupElement) => {
    popupElement.addEventListener('click', (event) => {
        if (!event.target.classList.contains('popup__close-button') && event.target.closest('.popup__container,.popup__content') !== null) {
            return;
        }
        closePopup(popupElement);
    });
}

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
}
