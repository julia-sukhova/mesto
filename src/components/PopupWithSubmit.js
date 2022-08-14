import { Popup } from './Popup.js';

class PopupWithSubmit extends Popup {
    constructor(popupSelector, buttonselector) {
        super(popupSelector);
        this._button = this._popup.querySelector(buttonselector);
    }

    _onButtonPressed() {
        this._callback();
        this.close();
    }

    open(callback) {
        this._callback = callback;
        this._handler = this._onButtonPressed.bind(this);
        this._button.addEventListener('click', this._handler);
        super.open();
    }

    close() {
        this._button.removeEventListener('click', this._handler);
        super.close();
    }
}

export { PopupWithSubmit };