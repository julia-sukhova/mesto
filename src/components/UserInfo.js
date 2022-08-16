class UserInfo {
    constructor(userNameSelector, userAboutSelector, userAvatarSelector) {
        this._name = document.querySelector(userNameSelector);
        this._about = document.querySelector(userAboutSelector);
        this._avatar = document.querySelector(userAvatarSelector);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._about.textContent,
            id: this._id
        };
    }

    setUserInfo({ name, about, _id }) {
        this._name.textContent = name;
        this._about.textContent = about;
        this._id = _id;
    }

    setAvatar({ avatar }) {
        this._avatar.setAttribute('src', avatar);
    }
}

export { UserInfo };