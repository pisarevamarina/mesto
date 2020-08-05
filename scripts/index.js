import { initialCards, config } from './utils.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import {
  openPopup,
  closePopup,
  closePopupOnOverlay,
  popupImage,
} from './utils.js';


const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const editForm = popupEditProfile.querySelector('.popup__form');
const popupNewCard = document.querySelector('.popup_type_new-card');
const newCardForm = popupNewCard.querySelector('.popup__form');
const editProfileButton = document.querySelector('.profile__edit-button');
const closePopupEditProfile = popupEditProfile.querySelector(
  '.popup__exit-button'
);
const closePopupNewCard = popupNewCard.querySelector('.popup__exit-button');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_info');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const formEditProfile = popupEditProfile.querySelector(
  '.popup__form_type_edit-profile'
);
const createNewCardButton = document.querySelector('.profile__add-button');
const closepopupImage = popupImage.querySelector('.popup__exit-button');
const cardsList = document.querySelector('.grid-elements');
const cardForm = document.querySelector('.popup_form_type_new-card');
const cardFormInputTitle = cardForm.querySelector('.popup__input_type_title');
const cardFormInputImageLink = cardForm.querySelector(
  '.popup__input_type_image-link'
);

const profileValidation = new FormValidator(config, editForm);
const cardValidation = new FormValidator(config, newCardForm);

// initialCards.forEach((item) => {
//   const card = new Card(item, '.template-cards'); // записали в переменную новую копию карточки
//   const cardElement = card.addCard(); // записали в переменную разультат вызова метода создания разметки новой карточки

//   cardsList.prepend(cardElement); // добавили карточку в DOM
// });

const cardsSection  = new Section ({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.template-cards'); // записали в переменную новую копию карточки
    
    const cardElement = card.addCard(); // записали в переменную разультат вызова метода создания разметки новой карточки
  
    cardsSection.addItem(cardElement);

  }
}, '.grid-elements'
);

cardsSection.renderItems();

closePopupEditProfile.addEventListener('click', function () {
  //обработчики на закрытие по крестику
  profileValidation.validateErrorRemoving();
  closePopup(popupEditProfile);
});
closePopupNewCard.addEventListener('click', function () {
  closePopup(popupNewCard);
});
closepopupImage.addEventListener('click', function () {
  closePopup(popupImage);
});

popupNewCard.addEventListener('mousedown', closePopupOnOverlay); //обработчики закрытия по оверлею
popupImage.addEventListener('mousedown', closePopupOnOverlay);
popupEditProfile.addEventListener('mousedown', closePopupOnOverlay);

function formSubmitHandler(evt) {
  // эта функция вставляет в поля на странице пользовательские данные из формы,
  evt.preventDefault(); // и закрывает попап после подтверждния

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(popupEditProfile);
}

formEditProfile.addEventListener('submit', formSubmitHandler); // обработчик на  форму редактирования профиля

editProfileButton.addEventListener('click', function () {
  // обработчик на кнопку редактирования профиля
  profileValidation.validateErrorRemoving(); // обнуление ошибок при открытии  и актуализация состояния кнопки
  openPopup(popupEditProfile);
  if (popupEditProfile.classList.contains('popup_opened')) {
    //при открытии выводим в инпуты актуальное значение полей на странице
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;

    profileValidation.validateErrorRemoving();
  }
});

createNewCardButton.addEventListener('click', function () {
  // обработчик на кнопку открытия попапа создания новой карточки
  openPopup(popupNewCard);
  cardValidation.validateErrorRemoving();
  if (popupNewCard.classList.contains('popup_opened')) {
    cardFormInputImageLink.value = '';
    cardFormInputTitle.value = '';
    cardValidation.validateErrorRemoving();
  }
});

function renderCards(obj) {
  //ф-я создания новой карточки
  const card = new Card(obj, '.template-cards');
  const cardElement = card.addCard();

  cardsList.prepend(cardElement);
}

function cardFormSubmitHandler(evt) {
  //ф-я формы добавления  пользовательских карточек
  evt.preventDefault(); //принимает из инпутов пользовательские данные и вставляет в карточку
  const name = cardFormInputTitle.value;
  const link = cardFormInputImageLink.value;

  cardFormInputImageLink.value = '';
  cardFormInputTitle.value = '';

  renderCards({ name, link }); //передаем  пользовательские данные в фунцию создания карточки
  closePopup(popupNewCard);
}

cardForm.addEventListener('submit', cardFormSubmitHandler); //обработчик для формы создания карточки

profileValidation.enableValidation();
cardValidation.enableValidation();
