const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const editForm = popupEditProfile.querySelector('.popup__form');
const popupNewCard = document.querySelector('.popup_type_new-card');
const newCardForm = popupNewCard.querySelector('.popup__form');
const popupImage = document.querySelector('.popup_type_image');
const editProfileButton = document.querySelector('.profile__edit-button');
const closePopupEditProfile = popupEditProfile.querySelector('.popup__exit-button');
const closePopupNewCard = popupNewCard.querySelector('.popup__exit-button');
const saveProfileButton = popupEditProfile.querySelector('.popup__submit-button_type_save');
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
const cardFormSubmitBtn = cardForm.querySelector('.popup__submit-button_type_create');
const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_type_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: '.popup__input-error',
    errorActiveClass: 'popup__input-error_active'
};

function popupToggle(popup) {                   //функция тогла попапа 
    popup.classList.toggle('popup_opened');
    if (popup.classList.contains('popup_opened')) {
        document.addEventListener('keydown', closePopupOnEsc)
    }
    else {
        document.removeEventListener('keydown', closePopupOnEsc)
    }
}

function closePopupOnEsc(evt) {        // закрытие попапа по ESC
    const currentPopup = document.querySelector('.popup_opened');
    if (currentPopup && evt.key === 'Escape') {
        popupToggle(currentPopup);
    }

}

function overlayPforilePopap(evt) {         //закрытие попапов по оверлкю
    if (evt.target === evt.currentTarget) {
        popupEditProfile.classList.remove('popup_opened')
    }

}
function overlayImagePopap(evt) {
    if (evt.target === evt.currentTarget) {
        popupImage.classList.remove('popup_opened')
    }

}

function overlayNewCardPopup(evt) {
    if (evt.target === evt.currentTarget) {
        popupNewCard.classList.remove('popup_opened')
    }

}

closePopupEditProfile.addEventListener('click', function () {   //обработчики на закрывающий попап крестик
    popupToggle(popupEditProfile)
});
closePopupNewCard.addEventListener('click', function () {  
    popupToggle(popupNewCard);
});
closepopupImage.addEventListener('click', function () { 
    popupToggle(popupImage);
})

popupNewCard.addEventListener('click', overlayNewCardPopup)
popupImage.addEventListener('click', overlayImagePopap)
popupEditProfile.addEventListener('click', overlayPforilePopap)


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

    popupToggle(popupEditProfile);
}

formEditProfile.addEventListener('submit', formSubmitHandler);  // обработчик на  форму открытия попапа редактирования профиля

editProfileButton.addEventListener('click', function () {          // обработчик на кнопку редактирования профиля, которая открывает попап
    validateErrorRemoving(editForm);                               // обнуление ошибок при открытии
    popupToggle(popupEditProfile);                                //с функцией, которая присваивает инпутам текущие значения на странице
    if (popupEditProfile.classList.contains('popup_opened')) {
        nameInput.value = profileName.textContent;
        jobInput.value = profileJob.textContent;

    }
});

createNewCardButton.addEventListener('click', function () {       // обработчик на кнопку открытия попапа создания новой карточки
    popupToggle(popupNewCard);
    validateErrorRemoving(newCardForm);
    if (popupNewCard.classList.contains('popup_opened')) {
        cardFormInputImageLink.value = "";
        cardFormInputTitle.value = "";

    }
})


function addCard(name, link) {                                     //функция добавления карточки на страницу
    const card = templateCards.content.cloneNode(true);
    card.querySelector('.grid-element__title').textContent = name;
    card.querySelector('.grid-element__image').src = link;
    card.querySelector('.grid-element__image').alt = name;
    addCardListeners(card);
    cardsList.prepend(card);
}

initialCards.forEach(item => {
    addCard(item.name, item.link);
});


function cardFormSubmitHandler(evt) {    //функция для формы добавления карточек, которая принимает
    evt.preventDefault();                 //из ипутов пользовательский текст и ссылку и вставляет в карточку
    let name = cardFormInputTitle.value;
    let link = cardFormInputImageLink.value;

    cardFormInputImageLink.value = "";
    cardFormInputTitle.value = "";

    addCard(name, link);                  //передаем  пользовательские данные в фунцию создания карточки
    popupToggle(popupNewCard);            //закрываем попап
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
    popupToggle(popupImage);
}

function addCardListeners(card) {             //функия с обработчиками событий для карточки
    card.querySelector('.grid-element__like-button').addEventListener('click', setLike);
    card.querySelector('.grid-element__trash-button').addEventListener('click', deleteCard);
    card.querySelector('.grid-element__image').addEventListener('click', openPopupImage)
}

enableValidation(config);