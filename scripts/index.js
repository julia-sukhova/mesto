const popupProfileElement = document.querySelector('.popup_type_user');
const popupProfileCloseButton = popupProfileElement.querySelector('.popup__close-button');

const popupPhotoCardElement = document.querySelector('.popup_type_photo-card');
const popupPhotoCardCloseButton = popupPhotoCardElement.querySelector('.popup__close-button');
const popupPhotoCardShowButton = document.querySelector('.profile__add-button');

const popupViewPhotoElement = document.querySelector('.popup_type_view-photo');
const popupViewPhotoCloseButton = popupViewPhotoElement.querySelector('.popup__close-button');
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
    popupElement.classList.remove('popup_opened');
}

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

popupProfileCloseButton.addEventListener('click', () => {
    profileFormNameInput.value = '';
    profileFormJobInput.value = '';
    closePopup(popupProfileElement);
});

popupPhotoCardShowButton.addEventListener('click', () => {
    photoCardFormNameInput.value = '';
    photoCardFormLinkInput.value = '';
    openPopup(popupPhotoCardElement);
});

popupPhotoCardCloseButton.addEventListener('click', () => {
    closePopup(popupPhotoCardElement);
});

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

popupViewPhotoCloseButton.addEventListener('click', () => {
    closePopup(popupViewPhotoElement);
});
