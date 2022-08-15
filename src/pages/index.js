import './index.css';
import { Card } from '../components/Card.js';
import { Api } from '../components/Api.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithSubmit } from '../components/PopupWithSubmit.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { authorizationToken, myId, validationConfig } from '../utils/constants.js';
import { enableValidation, formValidators } from '../utils/validation.js';

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-47',
    headers: {
        authorization: authorizationToken,
        'Content-Type': 'application/json'
    }
});

enableValidation(validationConfig);
const userInfo = new UserInfo('.profile__name', '.profile__subtitle', '.profile__avatar');

const showImagePopup = new PopupWithImage('.popup_type_view-photo', '.popup__image', '.popup__caption');
showImagePopup.setEventListeners();

const confirmDeletePopup = new PopupWithSubmit('.popup_type_delete-card-confirm', '.popup__button');
confirmDeletePopup.setEventListeners();

const imagesSection = new Section(
    (photoCardData) => {
        const canDelete = myId === photoCardData.owner._id;
        const likeCount = photoCardData.likes.length;
        const isLiked = photoCardData.likes.findIndex((element) => element._id === myId) !== -1;
        const photoCard = new Card(photoCardData, likeCount, isLiked, canDelete, '#template-photo-card', () => {
            showImagePopup.open(photoCardData);
        }, (isLiked) => {
            let result;
            if (isLiked) {
                result = api.likeCard(photoCardData._id);
            } else {
                result = api.dislikeCard(photoCardData._id);
            }
            result.then((res) => {
                const likeCount = res.likes.length;
                photoCard.setLikeCount(likeCount);
            }).catch(err => {
                console.log(`Ошибка лайка карточки: ${err}`);
            });
        }, () => {
            confirmDeletePopup.open(() => {
                api.deleteCard(photoCardData._id)
                    .then(() => photoCard.delete())
                    .catch(err => {
                        console.log(`Ошибка удаления карточки: ${err}`);
                    });
            });
        });
        return photoCard.render();
    }, '.elements');

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
    (inputs, done) => {
        // запрос на сохранение обновленной информации о пользователе
        api.updateUserInfo(JSON.stringify(inputs))
            .then((res) => userInfo.setUserInfo(res))
            .catch(err => {
                console.log(`Ошибка обновления информации о пользователе: ${err}`)
            })
            .finally(done);
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
    (inputs, done) => {
        api.addNewCard(JSON.stringify(inputs))
            .then((res) => {
                imagesSection.prependItem(res);
            })
            .catch(err => {
                console.log(`Ошибка добавления новой карточки: ${err}`);
            })
            .finally(done);
    });
addNewCardPopup.setEventListeners();

// попап с загрузкой фото профиля 
const editNewProfilePhoto = new PopupWithForm('.popup_type_profile-photo', '.form', '.form__submit-button',
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
    (inputs, done) => {
        api.updateAvatar(JSON.stringify(inputs))
            .then((res) => {
                userInfo.setAvatar(res);
            })
            .catch(err => {
                console.log(`Ошибка обновления аватара: ${err}`);
            })
            .finally(done);
    });
editNewProfilePhoto.setEventListeners();

document.querySelector('.profile__edit-button').addEventListener('click', () => {
    editProfilePopup.open();
});

document.querySelector('.profile__add-button').addEventListener('click', () => {
    addNewCardPopup.open();
});

document.querySelector('.profile__container').addEventListener('click', () => {
    editNewProfilePhoto.open();
});

// запрос для загрузки информации о пользователе
api.getUserInfo()
    .then((result) => {
        userInfo.setUserInfo(result);
        userInfo.setAvatar(result);
    })
    .catch(err => {
        console.log(`Ошибка загрузки информации о пользователе: ${err}`);
    });

// запрос для загрузки карточек
api.getInitialCards()
    .then((result) => {
        imagesSection.setItems(result);
        imagesSection.render();
    }).catch(err => {
        console.log(`Ошибка загрузки списка картинок: ${err}`);
    });


