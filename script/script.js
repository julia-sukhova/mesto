let popupElemnt = document.querySelector('.popup');
let popupCloseIcon = document.querySelector('.popup__close-icon');

let formElement = document.querySelector('.form');
let formNameInput = document.querySelector('.form__item-name');
let formJobInput = document.querySelector('.form__item-subtitle');
let formSubmitButton = document.querySelector('.form__submit-button');

let profileNameElement = document.querySelector('.profile__name');
let profileSubtitleElement = document.querySelector('.profile__subtitle');
let profileEditButton = document.querySelector('.profile__edit-button');

function showPopup(isOpen) {
    const modifierClass = 'popup_opened';
    if (isOpen) {
        popupElemnt.classList.add(modifierClass);
    } else {
        popupElemnt.classList.remove(modifierClass);
    }
}

profileEditButton.onclick = () => {
    formNameInput.value = profileNameElement.textContent;
    formJobInput.value = profileSubtitleElement.textContent;
    showPopup(true);
}

formElement.onsubmit = (ev) => {
    ev.preventDefault();
    profileNameElement.textContent = formNameInput.value;
    profileSubtitleElement.textContent = formJobInput.value;
    showPopup(false);
};

popupCloseIcon.onclick = () => {
    formNameInput.value = '';
    formJobInput.value = '';
    showPopup(false);
}