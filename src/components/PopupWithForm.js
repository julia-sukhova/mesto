import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
    constructor(popupSelector, formSelector, submitButtonSelector, validatorCallback, submitCallback) {
        super(popupSelector);
        this._form = this._popup.querySelector(formSelector);
        this._validatorCallback = validatorCallback;
        this._submitCallback = submitCallback;
        this._fromName = this._form.getAttribute('name');
        this._submitButton = this._form.querySelector(submitButtonSelector);
        this._inputs = this._form.querySelectorAll('input');
        this._origText = this._submitButton.textContent;
    }

    _getInputValues() {
        const values = {};
        this._inputs.forEach(input => {
            values[input.name] = input.value.trim();
        });
        return values;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submitButton.textContent = 'Сохранение...';
            this._submitCallback(this._getInputValues());
        });
    }

    setOriginText() {
        this._submitButton.textContent = this._origText;
    }

    setInputValues(data) {
        this._inputs.forEach((input) => {
            input.value = data[input.name];
        });
    }

    open() {
        this._validatorCallback(this._fromName, 'open');
        super.open();
        this._submitButton.focus();
    }

    close() {
        super.close();
        this._form.reset();
        this._validatorCallback(this._fromName, 'close');
    }
}

export { PopupWithForm };