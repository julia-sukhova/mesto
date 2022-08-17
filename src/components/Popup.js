class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        document.addEventListener('keydown', this._handleEscClose); // keydown event isn't captured on div element even with tabindex and explicit focus call
        this._popup.classList.add('popup_opened');
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', (event) => {
            if (event.target.classList.contains('popup_opened') ||
                event.target.classList.contains('popup__close-button')) {
                this.close();
            }
        });
    }
}

export { Popup };