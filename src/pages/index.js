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
  newCardButton,
  editAvatarButton,
  avatarForm,
  avatarImg,
  templateElement
} from '../utils/utils.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import { data } from 'autoprefixer';

const profileValidation = new FormValidator(config, editForm);
const cardValidation = new FormValidator(config, newCardForm);
const avatarValidation = new FormValidator(config, avatarForm);

const newUserInfo = new UserInfo('.profile__title', '.profile__subtitle');

//функция прелоадер, изменяет текст на кнопке сабмита, пока данные
//подгружаются с сервера
const renderLoading = (loading, popupSelector) => {
  const activePopup = document.querySelector(popupSelector);
  const button = activePopup.querySelector('.popup__submit-button');

  button.textContent = loading ? 'Сохранение...' : 'Сохранить';
};
let userId;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: 'aa64054e-de41-439a-90ae-ddf7c127f70d',
    'Content-Type': 'application/json',
  },
});

Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])
  .then(([user,data]) => {
    avatarImg.style.backgroundImage = `url(${user.avatar})`;
    userId = user._id;
    newUserInfo.setUserInfo(user);
    cardsSection.renderItems(data)
  })
//попап с открытием изображения
const zoomImagePopup = new PopupWithImage('.popup_type_image');

const popupWithDeletingCard = new PopupWithSubmit(
  '.popup_type_confirm-deleting'
);

//создание карточки 
  const renderer = (data) => {
    const card = new Card ({data, userId, templateElement, handleCardClick, handleLikeClick, handleCardDelete});
    const cardElement = card.addCard();
    cardsSection.addItem(cardElement);

    //просмотр картинок в оригинальном размере
    function handleCardClick () {
      zoomImagePopup.open();
    }
     
    //поставить лайк
    function handleLikeClick (cardId) {
      if(card.isLiked()) {
        api.deleteLike(cardId)
        .then((data) => {
          card.updateLikes(data.likes);
        })
        .catch((err) => {
          console.log(err);
        })
      } else {
        api.setLike(cardId)
        .then((data) => {
          card.updateLikes(data.likes);
        })
        .catch((err) => {
          console.log(err);
        })
      }
    }
    //удаление карточки
    function handleCardDelete (cardId) {
      popupWithDeletingCard.setFormSubmitHandler(() => {
        renderLoading(true, '.popup_type_confirm-deleting')
        api
          .deleteCard(cardId)
          .then(() => {
            card.deleteCard();

            popupWithDeletingCard.close();
          })
          .catch((err) => {
            console.log(err);
          })
          .finally (() => renderLoading(false, '.popup_type_confirm-deleting'))
      });

      popupWithDeletingCard.open();
    };
  }


const cardsSection = new Section(
  {
    items: initialCards,
    renderer
  },
    '.grid-elements'
);


const addingNewCardPopup = new PopupWithForm({
  popupSelector: '.popup_type_new-card',
  formSubmitHandler: (data) => {
    console.log(data);
    renderLoading(true, '.popup_type_new-card')
    api.postUserCard(data)
      .then((data) => {
        renderer(data)
        addingNewCardPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() =>{
        renderLoading(false, '.popup_type_new-card')
      })
  },
});

// форма редактирования пользовательских данныых
const profileEditPopup = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  formSubmitHandler: (data) => {
    renderLoading(true, '.popup_type_edit-profile');
    api
      .editUserInfo(data)
      .then((data) => {
        const name = data.name;
        const about = data.about;

        newUserInfo.setUserInfo({ name, about });
      })
      .then(() => profileEditPopup.close())
      .catch((err) => {
        console.log(err);
      })
      .finally(() => renderLoading(false, '.popup_type_edit-profile'));
  },
});

//попап редактирования аватара
const popupWithAvatar = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  formSubmitHandler: (link) => {
    renderLoading(true, '.popup_form_type_avatar');
    api
      .changeAvatar(link)
      .then((data) => {
        avatarImg.style.backgroundImage = `url(${data.avatar})`;
        popupWithAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => renderLoading(true, '.popup_form_type_avatar'));
  },
});


profileEditPopup.setEventListeners();
addingNewCardPopup.setEventListeners();
popupWithDeletingCard.setEventListeners();
popupWithAvatar.setEventListeners();
zoomImagePopup.setEventListeners();

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

//обработчки кнопки открытия попапа редактирования аватара
editAvatarButton.addEventListener('click', () => {
  avatarValidation.validateErrorRemoving();

  popupWithAvatar.open();
});

//включение валидации
profileValidation.enableValidation();
cardValidation.enableValidation();
avatarValidation.enableValidation();
