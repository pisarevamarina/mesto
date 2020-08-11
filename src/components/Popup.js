export default class Popup {
    constructor (popupSelector) {
this._popupSelector = popupSelector;
this._element = document.querySelector(this._popupSelector);
    }
    open () {
        this._element.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
        
    }
    close () {
        this._element.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (evt) => {
        const currentPopup = document.querySelector('.popup_opened');
        if (currentPopup && evt.key === 'Escape') {
         this.close();
    }
}

    setEventListeners () {
        this._element.querySelector('.popup__exit-button').addEventListener('click',() => this.close());
this._element.addEventListener('click', (evt) => this._handleOverlayClose(evt));
}
    _handleOverlayClose = (evt) => {
        const currentPopup = document.querySelector('.popup_opened');
          if (currentPopup && evt.target === evt.currentTarget) {
            this.close();
    }
}
}
