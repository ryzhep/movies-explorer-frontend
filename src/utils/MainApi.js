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
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/users/me`, {
      headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,},
      credentials: 'include'
    }).then(res => {
      return this._checkResponse(res);
    });
  }

//измнение данных профайла
  editUserInfo(data) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {  Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
      body: JSON.stringify({ name: data.name, email: data.email }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

// удалить фильм
deleteMovie(id) {
  const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: 'DELETE',
      headers: {  Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
      credentials: 'include'
    }).then(res => {
      return this._checkResponse(res);
    });
  }
 
// сохранить фильм
saveMovies(movie) {
  const token = localStorage.getItem('jwt');
  return fetch(`${this._baseUrl}/movies`, {
    method: 'POST',
    headers: {  Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`},
    credentials: 'include',
    body: JSON.stringify({
      ...movie
    })
  }).then(res => {
    return this._checkResponse(res);
  });
}

  
// показать сохраненные фильмы
getSavedMovies() {
  const token = localStorage.getItem('jwt');
  return fetch(`${this._baseUrl}/movies`, {
    headers:{
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
    },
    credentials: 'include'
  }).then(res => {
      return this._checkResponse(res);
  });
}
}

export const mainApi = new MainApi({
  baseUrl: "https://api.ryzhep-movies.nomoredomainsmonster.ru",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  credentials: 'include'
});
