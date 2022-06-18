// включение валидации вызовом enableValidation
// все настройки передаются при вызове

/*enableValidation ({
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: '',
    inputErrorClass: '.form__item_type_error',
    errorClass: 'form__item-error'
});*/

const form = document.querySelector('.form');
const formInput = form.querySelector('.form__item');
const formError = form.querySelector(`.${formInput.id}-error`);

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('form__item_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__item-error_active');
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('form__item_type_error');
    errorElement.classList.remove('form__item-error_active');
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.form__item'));
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
        });
    });
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        setEventListeners(formElement);
    });

}
enableValidation();