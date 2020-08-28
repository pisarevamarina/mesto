export class Card {
  constructor({ data, userId, templateElement, handleCardClick, handleLikeClick, deleteLike, handleCardDelete}) {
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
    this.deleteLike = deleteLike;
    this._handleCardDelete = handleCardDelete;
    console.log(this.userId)
    
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

isLiked() {
 return this._likes.forEach(like => {
    if(like._id.includes(this.userId)){
      this._likeButton.classList.add('grid-element__like-button_active')
    }});
}

  addCard() {

    this._card = this._getTemplate() //записывваем в переменную текущей карточки новую разметку

   this.cardImage = this._card.querySelector('.grid-element__image'); //нашли элементы с картинкой и названием
    this.cardTitle = this._card.querySelector('.grid-element__title');
    this.likesCount = this._card.querySelector('.grid-element__like-count')
    this.cardTitle.textContent = this._name; //записали в эти поля данные новой карточки
    this.cardImage.src = this._link;
    this.cardImage.alt = this._info;
    this.likesCount.textContent = this._likes.length;

    this._likeButton = this._card.querySelector('.grid-element__like-button');
    
    this._getView();

this.isLiked()

    this._setEventListenersOnCard();
    return this._card;
  }

  _setEventListenersOnCard() {
    this._card
      .querySelector('.grid-element__like-button')
      .addEventListener('click', () => {
        if (this.isLiked) {
this.handleLikeClick(this.cardId)
        }
        else {
          this.deleteLike(this.cardId)
        }
      })
    this._card
      .querySelector('.grid-element__trash-button')
      .addEventListener('click', () => this._handleCardDelete(this.cardId));
    this._card
      .querySelector('.grid-element__image')
      .addEventListener('click', () => this.handleCardClick());
     
  }

  setLike() {
    if (this._likeButton.classList.contains('grid-element__like-button_active')) { 
      this._likeButton.classList.remove('grid-element__like-button_active');
      this.likesCount.textContent = this._likes.length -= 1; 
      console.log(this.likesCount); 
 
      // this.handleLikeClick(this.cardId); 
    } 
    else  
 
      if (this._likes.length === 0) { 
        this.likesCount.textContent = 0; 
      }  
 
     else { 
      this._likeButton.classList.add('grid-element__like-button_active');
      this.likesCount.textContent = this._likes.length += 1; 
      // this.deleteLike(this.cardId); 
   } 
       
    } 
      
  
  deleteCard() {
    this._card.remove();
}
}