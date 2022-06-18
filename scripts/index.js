const popupProfileElement = document.querySelector('.popup_type_user');

const popupPhotoCardElement = document.querySelector('.popup_type_photo-card');
const popupPhotoCardShowButton = document.querySelector('.profile__add-button');

const popupViewPhotoElement = document.querySelector('.popup_type_view-photo');
const popupViewImage = popupViewPhotoElement.querySelector('.popup__image');
const popupViewCaption = popupViewPhotoElement.querySelector('.popup__caption');


const profileFormElement = popupProfileElement.querySelector('.form');
const profileFormNameInput = popupProfileElement.querySelector('.form__item_text_name');
const profileFormJobInput = popupProfileElement.querySelector('.form__item_text_subtitle');


const photoCardFormElement = popupPhotoCardElement.querySelector('.form');
const photoCardFormNameInput = popupPhotoCardElement.querySelector('.form__item_text_name');
const photoCardFormLinkInput = popupPhotoCardElement.querySelector('.form__item_text_link');


const profileNameElement = document.querySelector('.profile__name');
const profileSubtitleElement = document.querySelector('.profile__subtitle');
const profileEditButton = document.querySelector('.profile__edit-button');

const photoCardsSectionElement = document.querySelector('.elements');

const photoCardTemplate = document.querySelector('#template-photo-card').content;
const photoCardTemplateElement = photoCardTemplate.querySelector('.element');

function createPhotoCard(cardData) {
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

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
}

function closePopup(popupElement) {
    if (popupElement === null) {
        popupElement = document.querySelector('.popup_opened');
    }
    if (popupElement === null) {
        return;
    }
    popupElement.classList.remove('popup_opened');
}

function handlePopupClose(popupElement) {
    popupElement.querySelector('.popup__close-button').addEventListener('click', () => {
        closePopup(popupElement);
    });
    popupElement.addEventListener('click', (event) => {
        if (event.target.closest('.popup__container,.popup__content') !== null) {
            return;
        }
        closePopup(popupElement);
    });
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closePopup(null);
    }
})

initialPhotoCards.forEach((photoCardData) => {
    const photoCard = createPhotoCard(photoCardData);
    photoCardsSectionElement.append(photoCard);
});

profileEditButton.addEventListener('click', () => {
    profileFormNameInput.value = profileNameElement.textContent;
    profileFormJobInput.value = profileSubtitleElement.textContent;
    openPopup(popupProfileElement);
});

profileFormElement.addEventListener('submit', (event) => {
    event.preventDefault();
    profileNameElement.textContent = profileFormNameInput.value;
    profileSubtitleElement.textContent = profileFormJobInput.value;
    closePopup(popupProfileElement);
});

handlePopupClose(popupProfileElement);


popupPhotoCardShowButton.addEventListener('click', () => {
    photoCardFormNameInput.value = '';
    photoCardFormLinkInput.value = '';
    openPopup(popupPhotoCardElement);
});

handlePopupClose(popupPhotoCardElement);


photoCardFormElement.addEventListener('submit', (event) => {
    event.preventDefault();
    const photoCardData = {
        name: photoCardFormNameInput.value,
        link: photoCardFormLinkInput.value
    };
    const photoCard = createPhotoCard(photoCardData);
    photoCardsSectionElement.prepend(photoCard);
    closePopup(popupPhotoCardElement);
});

handlePopupClose(popupViewPhotoElement);
