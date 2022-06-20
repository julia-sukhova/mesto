profileEditButton.addEventListener('click', () => {
    profileFormNameInput.value = profileNameElement.textContent;
    profileFormJobInput.value = profileSubtitleElement.textContent;
    openPopup(popupProfileElement);
});

profileFormElement.addEventListener('submit', (event) => {
    event.preventDefault();
    profileNameElement.textContent = profileFormNameInput.value;
    profileSubtitleElement.textContent = profileFormJobInput.value;
    closePopup(popupProfileElement);
});

handlePopupClose(popupProfileElement);


popupPhotoCardShowButton.addEventListener('click', () => {
    photoCardFormNameInput.value = '';
    photoCardFormLinkInput.value = '';
    openPopup(popupPhotoCardElement);
});

handlePopupClose(popupPhotoCardElement);

photoCardFormElement.addEventListener('submit', (event) => {
    event.preventDefault();
    const photoCardData = {
        name: photoCardFormNameInput.value,
        link: photoCardFormLinkInput.value
    };
    const photoCard = createPhotoCard(photoCardData);
    photoCardsSectionElement.prepend(photoCard);
    closePopup(popupPhotoCardElement);
});

handlePopupClose(popupViewPhotoElement);

initPage();