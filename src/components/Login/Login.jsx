import React, { } from 'react';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <section className="form-auth">
      <Link to="/">
        <img className="form-auth__logo" alt="логотип" src={logo} />
      </Link>
      <p className="form-auth__title">Рады видеть!</p>
      <form className="form-auth__container" >
        <div className="form-auth__cell">
          <span className="form-auth__subtitle">E-mail</span>
          <input
            className="form-auth__input"
            placeholder="Введите Email"
            required
          />
             <span className="form-auth__error-validate"></span>
        </div>
        <div className="form-auth__cell">
          <span className="form-auth__subtitle">Пароль</span>
          <input
            className="form-auth__input"
            placeholder="Введите пароль"
          />
        </div>
        <div className="form-auth__error-container">
          <button
            className="form-auth__button"
            type="submit"
          >
            Войти
          </button>
          <p className="form-auth__question">
            Еще не зарегистрированы?
            <Link to="/signup" className="form-auth__link">
              {' '}
              Регистрация
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}

export default Login;