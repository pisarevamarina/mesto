import './index.css';
import {
  initialCards,
  config,
  editForm,
  newCardForm,
  editProfileButton,
  cardFormInputTitle,
  cardFormInputImageLink,
  nameInput,
  jobInput,
  createNewCardButton,
} from '../utils/utils.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/popupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';

const profileValidation = new FormValidator(config, editForm);
const cardValidation = new FormValidator(config, newCardForm);

const newUserInfo = new UserInfo('.profile__title', '.profile__subtitle');

//рендер на страницу массива с базовыми карточками
const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = new Card({
        data,
        templateElement: '.template-cards',
        handleCardClick: () => {
          const zoomImagePopup = new PopupWithImage('.popup_type_image');
          zoomImagePopup.open();
          zoomImagePopup.setEventListeners();
        },
      });
      const cardElement = card.addCard();

      cardsSection.addItem(cardElement);
    },
  },
  '.grid-elements'
);

cardsSection.renderItems();

//попап с формой добавление карточек пользователя
const addingNewCardPopup = new PopupWithForm({
  popupSelector: '.popup_type_new-card',
  formSubmitHandler: (data) => {
    const card = new Card({
      data,
      templateElement: '.template-cards',
      handleCardClick: () => {
        const zoomImagePopup = new PopupWithImage('.popup_type_image');
        zoomImagePopup.open();
        zoomImagePopup.setEventListeners();
      },
    });
    const cardElement = card.addCard();

    cardsSection.addItem(cardElement);

    addingNewCardPopup.close();
  },
});

// форма редактирования пользовательских данныых
const profileEditPopup = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  formSubmitHandler: (data) => {
    newUserInfo.setUserInfo(data);

    profileEditPopup.close();
  },
});

profileEditPopup.setEventListeners();
addingNewCardPopup.setEventListeners();

//обработчик кнопки создания новой карточки
createNewCardButton.addEventListener('click', () => {
  cardValidation.validateErrorRemoving();

  cardFormInputImageLink.value = '';
  cardFormInputTitle.value = '';
  cardValidation.validateErrorRemoving();

  addingNewCardPopup.open();
});

//обработчик кнопки открытия редактирования профиля
editProfileButton.addEventListener('click', () => {
  nameInput.value = newUserInfo.getUserInfo().name;
  jobInput.value = newUserInfo.getUserInfo().info;

  profileValidation.validateErrorRemoving();

  profileEditPopup.open();
});

profileValidation.enableValidation();
cardValidation.enableValidation();
