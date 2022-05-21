let formElement = document.querySelector('.form');
// Находим поля формы в DOM
let nameInput = document.querySelector('.form__item-name');
let jobInput = document.querySelector('.form__item-subtitle');

formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    let name = nameInput.value;
    let job = jobInput.value;
    let nameElement = document.querySelector('.profile__name');
    let subtitleElement = document.querySelector('.profile__subtitle');
    nameElement.textContent = name;
    subtitleElement.textContent = job;
})