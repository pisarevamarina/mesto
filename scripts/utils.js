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

export const popupImage = document.querySelector(".popup_type_image");

// export function openPopup(popup) {
//   popup.classList.add("popup_opened");
//   document.addEventListener("keydown", closePopupOnEsc);
// }

// export function closePopup(popup) {
//   popup.classList.remove("popup_opened");
//   document.removeEventListener("keydown", closePopupOnEsc);
// }

// export function closePopupOnEsc(evt) {
//   // закрытие попапа по ESC
//   const currentPopup = document.querySelector(".popup_opened");
//   if (currentPopup && evt.key === "Escape") {
//     closePopup(currentPopup);
//   }
// }

// export function closePopupOnOverlay(evt) {
//   const currentPopup = document.querySelector(".popup_opened");
//   if (currentPopup && evt.target === evt.currentTarget) {
//     closePopup(currentPopup);
//   }
// }
