class UserInfo {
  constructor(userData) {
    (this.name = userData.name), 
    (this.job = userData.job);
  }
  getUserInfo() {
      const name = this.name;
      const job = this.job;

      return { name, job };
  }

  setUserInfo({ name,job }) {
    this.name = name;
    this.job = job;
  }
}
