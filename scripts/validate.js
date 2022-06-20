function showInputError(config, formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.classList.add(config.errorClass);
    errorElement.textContent = errorMessage;
};

function hideInputError(config, formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
};

function toggleButtonState(config, buttonElement, inputList) {
    if (allInputValid(inputList)) {
        buttonElement.classList.remove(config.inactiveButtonClass);
    } else {
        buttonElement.classList.add(config.inactiveButtonClass);
    }
}

function isInputValid(inputElement) {
    if (!inputElement.validity.valid) {
        inputElement.setCustomValidity('');
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
    inputElement.setCustomValidity('');
    return true
}

function allInputValid(inputList) {
    return inputList.every((inputElement) => {
        return isInputValid(inputElement);
    });
}

function setEventListeners(config, formElement) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(config, buttonElement, inputList);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            if (isInputValid(inputElement)) {
                hideInputError(config, formElement, inputElement);
            } else {
                showInputError(config, formElement, inputElement, inputElement.validationMessage);
            }
            toggleButtonState(config, buttonElement, inputList);
        });
    });
}

function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(config, formElement);
    });
}
