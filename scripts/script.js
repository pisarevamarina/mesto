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


function popupToggle(popup) {
    popup.classList.toggle('popup_opened'); 
}

function formSubmitHandler (evt) {               // эта функция вставляет в поля на странице данные из формы, которые ввел
    evt.preventDefault();                        // пользователь и закрывает попап после подтверждния

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    popupToggle(popupEditProfile);
} 

function overlayClick (event) {                   //эта функция закрывает попап при клике на пространство вокруг него
    if (event.target == event.currentTarget) {
        popupToggle ()
    }

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

//!!      popupEditProfile.addEventListener('click', overlayClick);   //ПОДУМАТЬ КАК РЕШИТЬ ВОПРОС обработчик для пространства вокруг попапа, закрывающий его при клике

createNewCardButton.addEventListener('click', function() {
    popupToggle(popupNewCard);
})
closePopupNewCard.addEventListener('click', function() {
    popupToggle(popupNewCard);
});




















/*function openPopup() {                           //добавляем класс, который открывает попап
    popup.classList.add('popup_opened');

    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function closePopup() {                          //снимаем класс с попапа, который его открывает
    popup.classList.remove('popup_opened');
}
*/
