const initPhotoCards = () => {
    initialPhotoCards.forEach((photoCardData) => {
        const photoCard = createPhotoCard(photoCardData);
        photoCardsSectionElement.append(photoCard);
    });
};

const initGlobalHanlders = () => {
    document.addEventListener('mousedown', (event) => {
        if (event.target.classList.contains('popup_opened')) {
            closePopup(event.target);
            return;
        }
        if (event.target.classList.contains('popup__close-button')) {
            const popup = event.target.closest('.popup');
            closePopup(popup);
            return;
        }
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closePopup(null);
        }
    });
};

const initPage = () => {
    initPhotoCards();
    initGlobalHanlders();
    initValidation(validationConfig);
};