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

  //получаем данные профайла
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers:this._headers,
      credentials: "include",
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  //измнение данных профайла
  editUserInfo(name, email) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ name: name, email: email }),
    });
  }


  // удалить фильм
  deleteMovie(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: "include",
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  // сохранить фильм
  saveMovies(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        ...movie,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  // показать сохраненные фильмы
  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: this._headers,
      credentials: "include",
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
}
const token = localStorage.getItem("jwt");
export const mainApi = new MainApi({
  baseUrl: "https://api.ryzhep-movies.nomoredomainsmonster.ru",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  credentials: "include",
});
