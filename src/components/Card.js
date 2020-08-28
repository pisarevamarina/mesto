export class Card {
  constructor({ data, userId, templateElement, handleCardClick, handleLikeClick, handleCardDelete}) {
    this._name = data.name;
    this._link = data.link;
    this._info = data.name;
    this._likes = data.likes;
    this._templateElement = templateElement;
    this.handleCardClick = handleCardClick;
    this.handleLikeClick = handleLikeClick;
    this.ownerId = data.owner._id;
    this.cardId = data._id;
    this.userId = userId;
    this._handleCardDelete = handleCardDelete;
  }

  _getView() {
    if (this.ownerId !== this.userId) {
      this._card.querySelector('.grid-element__trash-button').style.display = "none";
    }
  }

  _getTemplate() {
    const cardElement = this._templateElement
    .content.querySelector('.grid-element').cloneNode(true);

    return cardElement;
  }

  _get_LikesCount() {
    return this._likes.length;
  }

  updateLikes(newLikes) {
    this._likes = newLikes;
    this._likeButton.classList.toggle('grid-element__like-button_active')
    this._likeButton = this._card.querySelector('.grid-element__like-button')
    this._likesCount = this._card.querySelector('.grid-element__like-count')
    this._likesCount.textContent = newLikes.length;

  }

  isLiked() {
    return !!this._likes.find(like => like._id === this.userId);
  }

  addCard() {

    this._card = this._getTemplate() //записывваем в переменную текущей карточки новую разметку
    this._likeButton = this._card.querySelector('.grid-element__like-button')
    this._likesCount = this._card.querySelector('.grid-element__like-count')
   this.cardImage = this._card.querySelector('.grid-element__image'); //нашли элементы с картинкой и названием
    this.cardTitle = this._card.querySelector('.grid-element__title');
    this.cardTitle.textContent = this._name; //записали в эти поля данные новой карточки
    this.cardImage.src = this._link;
    this.cardImage.alt = this._info;
    this._likesCount.textContent = this._likes.length;

    if(this.isLiked()) {
      this._likeButton.classList.add('grid-element__like-button_active')
    }

    this._getView();

    this._setLikes()
    this._setEventListenersOnCard();
    
    return this._card;
  }

  _setEventListenersOnCard() {
    this._card
      .querySelector('.grid-element__like-button')
      .addEventListener('click', () => this.handleLikeClick(this.cardId))
    this._card
      .querySelector('.grid-element__trash-button')
      .addEventListener('click', () => this._handleCardDelete(this.cardId));
    this._card
      .querySelector('.grid-element__image')
      .addEventListener('click', () => this.handleCardClick());
     
  }     
    _setLikes() {
      this._likesCount = this._card.querySelector('.grid-element__like-count')
      this._likesCount.textContent = this._get_LikesCount()
    }
  
  deleteCard() {
    this._card.remove();
}
}