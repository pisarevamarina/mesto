import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, formSubmitHandler }) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._element = document.querySelector(this._popupSelector);
  }

  _getInputValues() {
    this._inputList = document
      .querySelector(this._popupSelector)
      .querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form = this._element.querySelector('.popup__form');
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const data = this._getInputValues();
      this._formSubmitHandler(data);

      this.close();
    });
  }

  close() {
    super.close();
    this._form = this._element.querySelector('.popup__form');
    this._form.reset();
  }
}
