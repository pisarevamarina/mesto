import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open() {
    super.open();
  
    const imageElement = event.target.closest('.grid-element__image');
    this._element.querySelector('.popup__image').src = imageElement.src;
    this._element.querySelector('.popup__bottom-title').textContent =
      imageElement.alt;
    this._element.querySelector('.popup__image').alt = imageElement.alt;
  }
}
