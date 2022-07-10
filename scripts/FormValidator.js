class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    }

    _showInputError(inputElement, errorMessage) {
        const errorItem = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._config.inputErrorClass);
        errorItem.classList.add(this._config.errorClass);
        errorItem.textContent = errorMessage;
    }

    _hideInputError(inputElement) {
        const errorItem = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._config.inputErrorClass);
        errorItem.classList.remove(this._config.errorClass);
        errorItem.textContent = '';
    }

    _isInputValid(inputElement) {
        return inputElement.validity.valid;
    }

    _toggleInputState(inputElement, isValid) {
        if (isValid) {
            this._hideInputError(inputElement);
        } else {
            this._showInputError(inputElement, inputElement.validationMessage);
        }
    }

    setSubmitButtonState(activeState) {
        if (activeState) {
            this._buttonElement.classList.remove(this._config.inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled');
        } else {
            this._buttonElement.classList.add(this._config.inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', true);
        }
    }

    validate() {
        let isFormValid = true;
        this._inputList.forEach((inputElement) => {
            if (!isFormValid) {
                return;
            }
            const isValid = this._isInputValid(inputElement);
            isFormValid = isFormValid && isValid;
            this._toggleInputState(inputElement, isValid);
        });
        this.setSubmitButtonState(isFormValid);
    }

    enableValidation() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this.validate();
            });
        });
    }
}

export { FormValidator };