import { data } from "autoprefixer";

export default class Api {
    constructor (options) {
this.baseUrl =  options.baseUrl;
this.headers = options.headers;
    }

    getInitialCards() {
        return fetch (`${this.baseUrl}/cards`, {
            headers: this.headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Упс! Ошибка: ${res.status}`)
        })
    }

    postUserCard ({name, link}){
        return fetch (`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers, 
            body: JSON.stringify({
             name, link
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Упс! Ошибка: ${res.status}`)
        })
    }

    getUserInfo() {
        return fetch (`${this.baseUrl}/users/me`, {
            headers: this.headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Упс! Ошибка: ${res.status}`)
        })
}

    editUserInfo({name, about}) {
        return fetch (`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
            name, about
              })

        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Упс! Ошибка: ${res.status}`)
        })

    }

    setLike(cardId) {
        return fetch (`${this.baseUrl}/cards/likes/${cardId}`, {
          method: 'PUT',
          headers: this.headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Упс! Ошибка: ${res.status}`)
        })
    }

    deleteLike(cardId) {
        return fetch (`${this.baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this.headers
          })
          .then(res => {
              if (res.ok) {
                  return res.json();
              }
              return Promise.reject(`Упс! Ошибка: ${res.status}`)
          })
    }

    deleteCard(cardId) {
        return fetch (`${this.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Упс! Ошибка: ${res.status}`)
        })
    }

    changeAvatar({avatar}) {
        return fetch (`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({avatar})
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Упс! Ошибка: ${res.status}`)
        })
    }
}