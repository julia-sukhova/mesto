const showInputError = (config, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.classList.add(config.errorClass);
    errorElement.textContent = errorMessage;
};

const hideInputError = (config, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
};

const isInputValid = (inputElement) => {
    inputElement.setCustomValidity('');
    if (!inputElement.validity.valid) {
        return false
    }
    const v = inputElement.value;
    if (v.length > 0 && v[0] == ' ') {
        inputElement.setCustomValidity('Plase remove spaces from the beggining');
        return false
    }
    if (v.length > 0 && v[v.length - 1] == ' ') {
        inputElement.setCustomValidity('Please remove trailing spaces');
        return false
    }
    return true
}

const toggleInputState = (config, formElement, inputElement, isValid) => {
    if (isValid) {
        hideInputError(config, formElement, inputElement);
    } else {
        showInputError(config, formElement, inputElement, inputElement.validationMessage);
    }
}

const toggleButtonState = (config, buttonElement, isFormValid) => {
    if (isFormValid) {
        buttonElement.classList.remove(config.inactiveButtonClass);
    } else {
        buttonElement.classList.add(config.inactiveButtonClass);
    }
}

const validateForm = (config, formElement, buttonElement, inputList) => {
    let isFormValid = true;
    inputList.forEach((inputElement) => {
        const isValid = isInputValid(inputElement);
        isFormValid &&= isValid;
        toggleInputState(config, formElement, inputElement, isValid);
    });
    toggleButtonState(config, buttonElement, isFormValid);
}

const initFormValidation = (config, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    const popupElement = formElement.closest('.popup');
    popupElement.validate = () => {
        validateForm(config, formElement, buttonElement, inputList);
    }
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            validateForm(config, formElement, buttonElement, inputList);
        });
    });
}

const initValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        initFormValidation(config, formElement);
    });
}
