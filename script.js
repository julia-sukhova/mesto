let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__item-name');
let jobInput = document.querySelector('.form__item-subtitle');

let popupElemnt = document.querySelector('.popup');
let popupCloseIcon = document.querySelector('.popup__close-icon');
let profileEditButton = document.querySelector('.profile__edit-button');

function closePopup() {
    nameInput.value = '';
    jobInput.value = '';
    popupElemnt.style.display = 'none';
}

formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    let name = nameInput.value;
    let job = jobInput.value;
    let nameElement = document.querySelector('.profile__name');
    let subtitleElement = document.querySelector('.profile__subtitle');
    nameElement.textContent = name;
    subtitleElement.textContent = job;
    closePopup();
});

profileEditButton.onclick = () => {
    popupElemnt.style.display = 'flex';
}

popupCloseIcon.onclick = () => {
    closePopup();
}