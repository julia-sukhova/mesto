import './index.css';
import { Card } from '../components/Card.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { initialPhotoCards, validationConfig } from '../utils/constants.js';
import { enableValidation, formValidators } from '../utils/validation.js';

enableValidation(validationConfig);

const userInfo = new UserInfo('.profile__name', '.profile__subtitle');

const showImagePopup = new PopupWithImage('.popup_type_view-photo', '.popup__image', '.popup__caption');
showImagePopup.setEventListeners();

const editProfilePopup = new PopupWithForm('.popup_type_user', '.form', '.form__submit-button',
    (formName, state) => {
        const validator = formValidators[formName];
        if (validator === null) {
            return;
        }
        if (state === 'open') {
            editProfilePopup.setInputValues(userInfo.getUserInfo());
            validator.setSubmitButtonDisabled(false);
        } else if (state === 'close') {
            validator.resetValidationState();
        }
    },
    (inputs) => {
        userInfo.setUserInfo(inputs);
    });
editProfilePopup.setEventListeners();

const addNewCardPopup = new PopupWithForm('.popup_type_photo-card', '.form', '.form__submit-button',
    (formName, state) => {
        const validator = formValidators[formName];
        if (validator === null) {
            return;
        }
        if (state === 'open') {
            validator.setSubmitButtonDisabled(true);
        } else if (state === 'close') {
            validator.resetValidationState();
        }
    },
    (inputs) => {
        imagesSection.addItem(inputs);
    });
addNewCardPopup.setEventListeners();

const imagesSection = new Section({
    items: initialPhotoCards,
    renderer: (photoCardData) => {
        const photoCard = new Card(photoCardData, '#template-photo-card', () => {
            showImagePopup.open(photoCardData);
        });
        return photoCard.render();
    }
}, '.elements');

imagesSection.render();

document.querySelector('.profile__edit-button').addEventListener('click', () => {
    editProfilePopup.open();
});

document.querySelector('.profile__add-button').addEventListener('click', () => {
    addNewCardPopup.open();
});
