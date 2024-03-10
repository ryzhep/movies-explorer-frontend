import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { mainApi } from "../../utils/MainApi";
import { moviesApi } from "../../utils/MoviesApi";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import PageNotFound from "../PageNotFound/PageNotFound";
import SavedMovies from "../SavedMovies/SavedMovies";
import { register, login, token, signOut } from "../../utils/auth";
import { useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRouteElement from "../ProtectedRouteElement/ProtectedRouteElement";
import { Movie_URL } from "../../utils/constants";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

function App() {
  const location = useLocation();
  const [movies, setMovies] = React.useState([]); // Стейт фильмов
  const [saveMovies, setSaveMovies] = React.useState([]); // Стейт сохраненных фильмов
  const [currentUser, setCurrentUser] = React.useState({ email: "", name: "" });
  const auth = localStorage.getItem("auth");
  const [loggedIn, setLoggedIn] = React.useState(auth); // Пользователь авторизован
  const [errorServer, setErrorServer] = React.useState(""); // Сообщение об ошибке на стороне бэка
  const [disabled, setDisabled] = React.useState(false); // Неактивная кнопка
  const [preloader, setPreloader] = React.useState(false); //прелоадер
  const [errorFront, setErrorFront] = React.useState(""); // Сообщение об ошибке на стороне пользователя
  const [isSearch, setSearch] = React.useState(""); // Значение в поисковой строке
  const [editInputProfileActive, setEditInputProfileActive] =
    React.useState(false); // Активация инпутов в профиле
  const [isInputProfileChanges, setInputProfileChanges] = React.useState(false); // Мониторинг изменений в профиле
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false); // Модальное окно с попапом
  const [tooltip, setTooltip] = React.useState({ message: "" }); // Сообщение в модальном окне
  const navigate = useNavigate();

  //токен
  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi.getUserInfo(jwt);
    }
  }, []);

  // Получение фильмов с сервера
  React.useEffect(() => {
    if (isSearch && movies.length === 0) {
      setPreloader(true);
      moviesApi
        .getMoviesAll()
        .then((movies) => {
          setMovies(movies);
        })
        .catch((error) => {
          if (error === 401) {
            setCurrentUser(null);
            setLoggedIn(false);
            localStorage.clear();
            return;
          }
          setInfoTooltipOpen(true);
          setErrorServer(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен."
          );
          setTooltip({ message: `${errorServer}` });
          console.log(`Ошибка: ${error}`);
        })
        .finally(() => {
          setPreloader(false);
        });
    }
  }, [isSearch, movies]);

  // Получение данных пользователя и сохраненных фильмов
  React.useEffect(() => {
    loggedIn &&
      Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies()])
        .then(([user, saveMovies]) => {
          setCurrentUser(user);
          setSaveMovies(saveMovies);
          setLoggedIn(true);
        })
        .catch((error) => {
          if (error === 401) {
            setLoggedIn(false);
            setCurrentUser(null);
            localStorage.clear();
            return;
          }
          console.log(`Ошибка: ${error}`);
        });
  }, [loggedIn]);

  // Авторизация пользователя
  const handleLogin = ({ email, password }) => {
    setDisabled(true);
    login({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("auth", true);

        setLoggedIn(true);
        navigate("/movies", { replace: true });
        setCurrentUser(data);
      })
      .catch((error) => {
        if (error === 400) {
          setErrorServer("При авторизации произошла ошибка");
        } else if (error === 401) {
          setErrorServer("Вы ввели неверный логин или пароль");
        }
        console.log(`Ошибка: ${error}`);
      })
      .finally(() => {
        setDisabled(false);
      });
  };

  React.useEffect(() => {
    const checkToken = (jwt) => {
      token(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
          }
        })
        .catch(() => {
          console.log("Ошибка доступа");
        });
    };

    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      checkToken(jwt);
    }
  }, []);

  // Регистрация пользователя
  const isRegisterUser = ({ name, email, password }) => {
    setDisabled(true);
    register({ name, email, password })
      .then(() => {
        return login({ email, password });
      })
      .then((data) => {
        setInfoTooltipOpen(true);
        setTooltip({ message: "Вы успешно зарегистрировались!" });
        localStorage.setItem("auth", true);
        localStorage.setItem("jwt", data.token);
        setLoggedIn(true);
        navigate("/movies", { replace: true });
        setCurrentUser(data);
      })
      .catch((error) => {
        if (error === 409) {
          setErrorServer("Пользователь с таким email уже существует");
        } else if (error === 400) {
          setErrorServer("При регистрации пользователя произошла ошибка");
        } else {
          setErrorServer("На сервере произошла ошибка");
        }
        console.log(`Ошибка: ${error}`);
      })
      .finally(() => {
        setDisabled(false);
      });
  };
  // Выход из аккаунта
  const handleSignOut = () => {
    signOut()
      .then(() => {
        setLoggedIn(false);
        setMovies([]);
        setSearch("");
        localStorage.clear();
        navigate("/", { replace: true });
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  };

  // Редактирование данных пользователя
  const handleEditProfile = ({ name, email }) => {
    setDisabled(true);
    mainApi
      .editUserInfo({ name, email })
      .then(() => {
        setCurrentUser((prevUser) => ({
          ...prevUser, // сохраняем предыдущие свойства пользователя
          ...{ name, email }, // обновляем только измененные свойства из data
        }));
        setInputProfileChanges(false);
        setEditInputProfileActive(!editInputProfileActive);
        setInfoTooltipOpen(true);
        setTooltip({ message: "Изменения сохранены!" });
      })
      .catch((error) => {
        if (error === 409) {
          setErrorServer("Пользователь с таким email уже существует");
        } else if (error === 400) {
          setErrorServer("Переданы некорректные данные при обновлении профиля");
        } else {
          setErrorServer("На сервере произошла ошибка");
        }
        console.log(`Ошибка: ${error}`);
      })
      .finally(() => {
        setDisabled(false);
      });
  };

  // Добавление фильма в раздел "сохраненные фильмы"
  function handleSaveMovies(movie) {
    const movieData = {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `${Movie_URL}${movie.image.url}`,
      trailerLink: movie.trailerLink,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: `${Movie_URL}${movie.image.url}`,
      movieId: movie.id,
    };
    setDisabled(true);
    mainApi
      .saveMovies(movieData)
      .then((saveMovies) => {
        setSaveMovies((prev) => [...prev, saveMovies]);
      })
      .catch((error) => {
        if (error === 401) {
          setCurrentUser(null);
          setLoggedIn(false);
          localStorage.clear();
          return;
        }
        setInfoTooltipOpen(true);
        setErrorServer("Ошибка при сохранении фильма");
        setTooltip({ message: `${errorServer}` });
        console.log(`Ошибка: ${error}`);
      })
      .finally(() => {
        setDisabled(false);
      });
  }

  // Закрытие попапа с сообщением
  const closeAllPopups = () => {
    setInfoTooltipOpen(false);
  };

  // Удаление фильма из раздела "сохраненные фильмы"
  function handleDeleteMovie(movie) {
    const movieId = saveMovies.find(
      (saveMovie) => saveMovie.movieId === movie.id
    );
    setDisabled(true);

    mainApi
      .deleteMovie(movie._id || movieId._id)
      .then((res) => {
        setSaveMovies((presSavedMovies) =>
          presSavedMovies.filter((saveMovie) => saveMovie._id !== res._id)
        );
      })
      .catch((error) => {
        if (error === 401) {
          setCurrentUser(null);
          setLoggedIn(false);
          localStorage.clear();
          return;
        }
        console.log(`Ошибка: ${error}`);
      })
      .finally(() => {
        setDisabled(false);
      });
  }

  // Сброс ошибок
  React.useEffect(() => {
    setErrorServer("");
    setErrorFront("");
    setEditInputProfileActive(false);
  }, [location]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="pages">
        {["/", "/movies", "/saved-movies", "/profile"].includes(
          location.pathname
        ) && <Header loggedIn={loggedIn} />}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/movies"
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={Movies}
                preloader={preloader}
                errorServer={errorServer}
                setErrorServer={setErrorServer}
                errorFront={errorFront}
                setErrorFront={setErrorFront}
                isSearch={isSearch}
                setSearch={setSearch}
                disabled={disabled}
                movies={movies}
                saveMovies={saveMovies}
                setSaveMovies={setSaveMovies}
                handleSaveMovies={handleSaveMovies}
                handleDeleteMovie={handleDeleteMovie}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={SavedMovies}
                saveMovies={saveMovies}
                setSaveMovies={setSaveMovies}
                handleSaveMovies={handleSaveMovies}
                isSearch={isSearch}
                disabled={disabled}
                setSearch={setSearch}
                errorFront={errorFront}
                setErrorFront={setErrorFront}
                handleDeleteMovie={handleDeleteMovie}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={Profile}
                handleEditProfile={handleEditProfile}
                onSignOut={handleSignOut}
                editInputProfileActive={editInputProfileActive}
                setEditInputProfileActive={setEditInputProfileActive}
                setInputProfileChanges={setInputProfileChanges}
                isInputProfileChanges={isInputProfileChanges}
                disabled={disabled}
                setErrorServer={setErrorServer}
                errorServer={errorServer}
                errorFront={errorFront}
                setErrorFront={setErrorFront}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                isRegisterUser={isRegisterUser}
                setErrorServer={setErrorServer}
                errorServer={errorServer}
                disabled={disabled}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                onLogin={handleLogin}
                setErrorServer={setErrorServer}
                disabled={disabled}
                errorServer={errorServer}
              />
            }
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          tooltip={tooltip}
          errorServer={errorServer}
        />
        {["/", "/movies", "/saved-movies"].includes(location.pathname) && (
          <Footer />
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
