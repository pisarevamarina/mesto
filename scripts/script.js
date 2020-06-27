let popupEditProfile = document.querySelector('.popup_type_edit-profile');
let popupNewCard = document.querySelector('.popup_type_new-card');
let editProfileButton = document.querySelector('.profile__edit-button');
let closePopupEditProfile = popupEditProfile.querySelector('.popup__exit-button_type_edit-profile');
let closePopupNewCard = popupNewCard.querySelector('.popup__exit-button_type_new-card');
let saveProfileButton = popupEditProfile.querySelector('.popup__submit-button_type_save');
let nameInput = document.querySelector('.popup__input_type_name')
let jobInput = document.querySelector('.popup__input_type_info')
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle'); 
let formElement = popupEditProfile.querySelector('.popup__form_type_edit-profile');
let createNewCardButton = document.querySelector('.profile__add-button');
let submitCardFormButton = popupNewCard.querySelector('.popup__submit-button_type_create');



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


function setLike (event){
   event.target.classList.toggle('grid-element__like-button_active');
}




function addCard(name, link) {
    const card = templateCards.content.cloneNode(true);
    card.querySelector('.grid-element__title').textContent = name;
    card.querySelector('.grid-element__image').src = link;

    card.querySelector('.grid-element__like-button').addEventListener('click', setLike);

    cardsList.prepend(card)
} 


initialCards.forEach(item => {
   addCard(item.name, item.link);
});

function cardFormSubmitHandler (event) {
    event.preventDefault();      
     let name = cardFormInputTitle.value;
     let link = cardFormInputImageLink.value;

     cardFormInputImageLink.value = "";
     cardFormInputTitle.value = "";

    addCard(name, link);
    popupToggle (popupNewCard);
}

cardForm.addEventListener('submit', cardFormSubmitHandler);


