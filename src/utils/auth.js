export const BASE_URL = "https://api.ryzhep-movies.nomoredomainsmonster.ru";

const checkResponse = res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  };

//отправляет запрос на регистрацию
export const register = ({name, email, password}) => {
    return fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password }),
    }).then(data => {
        const token = data.token;
        localStorage.setItem('jwt', token);
        return data;
      })
      .then(res => checkResponse(res));
  };
  
// отправляет запрос на авторизацию
export const login = ( {email, password }) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
    })
    .then(data => {
      const token = data.token;
      localStorage.setItem('jwt', token);
      return data;
    })
    .then(res => checkResponse(res));
};

export const token = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
    .then(res => checkResponse(res));
  };
  
  export const signOut = () => {
    return fetch(`${BASE_URL}/signout`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
  };