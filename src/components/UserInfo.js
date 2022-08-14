class UserInfo {
    constructor(userNameSelector, userAboutSelector, userAvatarSelector) {
        this._name = document.querySelector(userNameSelector);
        this._about = document.querySelector(userAboutSelector);
        this._avatar = document.querySelector(userAvatarSelector);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._about.textContent
        };
    }

    setUserInfo({ name, about }) {
        this._name.textContent = name;
        this._about.textContent = about;
    }

    setAvatar({ avatar }) {
        this._avatar.setAttribute('src', avatar);
    }
}

export { UserInfo };