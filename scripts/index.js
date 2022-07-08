import { initPage } from './init.js';
import { openPopup, closePopup, createPhotoCard } from './utils.js';
import { FormValidator } from './FormValidator.js';

// profile section

const popupProfileElement = document.querySelector('.popup_type_user');
const profileEditButton = document.querySelector('.profile__edit-button');

const profileNameElement = document.querySelector('.profile__name');
const profileSubtitleElement = document.querySelector('.profile__subtitle');

// edit pofile form

const profileFormElement = popupProfileElement.querySelector('.form');
const profileFormNameInput = popupProfileElement.querySelector('.form__item_text_name');
const profileFormJobInput = popupProfileElement.querySelector('.form__item_text_subtitle');

// new photocard section

const popupPhotoCardElement = document.querySelector('.popup_type_photo-card');
const popupPhotoCardShowButton = document.querySelector('.profile__add-button');

// add photocard form

const photoCardFormElement = popupPhotoCardElement.querySelector('.form');
const photoCardFormNameInput = popupPhotoCardElement.querySelector('.form__item_text_name');
const photoCardFormLinkInput = popupPhotoCardElement.querySelector('.form__item_text_link');

// photocards section

const photoCardsSectionElement = document.querySelector('.elements');

// validation
const validationConfig = {
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_disabled',
    inputErrorClass: 'form__item_type_error',
    errorClass: 'form__item-error'
};
const profileFormValidator = new FormValidator(validationConfig, profileFormElement);
profileFormValidator.enableValidation();
const photoCardFormValidator = new FormValidator(validationConfig, photoCardFormElement);
photoCardFormValidator.enableValidation();


profileEditButton.addEventListener('click', () => {
    profileFormNameInput.value = profileNameElement.textContent;
    profileFormJobInput.value = profileSubtitleElement.textContent;
    profileFormValidator.validate();
    openPopup(popupProfileElement);
});

profileFormElement.addEventListener('submit', (event) => {
    event.preventDefault();
    profileNameElement.textContent = profileFormNameInput.value.trim();
    profileSubtitleElement.textContent = profileFormJobInput.value.trim();
    closePopup(popupProfileElement);
});

popupPhotoCardShowButton.addEventListener('click', () => {
    photoCardFormNameInput.value = '';
    photoCardFormLinkInput.value = '';
    photoCardFormValidator.validate();
    openPopup(popupPhotoCardElement);
});

photoCardFormElement.addEventListener('submit', (event) => {
    event.preventDefault();
    const photoCardData = {
        name: photoCardFormNameInput.value.trim(),
        link: photoCardFormLinkInput.value.trim()
    };
    const card = createPhotoCard(photoCardData);
    photoCardsSectionElement.prepend(card);
    closePopup(popupPhotoCardElement);
});

initPage(photoCardsSectionElement);