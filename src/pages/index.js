import './index.css';
import { Card } from '../components/Card.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithSubmit } from '../components/PopupWithSubmit.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { authorizationToken, myId, validationConfig } from '../utils/constants.js';
import { enableValidation, formValidators } from '../utils/validation.js';

enableValidation(validationConfig);
const userInfo = new UserInfo('.profile__name', '.profile__subtitle', '.profile__avatar');

const showImagePopup = new PopupWithImage('.popup_type_view-photo', '.popup__image', '.popup__caption');
showImagePopup.setEventListeners();

const confirmDeletePopup = new PopupWithSubmit('.popup_type_delete-card-confirm', '.form__submit-button');
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
                result = fetch('https://mesto.nomoreparties.co/v1/cohort-47/cards/' + photoCardData._id + '/likes', {
                    method: 'PUT',
                    headers: {
                        authorization: authorizationToken,
                        'Content-Type': 'application/json'
                    }
                });
            } else {
                result = fetch('https://mesto.nomoreparties.co/v1/cohort-47/cards/' + photoCardData._id + '/likes', {
                    method: 'DELETE',
                    headers: {
                        authorization: authorizationToken,
                        'Content-Type': 'application/json'
                    }
                });
            }
            result.then(res => res.json())
                .then((res) => {
                    const likeCount = res.likes.length;
                    photoCard.setLikeCount(likeCount);
                });
        }, () => {
            confirmDeletePopup.open(() => {
                fetch('https://mesto.nomoreparties.co/v1/cohort-47/cards/' + photoCardData._id, {
                    method: 'DELETE',
                    headers: {
                        authorization: authorizationToken,
                        'Content-Type': 'application/json'
                    }
                })
                    .then(() => photoCard.delete())
                    .catch(err => {
                        console.log(err);
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
        fetch('https://nomoreparties.co/v1/cohort-47/users/me', {
            method: 'PATCH',
            headers: {
                authorization: authorizationToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputs)
        })
            .then(() => userInfo.setUserInfo(inputs))
            .catch(err => {
                console.log(err);
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
        fetch('https://mesto.nomoreparties.co/v1/cohort-47/cards', {
            method: 'POST',
            body: JSON.stringify(inputs),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                authorization: authorizationToken
            }
        })
            .then(res => res.json())
            .then((res) => {
                imagesSection.prependItem(res);
            })
            .catch(err => {
                console.log(err);
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
        fetch('https://mesto.nomoreparties.co/v1/cohort-47/users/me/avatar', {
            method: 'PATCH',
            body: JSON.stringify(inputs),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                authorization: authorizationToken
            }
        })
            .then(() => {
                userInfo.setAvatar(inputs);
            })
            .catch(err => {
                console.log(err);
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

fetch('https://nomoreparties.co/v1/cohort-47/users/me', {
    headers: {
        authorization: authorizationToken
    }
})
    .then(res => res.json())
    .then((result) => {
        userInfo.setUserInfo(result);
        userInfo.setAvatar(result);
    })
    .catch(err => {
        console.log(err);
    });;


// запрос для загрузки карточек

fetch('https://nomoreparties.co/v1/cohort-47/cards', {
    headers: {
        authorization: authorizationToken
    }
})
    .then(res => res.json())
    .then((result) => {
        imagesSection.setItems(result);
        imagesSection.render();
    })
    .catch(err => {
        console.log(err);
    });

