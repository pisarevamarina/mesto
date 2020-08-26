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
const avatarValidation = new FormValidator(config, avatarForm);

const newUserInfo = new UserInfo('.profile__title', '.profile__subtitle');

//функция прелоадер, изменяет текст на кнопке сабмита, пока данные
//подгружаются с сервера
const renderLoading = (loading, popupSelector) => {
  const activePopup = document.querySelector(popupSelector);
  const button = activePopup.querySelector('.popup__submit-button');

  button.textContent = loading ? 'Сохранение...' : 'Сохранить';
};

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: 'aa64054e-de41-439a-90ae-ddf7c127f70d',
    'Content-Type': 'application/json',
  },
});

//попап с открытием изображения
const zoomImagePopup = new PopupWithImage('.popup_type_image');

const popupWithDeletingCard = new PopupWithSubmit(
  '.popup_type_confirm-deleting'
);

let userId;

api
  .getUserInfo()
  .then((item) => {
    const name = item.name;
    const about = item.about;
    avatarImg.style.backgroundImage = `url(${item.avatar})`;
    userId = item._id;
    newUserInfo.setUserInfo({ name, about });
  })
  .catch((err) => {
    console.log(err);
  });

api
  .getInitialCards()
  .then((result) => {
    console.log(result);
    cardsSection.renderItems(result);
  })
  .catch((err) => {
    console.log(err);
  });

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = new Card({
        data,
        userId,
        templateElement: '.template-cards',
        handleCardClick: () => {
          zoomImagePopup.open();
        },
        setLike: (cardId) => {
          api.setLike(cardId).catch((err) => {
            console.log(err);
          });
        },
        deleteLike: (cardId) => {
          api.deleteLike(cardId).catch((err) => {
            console.log(err);
          });
        },
        handleCardDelete(cardId) {
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
        },
      });
      const cardElement = card.addCard();
      cardsSection.addItem(cardElement);
    },
  },
  '.grid-elements'
);

//попап с формой добавление карточек пользователя
const addingNewCardPopup = new PopupWithForm({
  popupSelector: '.popup_type_new-card',
  formSubmitHandler: (data) => {
    console.log(data);
    renderLoading(true, '.popup_type_new-card')
    api.postUserCard(data)
      .then((data) => {
        const card = new Card({
          data,
          userId,
          templateElement: '.template-cards',
          handleCardClick: () => {
            // const zoomImagePopup = new PopupWithImage('.popup_type_image');
            zoomImagePopup.open();
            // zoomImagePopup.setEventListeners();
          },
          setLike: (cardId) => {
            api.setLike(cardId).catch((err) => {
              console.log(err);
            });
          },
          deleteLike: (cardId) => {
            api.deleteLike(cardId).catch((err) => {
              console.log(err);
            });
          },

          handleCardDelete(cardId) {
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
                .finally(() => renderLoading(false, '.popup_type_confirm-deleting'))
            });

            popupWithDeletingCard.open();
          },
        });

        const cardElement = card.addCard();
        cardsSection.addItem(cardElement);
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

editAvatarButton.addEventListener('click', () => {
  avatarValidation.validateErrorRemoving();
  popupWithAvatar.open();
});

profileValidation.enableValidation();
cardValidation.enableValidation();
avatarValidation.enableValidation();
