export const initialCards = [
  {
    title: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    title: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    title: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    title: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    title: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    title: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_type_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: ".popup__input-error",
  errorActiveClass: "popup__input-error_active",
};


export const popupEditProfile = document.querySelector('.popup_type_edit-profile');
export const editForm = popupEditProfile.querySelector('.popup__form');
export const popupNewCard = document.querySelector('.popup_type_new-card');
export const newCardForm = popupNewCard.querySelector('.popup__form');
export const editProfileButton = document.querySelector('.profile__edit-button');
export const cardForm = document.querySelector(".popup_form_type_new-card");
export const cardFormInputTitle = cardForm.querySelector(".popup__input_type_title");
export const cardFormInputImageLink = cardForm.querySelector(".popup__input_type_image-link");

export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_info');

export const createNewCardButton = document.querySelector('.profile__add-button');

