function initPhotoCards() {
    initialPhotoCards.forEach((photoCardData) => {
        const photoCard = createPhotoCard(photoCardData);
        photoCardsSectionElement.append(photoCard);
    });
}

function initProfilePopupInput() {
    profileFormNameInput.value = profileNameElement.textContent;
    profileFormJobInput.value = profileSubtitleElement.textContent;
}

function initPage() {
    initPhotoCards();
    initProfilePopupInput();

    enableValidation({
        formSelector: '.form',
        inputSelector: '.form__item',
        submitButtonSelector: '.form__submit-button',
        inactiveButtonClass: 'form__submit-button_disabled',
        inputErrorClass: 'form__item_type_error',
        errorClass: 'form__item-error'
    });
}