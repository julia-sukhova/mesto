class Card {
    constructor({ name, link }, likeCount, isLiked, canDelete, templateSelector, handleCardClick, handleLikeClick, handleCardDelete) {
        this._name = name;
        this._link = link;
        this._likeCount = likeCount;
        this._isLiked = isLiked;
        this._canDelete = canDelete;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleCardDelete = handleCardDelete;
    }

    _getTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
    }

    _setOrUpdateCardData() {
        this._cardImageElement.setAttribute('src', this._link);
        this._cardImageElement.setAttribute('alt', this._name);
        this._cardTitleElement.textContent = this._name;
        this._cardLikeCountElement.textContent = this._likeCount;
        if (this._isLiked) {
            this._cardLikeButton.classList.add('element__button_active');
        } else {
            this._cardLikeButton.classList.remove('element__button_active');
        }
        if (this._canDelete) {
            this._cardDeleteButton.classList.remove('element__button-delete_inactive');
        } else {
            this._cardDeleteButton.classList.add('element__button-delete_inactive');
        }
    }

    _onLikeToggleHandler() {
        this._isLiked = !this._isLiked;
        this._handleLikeClick(this._isLiked);
        this._setOrUpdateCardData();
    }

    _setEventListeners() {
        this._cardLikeButton.addEventListener('click', () => {
            this._onLikeToggleHandler();
        });
        this._cardImageElement.addEventListener('click', () => {
            this._handleCardClick();
        });
        if (this._canDelete) {
            this._cardDeleteButton.addEventListener('click', () => {
                this._handleCardDelete();
            });
        }
    }

    setLikeCount(likeCount) {
        this._likeCount = likeCount;
        this._setOrUpdateCardData();
    }

    delete() {
        this._element.remove();
    }

    render() {
        this._element = this._getTemplate();
        this._cardImageElement = this._element.querySelector('.element__image');
        this._cardTitleElement = this._element.querySelector('.element__title');
        this._cardLikeButton = this._element.querySelector('.element__button');
        this._cardDeleteButton = this._element.querySelector('.element__button-delete');
        this._cardLikeCountElement = this._element.querySelector('.element__like');
        this._setOrUpdateCardData();
        this._setEventListeners();
        return this._element;
    }
};


export { Card };