const popupEditProfile = document.querySelector('.popup_type_edit-profile');  //попап редактирования профиля
const popupNewCard = document.querySelector('.popup_type_new-card');          // попап добавления новой карточки
const popupImage = document.querySelector('.popup_type_image');               // попап со всплывающей картинкой
const editProfileButton = document.querySelector('.profile__edit-button');    // кнопка редактирования профиля
const closePopupEditProfile = popupEditProfile.querySelector('.popup__exit-button');  // кнопка закрытия попапа редактирования профиля
const closePopupNewCard = popupNewCard.querySelector('.popup__exit-button');       // кнопка закрытия попапа добавления карточки
const saveProfileButton = popupEditProfile.querySelector('.popup__submit-button_type_save');  //кнопка сохранения новых данный профиля
const nameInput = document.querySelector('.popup__input_type_name')               // инпут ввода имени
const jobInput = document.querySelector('.popup__input_type_info')                // инпут ввода деятельности
const profileName = document.querySelector('.profile__title');                  // имя профия
const profileJob = document.querySelector('.profile__subtitle');                 // название деятельности
const formElement = popupEditProfile.querySelector('.popup__form_type_edit-profile');     // форма попапа редактирования профия
const createNewCardButton = document.querySelector('.profile__add-button');             // кнопка создания новой карточки
const submitCardFormButton = popupNewCard.querySelector('.popup__submit-button_type_create');         // кнопка подтверждения создания новой карточки
const closepopupImage = popupImage.querySelector('.popup__exit-button');      //кнопка закрытия попапа с картинкой
const templateCards = document.querySelector('.template-cards');  // template элемент
const cardsList = document.querySelector('.grid-elements');     // контейнер, содержайщий все карточки на странице
const cardForm = document.querySelector('.popup_form_type_new-card');       // форма создания новой карточки
const cardFormInputTitle = cardForm.querySelector('.popup__input_type_title');  // // инпут для ввода названия новой карточки
const cardFormInputImageLink = cardForm.querySelector('.popup__input_type_image-link');  // инпут для ввода ссылки на карточку
const cardFormSubmitBtn = cardForm.querySelector('.popup__submit-button_type_create');  // кнопка подтверждения создания новой карточки


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


const initialCards = [                // массив с карточками "из коробки"
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


createNewCardButton.addEventListener('click', function () {       // обработчик на кнопку открытия попапа создания новой карточки
    popupToggle(popupNewCard);
})


function addCard(name, link) {              //функция добавления карточки на страницу
    const card = templateCards.content.cloneNode(true);
    card.querySelector('.grid-element__title').textContent = name;
    card.querySelector('.grid-element__image').src = link;
    card.querySelector('.grid-element__image').alt = name;
    addCardListeners(card)
    cardsList.prepend(card)


}

initialCards.forEach(item => {
    addCard(item.name, item.link);
});



function cardFormSubmitHandler(event) {    //функция для формы добавления карточек, которая принимает
    event.preventDefault();                 //из ипутов пользовательский текст и ссылку и вставляет в карточку
    let name = cardFormInputTitle.value;
    let link = cardFormInputImageLink.value;

    cardFormInputImageLink.value = "";   //эти строчки обнуляют формы после введения данных 
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


function openPopupImage(event) {       //функция открывающая попап с картинкой
    const imageElement = event.target.closest('.grid-element__image');
    document.querySelector('.popup__image').src = imageElement.src;
    document.querySelector('.popup__bottom-title').textContent = imageElement.alt;
    popupToggle(popupImage);


}

function addCardListeners(card) {             //функия с обработчиками событий для карточки
    card.querySelector('.grid-element__like-button').addEventListener('click', setLike);
    card.querySelector('.grid-element__trash-button').addEventListener('click', deleteCard);
    card.querySelector('.grid-element__image').addEventListener('click', openPopupImage)
}








