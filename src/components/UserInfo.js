class UserInfo {
    constructor(userNameSelector, userSubtitleSelector) {
        this._name = document.querySelector(userNameSelector);
        this._subtitle = document.querySelector(userSubtitleSelector);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            subtitle: this._subtitle.textContent
        };
    }

    setUserInfo({ name, subtitle }) {
        this._name.textContent = name;
        this._subtitle.textContent = subtitle;
    }
}

export { UserInfo };