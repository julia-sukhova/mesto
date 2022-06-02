const popupProfileElement = document.querySelector('.popup-user');
const popupProfileCloseButton = popupProfileElement.querySelector('.popup__close-button');

const popupPhotoCardElement = document.querySelector('.popup-photo-card');
const popupPhotoCardCloseButton = popupPhotoCardElement.querySelector('.popup__close-button');
const popupPhotoCardShowButton = document.querySelector('.profile__add-button');

const popupViewPhotoElement = document.querySelector('.popup-view-photo');
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

function addPhotoCard(name, link, addFront) {
    const photoCardElement = photoCardTemplate.querySelector('.element').cloneNode(true);
    const photoCardImageElement = photoCardElement.querySelector('.element__image');
    photoCardImageElement.setAttribute('src', link);
    photoCardImageElement.onclick = (ev) => {
        popupViewImage.setAttribute('src', link);
        popupViewCaption.innerText = name;
        showPopup(popupViewPhotoElement, true);
    };
    photoCardElement.querySelector('.element__title').innerText = name;
    photoCardElement.querySelector('.element__button').onclick = (ev) => {
        ev.srcElement.classList.toggle('element__button_active');
    };
    photoCardElement.querySelector('.element__button-delete').onclick = (ev) => {
        photoCardElement.remove();
    };
    if (addFront) {
        photoCardsSectionElement.prepend(photoCardElement);
    } else {
        photoCardsSectionElement.append(photoCardElement);
    }
}

function showPopup(el, isOpen) {
    const modifierClass = 'popup_opened';
    if (isOpen) {
        el.classList.add(modifierClass);
    } else {
        el.classList.remove(modifierClass);
    }
}

initialPhotoCards.forEach((photoCardData) => {
    addPhotoCard(photoCardData.name, photoCardData.link, false);
});

profileEditButton.onclick = () => {
    profileFormNameInput.value = profileNameElement.textContent;
    profileFormJobInput.value = profileSubtitleElement.textContent;
    showPopup(popupProfileElement, true);
};

profileFormElement.onsubmit = (ev) => {
    ev.preventDefault();
    profileNameElement.textContent = profileFormNameInput.value;
    profileSubtitleElement.textContent = profileFormJobInput.value;
    showPopup(popupProfileElement, false);
};

popupProfileCloseButton.onclick = () => {
    profileFormNameInput.value = '';
    profileFormJobInput.value = '';
    showPopup(popupProfileElement, false);
};

popupPhotoCardShowButton.onclick = () => {
    photoCardFormNameInput.value = '';
    photoCardFormLinkInput.value = '';
    showPopup(popupPhotoCardElement, true);
};

popupPhotoCardCloseButton.onclick = () => {
    showPopup(popupPhotoCardElement, false);
};

photoCardFormElement.onsubmit = (ev) => {
    ev.preventDefault();
    addPhotoCard(photoCardFormNameInput.value, photoCardFormLinkInput.value, true);
    showPopup(popupPhotoCardElement, false);
};

popupViewPhotoCloseButton.onclick = () => {
    showPopup(popupViewPhotoElement, false);
};
