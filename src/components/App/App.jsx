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
      .finally(() => {
        console.log("йоу");
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
    register({ name, email, password })
      .then(() => {
        return login({ email, password });
      })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("auth", true);
        navigate("/movies", { replace: true });
        setCurrentUser(data);
      })
      .finally(() => {
        console.log("fff");
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
            element={<Register isRegisterUser={isRegisterUser} />}
          />
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={Profile}
                handleEditProfile={handleEditProfile}
              />
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRouteElement 
                loggedIn={loggedIn} 
                element={Movies} />
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
