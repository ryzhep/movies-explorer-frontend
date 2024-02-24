class MainApi {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    }
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
          headers: this._headers,
        }).then(res => {
          return this._checkResponse(res);
        });
      }
    
      editUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({ name: data.name, email: data.email })
        }).then(res => {
          return this._checkResponse(res);
        });
      }
    }

    export const mainApi = new MainApi({
        baseUrl: 'https://api.ryzhep-movies.nomoredomainsmonster.ru',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      });