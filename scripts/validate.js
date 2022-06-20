const showInputError = (config, formElement, inputElement, errorMessage) => {
    const errorItem = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorItem.classList.add(config.errorClass);
    errorItem.textContent = errorMessage;
};

const hideInputError = (config, formElement, inputElement) => {
    const errorItem = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorItem.classList.remove(config.errorClass);
    errorItem.textContent = '';
};

const isInputValid = (inputElement) => {
    return inputElement.validity.valid;
};

const processInputValue = (inputElement) => {
    inputElement.value = inputElement.value.trimLeft();
}

const toggleInputState = (config, formElement, inputElement, isValid) => {
    if (isValid) {
        hideInputError(config, formElement, inputElement);
    } else {
        showInputError(config, formElement, inputElement, inputElement.validationMessage);
    }
};

const toggleButtonState = (config, buttonElement, isFormValid) => {
    if (isFormValid) {
        buttonElement.classList.remove(config.inactiveButtonClass);
    } else {
        buttonElement.classList.add(config.inactiveButtonClass);
    }
};

const validateForm = (config, formElement, buttonElement, inputList) => {
    let isFormValid = true;
    inputList.forEach((inputElement) => {
        const isValid = isInputValid(inputElement);
        isFormValid &&= isValid;
        toggleInputState(config, formElement, inputElement, isValid);
    });
    toggleButtonState(config, buttonElement, isFormValid);
};

const initFormValidation = (config, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function (event) {
            processInputValue(inputElement);
            validateForm(config, formElement, buttonElement, inputList);
        });
    });
};

const validate = (config, element) => {
    const formElement = element.querySelector(config.formSelector);
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    validateForm(config, formElement, buttonElement, inputList);
};

const initValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        initFormValidation(config, formElement);
    });
};
