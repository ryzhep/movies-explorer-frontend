import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { mainApi } from "../../utils/MainApi";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import PageNotFound from "../PageNotFound/PageNotFound";
import SavedMovies from "../SavedMovies/SavedMovies";
import { register, login, token } from "../../utils/auth";
import { useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRouteElement from "../ProtectedRouteElement/ProtectedRouteElement";

function App() {
  const [currentUser, setCurrentUser] = React.useState({ email: "", name: "" });
  const navigate = useNavigate();
  const auth = localStorage.getItem("auth");
  const [loggedIn, setLoggedIn] = React.useState(auth); // Пользователь авторизован
  const [errorServer, setErrorServer] = React.useState(""); // Сообщение об ошибке на стороне бэка
  const [disabled, setDisabled] = React.useState(false); // Неактивная кнопка
  // обрабатывает процесс аутентификации пользователя
  // сохраняет токен и данные в локальном хранилище
  // устанавливая флаги состояний и осуществляя переход
  // Авторизация пользователя
  const handleLogin = ({ email, password }) => {
    login({ email, password })
      .then((data) => {
        console.log("token");
        localStorage.setItem("auth", true);
        localStorage.setItem("jwt", token);
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
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("auth", true);
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

  // Редактирование данных пользователя
  const handleEditProfile = (newData) => {
    mainApi
      .editUserInfo(newData)
      .then((data) => {
        setCurrentUser(data.data);
      })
      .finally(() => {
        console.log("редактирование не вышло");
      });
  };

  const location = useLocation();
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="pages">
        {["/", "/movies", "/saved-movies", "/profile"].includes(
          location.pathname
        ) && <Header loggedIn={loggedIn} />}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/signup"
            element={
              <Register
                isRegisterUser={isRegisterUser}
                setErrorServer={setErrorServer}
                errorServer={errorServer}
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
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement
                setErrorServer={setErrorServer}
                loggedIn={loggedIn}
                element={Profile}
                handleEditProfile={handleEditProfile}
              />
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRouteElement loggedIn={loggedIn} element={Movies} />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={SavedMovies}
              />
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        {["/", "/movies", "/saved-movies"].includes(location.pathname) && (
          <Footer />
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
