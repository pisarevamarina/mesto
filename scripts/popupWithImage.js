// const { Popup } = require('./Popup');
import Popup from './Popup.js'

export default class PopupWithImage extends Popup{
    constructor(popupSelector) {
        super (popupSelector);
    }
   open() {
    const imageElement = event.target.closest('.grid-element__image');
    document.querySelector('.popup__image').src = imageElement.src;
    document.querySelector('.popup__bottom-title').textContent = imageElement.alt;
    document.querySelector(this._popupSelector).classList.add('popup_opened');
   
   }
}