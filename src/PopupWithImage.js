import { Popup } from './Popup.js';

class PopupWithImage extends Popup {
    constructor(popupSelector, imageSelector, captionSelector, { name, link }) {
        super(popupSelector);
        this._image = this._popup.querySelector(imageSelector);
        this._caption = this._popup.querySelector(captionSelector);
        this._name = name;
        this._link = link;
    }

    open() {
        this._image.setAttribute('src', this._link);
        this._image.setAttribute('alt', this._name);
        this._caption.textContent = this._name;
        super.open();
    }
}

export { PopupWithImage };