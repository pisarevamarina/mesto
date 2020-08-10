// import { openPopup, popupImage } from "./utils.js";

export class Card {
  constructor({data, templateElement, handleCardClick}) {
    this._name = data.title;
    this._link = data.link;
    this._info = data.title;
    this._templateElement = templateElement;
    this.handleCardClick = handleCardClick;
  }

  addCard() {
    const cardElement = document
      .querySelector(this._templateElement)
      .content.cloneNode(true); //создали новую разметку

    this._card = cardElement; //записывваем в переменную текущей карточки новую разметку

    const cardImage = this._card.querySelector(".grid-element__image"); //нашли элементы с картинкой и названием
    const cardTitle = this._card.querySelector(".grid-element__title");
    cardTitle.textContent = this._name; //записали в эти поля данные новой карточки
    cardImage.src = this._link;
    cardImage.alt = this._info;

    this._setEventListenersOnCard();
    return this._card;
  }

  _setEventListenersOnCard() {
    this._card
      .querySelector(".grid-element__like-button")
      .addEventListener("click", () => this._setLike());
    this._card
      .querySelector(".grid-element__trash-button")
      .addEventListener("click", () => this._deleteCard());
    this._card
      .querySelector(".grid-element__image")
      .addEventListener("click", () => this.handleCardClick());
  }

  _setLike() {
    event.target.classList.toggle("grid-element__like-button_active");
  }

  _deleteCard() {
    this._card = event.target.closest(".grid-element");
    this._card.remove();
  }

  // _openCardImage() {
  //   const imageElement = event.target.closest(".grid-element__image");
  //   document.querySelector(".popup__image").src = imageElement.src;
  //   document.querySelector(".popup__bottom-title").textContent =
  //     imageElement.alt;
  //   openPopup(popupImage);
  }
// }
