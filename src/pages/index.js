import './index.css';
import { Card } from '../components/Card.js';
import { Api } from '../components/Api.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithSubmit } from '../components/PopupWithSubmit.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { authorizationToken, validationConfig } from '../utils/constants.js';
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

const imagePreviewPopup = new PopupWithImage('.popup_type_view-photo', '.popup__image', '.popup__caption');
imagePreviewPopup.setEventListeners();

const cardDeletePopup = new PopupWithSubmit('.popup_type_delete-card-confirm', '.popup__button');
cardDeletePopup.setEventListeners();

const imagesSection = new Section(
    (photoCardData) => {
        const myId = userInfo.getUserInfo().id;
        const canDelete = myId === photoCardData.owner._id;
        const likeCount = photoCardData.likes.length;
        const isLiked = photoCardData.likes.findIndex((element) => element._id === myId) !== -1;
        const photoCard = new Card(photoCardData, likeCount, isLiked, canDelete, '#template-photo-card', () => {
            imagePreviewPopup.open(photoCardData);
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
            cardDeletePopup.open(() => {
                api.deleteCard(photoCardData._id)
                    .then(() => photoCard.delete())
                    .catch(err => {
                        console.log(`Ошибка удаления карточки: ${err}`);
                    });
            });
        });
        return photoCard.render();
    }, '.elements');

const profileEditPopup = new PopupWithForm('.popup_type_user', '.form', '.form__submit-button',
    (formName, state) => {
        const validator = formValidators[formName];
        if (validator === null) {
            return;
        }
        if (state === 'open') {
            profileEditPopup.setInputValues(userInfo.getUserInfo());
            validator.setSubmitButtonDisabled(false);
        } else if (state === 'close') {
            validator.resetValidationState();
        }
    },
    (inputs) => {
        // запрос на сохранение обновленной информации о пользователе
        api.updateUserInfo(JSON.stringify(inputs))
            .then((res) => {
                userInfo.setUserInfo(res);
                profileEditPopup.close();
            })
            .catch(err => {
                console.log(`Ошибка обновления информации о пользователе: ${err}`);
            })
            .finally(() => {
                profileEditPopup.setOriginText();
            })
    });

profileEditPopup.setEventListeners();

const newCardAddPopup = new PopupWithForm('.popup_type_photo-card', '.form', '.form__submit-button',
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
        api.addNewCard(JSON.stringify(inputs))
            .then((res) => {
                imagesSection.prependItem(res);
                newCardAddPopup.close();
            })
            .catch(err => {
                console.log(`Ошибка добавления новой карточки: ${err}`);
            })
            .finally(() => {
                newCardAddPopup.setOriginText();
            });
    });
newCardAddPopup.setEventListeners();

// попап с загрузкой фото профиля 
const profileAvatarUpdatePopup = new PopupWithForm('.popup_type_profile-photo', '.form', '.form__submit-button',
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
        api.updateAvatar(JSON.stringify(inputs))
            .then((res) => {
                userInfo.setAvatar(res);
                profileAvatarUpdatePopup.close();
            })
            .catch(err => {
                console.log(`Ошибка обновления аватара: ${err}`);
            })
            .finally(() => {
                profileAvatarUpdatePopup.setOriginText();
            });
    });
profileAvatarUpdatePopup.setEventListeners();

document.querySelector('.profile__edit-button').addEventListener('click', () => {
    profileEditPopup.open();
});

document.querySelector('.profile__add-button').addEventListener('click', () => {
    newCardAddPopup.open();
});

document.querySelector('.profile__container').addEventListener('click', () => {
    profileAvatarUpdatePopup.open();
});

Promise.all([
    api.getUserInfo(),
    api.getInitialCards()])
    .then(([profileInfo, initialCards]) => {
        userInfo.setUserInfo(profileInfo);
        userInfo.setAvatar(profileInfo);
        imagesSection.render(initialCards);
    })
    .catch((err) => {
        console.log(`Ошибка загрузки начальных данных: ${err}`);
    });
