let popup = document.querySelector('.popup');
let editProfileButton = document.querySelector('.profile__edit-button');
let closePopupButton = popup.querySelector('.popup__exit-button');
let submitButton = popup.querySelector('.popup__save-button');
let nameInput = document.querySelector('.popup__input_type_name')
let jobInput = document.querySelector('.popup__input_type_info')
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle'); 
let formElement = popup.querySelector('.popup__form')

function openPopup() {                           //добавляем класс, который открывает попап
    popup.classList.add('popup_opened');

    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function closePopup() {                          //снимаем класс с попапа, который его открывает
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {               // эта функция вставляет в поля на странице данные из формы, которые ввел
    evt.preventDefault();                        // пользователь и закрывает попап после подтверждния

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    closePopup()
} 

function overlayClick (event) {                   //эта функция закрывает попап при клике на пространство вокруг него
    if (event.target == event.currentTarget) {
        closePopup ()
    }

}


closePopupButton.addEventListener('click', closePopup);     //обработчик на закрывающий попап крестик 
editProfileButton.addEventListener('click', openPopup);     // обработчик на кнопку редактирования профиля, которая открывает попап
formElement.addEventListener('submit', formSubmitHandler);  // обработчик на саму форму
popup.addEventListener('click', overlayClick);              //обработчик для пространства вокруг попапа, закрывающий его при клике



