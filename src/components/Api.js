class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getInitialCards() {
        return this._wrapFetchResponse(fetch(this._baseUrl + '/cards', {
            headers: this._headers
        })).then(res => res.json());
    }

    getUserInfo() {
        return this._wrapFetchResponse(fetch(this._baseUrl + '/users/me', {
            headers: this._headers
        })).then(res => res.json());
    }

    likeCard(cardId) {
        return this._wrapFetchResponse(fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
            method: 'PUT',
            headers: this._headers
        })).then(res => res.json());
    }

    dislikeCard(cardId) {
        return this._wrapFetchResponse(fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
            method: 'DELETE',
            headers: this._headers
        }).then(res => res.json()));
    }

    _wrapFetchResponse(res) {
        return res.then(res => {
            if (!res.ok) {
                return Promise.reject(`fetch(): ${res.status}`);
            }
            return res;
        });
    }

}



export { Api };