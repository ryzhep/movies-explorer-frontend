import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
function Register() {
  return (
    <section className="form-auth">
      <Link to="/">
        <img className="form-auth__logo" alt="логотип" src={logo} />
      </Link>
      <p className="form-auth__title">Добро пожаловать!</p>
      <form className="form-auth__container" noValidate>
        <div className="form-auth__cell">
          <span htmlFor="name" className="form-auth__subtitle">
            Имя
          </span>
        </div>
        <input className="form-auth__input" placeholder="Введите имя" required/>
        <div className="form-auth__cell">
          <span htmlFor="email" className="form-auth__subtitle">
            E-mail
          </span>
          </div>
          <input className="form-auth__input" placeholder="Введите Email" required/>

        <div className="form-auth__cell">
          <span htmlFor="password" className="form-auth__subtitle">
            Пароль
          </span>
          </div>
          <input className="form-auth__input" placeholder="Введите пароль" required/>

        <div className="form-auth__error-container">
          <button className="form-auth__button">Зарегистрироваться</button>
          <p className="form-auth__question">
            Уже зарегистрированы?
            <Link to="/signin" className="form-auth__link">
              {" "}
              Войти
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}

export default Register;
