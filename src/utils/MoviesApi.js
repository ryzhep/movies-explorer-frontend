class MoviesApi {
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
  
    getMoviesAll() {
      return fetch(`${this._baseUrl}`, {
        headers: this._headers
      }).then(res => {
        return this._checkResponse(res);
      });
    }
  }
  
  export const moviesApi = new MoviesApi({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
      Accept: 'application/json'
    }
  });