import Popup from "./Popup";

export default class PopupWithSubmit extends Popup {
    constructor(popupSelector) {
       super(popupSelector);
       this._form = this._element.querySelector('.popup__form');
    }

    setFormSubmitHandler(formSubmitHandler) {
        this.setFormSubmitHandler = formSubmitHandler;
    }

    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        if (this.setFormSubmitHandler) {
            this.setFormSubmitHandler();
        }
        })
    }

    
}