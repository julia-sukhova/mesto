import { openPopup } from './utils.js';

const popupViewPhotoElement = document.querySelector('.popup_type_view-photo');
const popupViewImage = popupViewPhotoElement.querySelector('.popup__image');
const popupViewCaption = popupViewPhotoElement.querySelector('.popup__caption');

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
        this._cardImageElement.setAttribute('src', this._link);
        this._cardImageElement.setAttribute('alt', this._name);
        this._cardTitleElement.textContent = this._name;
    }

    _onLikeToggleHandler() {
        this._cardLikeButton.classList.toggle('element__button_active');
    }

    _onDeleteHandler() {
        this._element.remove();
    }

    _onImagePopupHandler() {
        popupViewImage.setAttribute('src', this._link);
        popupViewImage.setAttribute('alt', this._name);
        popupViewCaption.textContent = this._name;
        openPopup(popupViewPhotoElement);
    }

    _setEventListeners() {
        this._cardLikeButton.addEventListener('click', () => {
            this._onLikeToggleHandler();
        });
        this._cardDeleteButton.addEventListener('click', () => {
            this._onDeleteHandler()
        });
        this._cardImageElement.addEventListener('click', () => {
            this._onImagePopupHandler();
        });
    }

    render() {
        this._element = this._getTemplate();
        this._cardImageElement = this._element.querySelector('.element__image');
        this._cardTitleElement = this._element.querySelector('.element__title');
        this._cardLikeButton = this._element.querySelector('.element__button');
        this._cardDeleteButton = this._element.querySelector('.element__button-delete');
        this._setCardData();
        this._setEventListeners();
        return this._element;
    }
};


export { Card };