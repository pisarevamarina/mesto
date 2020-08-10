// const { Popup } = require('./Popup');
import Popup from './Popup.js'

export default class PopupWithImage extends Popup{
    constructor(popupSelector) {
        super (popupSelector);
        this._element = document.querySelector(this._popupSelector);
    }
   open() {
      super.open(); 
      super.setEventListeners();
    const imageElement = event.target.closest('.grid-element__image');
    this._element.querySelector('.popup__image').src = imageElement.src;
    this._element.querySelector('.popup__bottom-title').textContent = imageElement.alt;
   
   }
}