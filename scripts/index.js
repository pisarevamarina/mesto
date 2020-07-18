const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const editForm = popupEditProfile.querySelector('.popup__form');
const popupNewCard = document.querySelector('.popup_type_new-card');
const newCardForm = popupNewCard.querySelector('.popup__form');
const popupImage = document.querySelector('.popup_type_image');
const editProfileButton = document.querySelector('.profile__edit-button');
const closePopupEditProfile = popupEditProfile.querySelector('.popup__exit-button');
const closePopupNewCard = popupNewCard.querySelector('.popup__exit-button');
const nameInput = document.querySelector('.popup__input_type_name')
const jobInput = document.querySelector('.popup__input_type_info')
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const formEditProfile = popupEditProfile.querySelector('.popup__form_type_edit-profile');
const createNewCardButton = document.querySelector('.profile__add-button');
const closepopupImage = popupImage.querySelector('.popup__exit-button');
const templateCards = document.querySelector('.template-cards');
const cardsList = document.querySelector('.grid-elements');
const cardForm = document.querySelector('.popup_form_type_new-card');
const cardFormInputTitle = cardForm.querySelector('.popup__input_type_title');
const cardFormInputImageLink = cardForm.querySelector('.popup__input_type_image-link');
const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_type_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: '.popup__input-error',
    errorActiveClass: 'popup__input-error_active'
};


function openPopup (popup) {
    popup.classList.add('popup_opened')
    document.addEventListener('keydown', closePopupOnEsc)
}

function closePopup (popup) {
    popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', closePopupOnEsc)
}

function closePopupOnEsc(evt) {                                // закрытие попапа по ESC
    const currentPopup = document.querySelector('.popup_opened');
    if (currentPopup && evt.key === 'Escape') {
        closePopup(currentPopup);
    }

}

function closePopupOnOverlay (evt) {
    const currentPopup = document.querySelector('.popup_opened');
    if (currentPopup && evt.target === evt.currentTarget) {
        closePopup(currentPopup)
    }
}

function changeButtonState(popup) {
    const inputList = Array.from(popup.querySelectorAll(config.inputSelector));
    const buttonElement = popup.querySelector(config.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, config)

};

closePopupEditProfile.addEventListener('click', function () { 
    changeButtonState(popupEditProfile) //обработчики на закрывающий попап крестик
    closePopup(popupEditProfile)
});
closePopupNewCard.addEventListener('click', function () {
    closePopup(popupNewCard);
});
closepopupImage.addEventListener('click', function () {
    closePopup(popupImage);
})

popupNewCard.addEventListener('mousedown', closePopupOnOverlay)
popupImage.addEventListener('mousedown', closePopupOnOverlay)
popupEditProfile.addEventListener('mousedown', closePopupOnOverlay)


function validateErrorRemoving(popupForm) {       //функция удаления ошибок при открытии попапа 
    const inputList = Array.from(popupForm.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => {
        hideInputError(popupForm, inputElement, config);
    })

}

function formSubmitHandler(evt) {               // эта функция вставляет в поля на странице данные из формы, которые ввел
    evt.preventDefault();                        // пользователь и закрывает попап после подтверждния

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    closePopup(popupEditProfile);
}

formEditProfile.addEventListener('submit', formSubmitHandler);  // обработчик на  форму открытия попапа редактирования профиля

editProfileButton.addEventListener('click', function () {          // обработчик на кнопку редактирования профиля, которая открывает попап
    validateErrorRemoving(editForm);
    changeButtonState(popupEditProfile);                               // обнуление ошибок при открытии
    openPopup(popupEditProfile);                                //с функцией, которая присваивает инпутам текущие значения на странице
   if (popupEditProfile.classList.contains('popup_opened')) {
        nameInput.value = profileName.textContent;
        jobInput.value = profileJob.textContent;
        changeButtonState(popupEditProfile);
    }
});

createNewCardButton.addEventListener('click', function () {       // обработчик на кнопку открытия попапа создания новой карточки
    openPopup(popupNewCard);
    validateErrorRemoving(newCardForm);
    changeButtonState(popupNewCard); 
    if (popupNewCard.classList.contains('popup_opened')) {
        cardFormInputImageLink.value = "";
        cardFormInputTitle.value = "";
    }
})

function renderCard(name, link) {
    const card = addCard(name, link)
    cardsList.prepend(card);
}

function addCard(name, link) {                                     //функция добавления карточки на страницу
    const card = templateCards.content.cloneNode(true);
    const cardImage = card.querySelector('.grid-element__image');
    card.querySelector('.grid-element__title').textContent = name;
    cardImage.src = link;
    cardImage.alt = name;
    addCardListeners(card);
    return card
}

initialCards.forEach(item => {
    renderCard(item.name, item.link);
});


function cardFormSubmitHandler(evt) {    //функция для формы добавления карточек, которая принимает
    evt.preventDefault();                 //из ипутов пользовательский текст и ссылку и вставляет в карточку
    const name = cardFormInputTitle.value;
    const link = cardFormInputImageLink.value;

    cardFormInputImageLink.value = "";
    cardFormInputTitle.value = "";

    renderCard(name, link);                  //передаем  пользовательские данные в фунцию создания карточки
    closePopup(popupNewCard);            //закрываем попап
}

cardForm.addEventListener('submit', cardFormSubmitHandler);  //обработчик для формы создания карточки

function setLike(event) {            //функция для установки лайка
    event.target.classList.toggle('grid-element__like-button_active');
}

function deleteCard(event) {         //функция для удаления карточки
    const card = event.target.closest('.grid-element')
    card.remove();
}

function openPopupImage(evt) {       //функция открывающая попап с картинкой
    const imageElement = evt.target.closest('.grid-element__image');
    document.querySelector('.popup__image').src = imageElement.src;
    document.querySelector('.popup__bottom-title').textContent = imageElement.alt;
    openPopup(popupImage);
}

function addCardListeners(card) {             //функия с обработчиками событий для карточки
    card.querySelector('.grid-element__like-button').addEventListener('click', setLike);
    card.querySelector('.grid-element__trash-button').addEventListener('click', deleteCard);
    card.querySelector('.grid-element__image').addEventListener('click', openPopupImage)
}

enableValidation(config);