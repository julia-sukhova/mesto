profileEditButton.addEventListener('click', () => {
    profileFormNameInput.value = profileNameElement.textContent;
    profileFormJobInput.value = profileSubtitleElement.textContent;
    validate(validationConfig, popupProfileElement);
    openPopup(popupProfileElement);
});

profileFormElement.addEventListener('submit', (event) => {
    event.preventDefault();
    profileNameElement.textContent = profileFormNameInput.value.trim();
    profileSubtitleElement.textContent = profileFormJobInput.value.trim();
    closePopup(popupProfileElement);
});

popupPhotoCardShowButton.addEventListener('click', () => {
    photoCardFormNameInput.value = '';
    photoCardFormLinkInput.value = '';
    validate(validationConfig, popupPhotoCardElement);
    openPopup(popupPhotoCardElement);
});

photoCardFormElement.addEventListener('submit', (event) => {
    event.preventDefault();
    const photoCardData = {
        name: photoCardFormNameInput.value.trim(),
        link: photoCardFormLinkInput.value.trim()
    };
    const photoCard = createPhotoCard(photoCardData);
    photoCardsSectionElement.prepend(photoCard);
    closePopup(popupPhotoCardElement);
});

initPage();