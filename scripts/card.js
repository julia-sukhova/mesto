import { openPopup } from './utils.js';

class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
    }

    _setCardData() {
        const photoCardImageElement = this._element.querySelector('.element__image');
        photoCardImageElement.setAttribute('src', this._link);
        photoCardImageElement.setAttribute('alt', this._name);
        this._element.querySelector('.element__title').textContent = this._name;
    }

    _setEventListeners() {
        const photoCardImageElement = this._element.querySelector('.element__image');
        const popupViewPhotoElement = document.querySelector('.popup_type_view-photo');
        const popupViewImage = popupViewPhotoElement.querySelector('.popup__image');
        const popupViewCaption = popupViewPhotoElement.querySelector('.popup__caption');
        this._element.querySelector('.element__button').addEventListener('click', (event) => {
            event.srcElement.classList.toggle('element__button_active');
        });
        this._element.querySelector('.element__button-delete').addEventListener('click', () => {
            this._element.remove();
        });
        photoCardImageElement.addEventListener('click', () => {
            popupViewImage.setAttribute('src', this._link);
            popupViewImage.setAttribute('alt', this._name);
            popupViewCaption.textContent = this._name;
            openPopup(popupViewPhotoElement);
        });
    }

    render() {
        this._element = this._getTemplate();
        this._setCardData();
        this._setEventListeners();
        return this._element;
    }
};


export { Card };