// profile section

const popupProfileElement = document.querySelector('.popup_type_user');
const profileEditButton = document.querySelector('.profile__edit-button');

const profileNameElement = document.querySelector('.profile__name');
const profileSubtitleElement = document.querySelector('.profile__subtitle');

// edit pofile form

const profileFormElement = popupProfileElement.querySelector('.form');
const profileFormNameInput = popupProfileElement.querySelector('.form__item_text_name');
const profileFormJobInput = popupProfileElement.querySelector('.form__item_text_subtitle');

// new photocard section

const popupPhotoCardElement = document.querySelector('.popup_type_photo-card');
const popupPhotoCardShowButton = document.querySelector('.profile__add-button');

// add photocard form

const photoCardFormElement = popupPhotoCardElement.querySelector('.form');
const photoCardFormNameInput = popupPhotoCardElement.querySelector('.form__item_text_name');
const photoCardFormLinkInput = popupPhotoCardElement.querySelector('.form__item_text_link');

// photocard template

const photoCardTemplate = document.querySelector('#template-photo-card').content;
const photoCardTemplateElement = photoCardTemplate.querySelector('.element');

// photocards section

const photoCardsSectionElement = document.querySelector('.elements');

// preview photocard section

const popupViewPhotoElement = document.querySelector('.popup_type_view-photo');
const popupViewImage = popupViewPhotoElement.querySelector('.popup__image');
const popupViewCaption = popupViewPhotoElement.querySelector('.popup__caption');