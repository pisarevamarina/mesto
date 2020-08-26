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
  newCardButton
} from '../utils/utils.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';

const profileValidation = new FormValidator(config, editForm);
const cardValidation = new FormValidator(config, newCardForm);

const newUserInfo = new UserInfo('.profile__title', '.profile__subtitle');

//рендер на страницу массива с базовыми карточками
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: 'aa64054e-de41-439a-90ae-ddf7c127f70d',
    'Content-Type': 'application/json'
  },
})


let userId;

api.getUserInfo()
.then((item) => {
  const name = item.name;
  const about = item.about;

  userId = item._id;
  newUserInfo.setUserInfo({name, about});
  
})
.catch((err) => {
  console.log(err);
})

const popupWithDeletingCard = new PopupWithSubmit('.popup_type_confirm-deleting')

// function handleCardDelete (cardId) {
//   popupWithDeletingCard.setFormSubmitHandler(() => {
//   api.deleteCard(cardId)
//   .then(() => {
//     card.deleteCard();

//     popupWithDeletingCard.close();
//   })
//   .catch((err) => {
//     console.log(err);
//   })
// })

// popupWithDeletingCard.open()

// }

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = new Card({
        data,
        userId,
        templateElement: '.template-cards',
        handleCardClick: () => {
          const zoomImagePopup = new PopupWithImage('.popup_type_image');
          zoomImagePopup.open();
          zoomImagePopup.setEventListeners();
        },
        setLike: (cardId) => {
          api.setLike(cardId)
  .catch((err) => {
    console.log(err)
  });
        },
        deleteLike: (cardId) => {
          api.deleteLike(cardId)
          .catch((err) => {
            console.log(err)
          })
        },
        handleCardDelete (cardId) {
          popupWithDeletingCard.setFormSubmitHandler(() => {
          api.deleteCard(cardId)
          .then(() => {
            card.deleteCard();
        
            popupWithDeletingCard.close();
          })
          .catch((err) => {
            console.log(err);
          })
        })
        
        popupWithDeletingCard.open()
        
        },

      });
      const cardElement = card.addCard();
      cardsSection.addItem(cardElement);
    },
  },
  '.grid-elements'
);

// cardsSection.renderItems();

api.getInitialCards()
.then((result) =>{
  cardsSection.renderItems(result)
  console.log(result);

})
.catch((err) => {
  console.log(err);
})

//попап с формой добавление карточек пользователя
const addingNewCardPopup = new PopupWithForm({
  popupSelector: '.popup_type_new-card',
  formSubmitHandler: (data) => {
    console.log(data)
    api.postUserCard(data)
    .then((data) =>{
      const card = new Card({
        data,
        userId,
        templateElement: '.template-cards',
        handleCardClick: () => {
          const zoomImagePopup = new PopupWithImage('.popup_type_image');
          zoomImagePopup.open();
          zoomImagePopup.setEventListeners();
        },
        setLike: (cardId) => {
          api.setLike(cardId)
  .catch((err) => {
    console.log(err)
  });
        },
        deleteLike: (cardId) => {
          api.deleteLike(cardId)
          .catch((err) => {
            console.log(err)
          })
        },

        handleCardDelete (cardId) {
          popupWithDeletingCard.setFormSubmitHandler(() => {
          api.deleteCard(cardId)
          .then(() => {
            card.deleteCard();
        
            popupWithDeletingCard.close();
          })
          .catch((err) => {
            console.log(err);
          })
        })
        
        popupWithDeletingCard.open()
        
        },
      });

      const cardElement = card.addCard()
      cardsSection.addItem(cardElement);
      
    })
.catch((err) =>{
  console.log(err)
})
console.log(data)
addingNewCardPopup.close();
  },
});



// форма редактирования пользовательских данныых
const profileEditPopup = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  formSubmitHandler: (data) => {
    api.editUserInfo(data)
    .then((data) => {
      const name = data.name;
      const about = data.about;
  
      newUserInfo.setUserInfo({name, about})

      profileEditPopup.close();
    })
    // newUserInfo.setUserInfo(data);
    .catch((err) =>{
      console.log(err)
    })
  },

});



profileEditPopup.setEventListeners();
addingNewCardPopup.setEventListeners();
popupWithDeletingCard.setEventListeners();

//обработчик кнопки создания новой карточки
newCardButton.addEventListener('click', () => {
  cardValidation.validateErrorRemoving();

  cardFormInputImageLink.value = '';
  cardFormInputTitle.value = '';
  cardValidation.validateErrorRemoving();

  addingNewCardPopup.open();
});

//обработчик кнопки открытия редактирования профиля
editProfileButton.addEventListener('click', () => {
  nameInput.value = newUserInfo.getUserInfo().name;
  jobInput.value = newUserInfo.getUserInfo().about;

  profileValidation.validateErrorRemoving();

  profileEditPopup.open();
});

profileValidation.enableValidation();
cardValidation.enableValidation();
