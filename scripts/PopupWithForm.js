import { Popup } from "./Popup.js";
import { FormValidator } from "./FormValidator.js";

class PopupWithForm extends Popup {
    constructor(popupSelector, formSelector, submitButtonSelector, validationConfig, submitCallback) {
        super(popupSelector);
        this._form = this._popup.querySelector(formSelector);
        this._submitCallback = submitCallback;
        this._submitButton = this._form.querySelector(submitButtonSelector);
        this._inputs = this._popup.querySelectorAll('input');
        this._validatior = new FormValidator(validationConfig, this._form);
    }

    _getInputValues() {
        const values = {};
        this._inputs.forEach(input => {
            values[input.name] = input.value;
        });
        return values;
    }

    setEventListeners() {
        super.setEventListeners();
        this._validatior.enableValidation();
        this._popup.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submitCallback(this._getInputValues());
            this.close();
        });
    }

    open() {
        this._validatior.setSubmitButtonDisabled(true);
        super.open();
        this._submitButton.focus();
    }

    close() {
        super.close();
        this._validatior.resetValidationState();
        this._form.reset();
    }
}

export { PopupWithForm };