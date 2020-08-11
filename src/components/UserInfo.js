export class UserInfo {
  constructor(nameSelector, jobSelector) {
    (this._nameElement = document.querySelector(nameSelector)),
      (this._jobElement = document.querySelector(jobSelector));
  }
  getUserInfo() {
    this._userInfo = {};

    this._userInfo.name = this._nameElement.textContent;
    this._userInfo.info = this._jobElement.textContent;

    return this._userInfo;
  }

  setUserInfo(userData) {
    this._nameElement.textContent = userData.name;
    this._jobElement.textContent = userData.info;
  }
}
