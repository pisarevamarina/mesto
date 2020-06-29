let popupEditProfile = document.querySelector('.popup_type_edit-profile');
let popupNewCard = document.querySelector('.popup_type_new-card');
let popupImage = document.querySelector('.popup_type_image');
let editProfileButton = document.querySelector('.profile__edit-button');
let closePopupEditProfile = popupEditProfile.querySelector('.popup__exit-button');
let closePopupNewCard = popupNewCard.querySelector('.popup__exit-button');
let saveProfileButton = popupEditProfile.querySelector('.popup__submit-button_type_save');
let nameInput = document.querySelector('.popup__input_type_name')
let jobInput = document.querySelector('.popup__input_type_info')
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle'); 
let formElement = popupEditProfile.querySelector('.popup__form_type_edit-profile');
let createNewCardButton = document.querySelector('.profile__add-button');
let submitCardFormButton = popupNewCard.querySelector('.popup__submit-button_type_create');
let closepopupImage = popupImage.querySelector('.popup__exit-button');



function popupToggle(popup) {
    popup.classList.toggle('popup_opened'); 
}

function formSubmitHandler (evt) {               // эта функция вставляет в поля на странице данные из формы, которые ввел
    evt.preventDefault();                        // пользователь и закрывает попап после подтверждния

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    popupToggle(popupEditProfile);
} 

closePopupEditProfile.addEventListener('click', function (){        //обработчик на закрывающий попап крестик 
    popupToggle(popupEditProfile);
});   


editProfileButton.addEventListener('click', function (){      // обработчик на кнопку редактирования профиля, которая открывает попап
    popupToggle(popupEditProfile);
    if (popupEditProfile.classList.contains('popup_opened')) {
        nameInput.value = profileName.textContent;
        jobInput.value = profileJob.textContent;

    }
});  

formElement.addEventListener('submit', formSubmitHandler);  // обработчик на саму форму

createNewCardButton.addEventListener('click', function() {
    popupToggle(popupNewCard);
})

closePopupNewCard.addEventListener('click', function() {
    popupToggle(popupNewCard);
}); 

closepopupImage.addEventListener('click', function (){
    popupToggle(popupImage);
})


const initialCards = [
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

const templateCards = document.querySelector('.template-cards');
const cardsList = document.querySelector('.grid-elements');
const cardForm = document.querySelector('.popup_form_type_new-card');
const cardFormInputTitle = cardForm.querySelector('.popup__input_type_title');
const cardFormInputImageLink = cardForm.querySelector('.popup__input_type_image-link');
const cardFormSubmitBtn = cardForm.querySelector('.popup__submit-button_type_create');



function setLike (event){            //функция для установки лайка
   event.target.classList.toggle('grid-element__like-button_active');
}

function deleteCard (event) {         //функция для удаления карточки
    const card = event.target.closest('.grid-element')
    card.remove();
}


function addCard(name, link) {              //функция добавления карточки на страницу
    const card = templateCards.content.cloneNode(true);
    card.querySelector('.grid-element__title').textContent = name;
    card.querySelector('.grid-element__image').src = link;
    card.querySelector('.grid-element__image').alt = name;
    addCardListeners(card)
    cardsList.prepend(card)


} 


function addCardListeners(card){             //функия с обработчиками событий для карточки
    card.querySelector('.grid-element__like-button').addEventListener('click', setLike);
    card.querySelector('.grid-element__trash-button').addEventListener('click', deleteCard);
    card.querySelector('.grid-element__image').addEventListener('click', openPopupImage)
}

function openPopupImage (event) {       //функция открывающая попап с картинкой
    const imageElement =  event.target.closest('.grid-element__image');
    document.querySelector('.popup__image').src = imageElement.src;
    document.querySelector('.popup__bottom-title').textContent = imageElement.alt;
   popupToggle(popupImage);

  
}


initialCards.forEach(item => {        
   addCard(item.name, item.link);
});

function cardFormSubmitHandler (event) {    //функция для формы добавления карточек, которая принимает
    event.preventDefault();                 //из ипутов пользовательский текст и ссылку и вставляет в карточку
     let name = cardFormInputTitle.value;
     let link = cardFormInputImageLink.value;

     cardFormInputImageLink.value = "";   //эти строчки обнуляют формы после введения данных 
     cardFormInputTitle.value = "";

    addCard(name, link);                  //передаем  пользовательские данные в фунцию создания карточки
    popupToggle (popupNewCard);            //закрываем попап
}

cardForm.addEventListener('submit', cardFormSubmitHandler);  //обработчик для формы создания карточки


