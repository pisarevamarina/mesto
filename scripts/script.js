const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const editProfileButton = document.querySelector('.profile__edit-button');
const closePopupEditProfile = popupEditProfile.querySelector('.popup__exit-button');
const closePopupNewCard = popupNewCard.querySelector('.popup__exit-button');
const saveProfileButton = popupEditProfile.querySelector('.popup__submit-button_type_save');
const nameInput = document.querySelector('.popup__input_type_name')
const jobInput = document.querySelector('.popup__input_type_info')
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const formElement = popupEditProfile.querySelector('.popup__form_type_edit-profile');
const createNewCardButton = document.querySelector('.profile__add-button');
const closepopupImage = popupImage.querySelector('.popup__exit-button');
const templateCards = document.querySelector('.template-cards');
const cardsList = document.querySelector('.grid-elements');
const cardForm = document.querySelector('.popup_form_type_new-card');
const cardFormInputTitle = cardForm.querySelector('.popup__input_type_title');
const cardFormInputImageLink = cardForm.querySelector('.popup__input_type_image-link');
const cardFormSubmitBtn = cardForm.querySelector('.popup__submit-button_type_create');


function popupToggle(popup) {                   //функция тогла попапа
    popup.classList.toggle('popup_opened');
}



function formSubmitHandler(evt) {               // эта функция вставляет в поля на странице данные из формы, которые ввел
    evt.preventDefault();                        // пользователь и закрывает попап после подтверждния

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    popupToggle(popupEditProfile);
}

formElement.addEventListener('submit', formSubmitHandler);  // обработчик на  форму открытия попапа редактирования профиля



closePopupEditProfile.addEventListener('click', function () {        //обработчик на закрывающий попап редактирования профиля крестик
    popupToggle(popupEditProfile);
});
closePopupNewCard.addEventListener('click', function () {     // обработчик на кнопку, закрывающую попап создания карточки 
    popupToggle(popupNewCard);
});

closepopupImage.addEventListener('click', function () {         // обработчик на крестик, закрывающий попап с новой карточкой
    popupToggle(popupImage);
})

editProfileButton.addEventListener('click', function () {          // обработчик на кнопку редактирования профиля, которая открывает попап
    popupToggle(popupEditProfile);                                //с функцией, которая присваивает инпутам текущие значения на странице
    if (popupEditProfile.classList.contains('popup_opened')) {
        nameInput.value = profileName.textContent;
        jobInput.value = profileJob.textContent;

    }
});

createNewCardButton.addEventListener('click', function () {       // обработчик на кнопку открытия попапа создания новой карточки
    popupToggle(popupNewCard);
    if (popupNewCard.classList.contains('popup_opened')) {
        cardFormInputImageLink.value = "";
        cardFormInputTitle.value = "";
    }
})


function addCard(name, link) {              //функция добавления карточки на страницу
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



const showInputError = (popupForm, inputElement, errorMessage) => {
    const errorElement = popupForm.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.classList.add('popup__input-error_active');
    errorElement.textContent = errorMessage;

}

const hideInputError = (popupForm, inputElement) => {
    const errorElement = popupForm.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
};

const checkInputValidity = (popupForm, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(popupForm, inputElement, inputElement.validationMessage);
    }
    else {
        hideInputError(popupForm, inputElement)
};
}

function setEventListeners(popupForm) {
    const inputList = Array.from(popupForm.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(popupForm, inputElement)
        })

    })
}


function enableValidation() {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((popupForm) => {
        popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        setEventListeners(popupForm);
    })
}

enableValidation()