import React from 'react';
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import { useValidation } from "../../utils/validation";

function Register({ isRegisterUser, setErrorServer, errorServer, disabled }) {
  const requiredInput = ["name", "email", "password"];
  const { values, handleChange, errors, isValid, resetForm} = useValidation({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = values;

  const isValidForm =
    isValid && requiredInput.every((data) => values[data] !== undefined);

  //сбрасывать значения формы
  React.useEffect(() => {
    resetForm();
  }, [resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValidForm) {
      isRegisterUser({ name, email, password });
      setErrorServer("");
    } else {
      setErrorServer("При регистрации пользователя произошла ошибка");
    }
    setErrorServer("");
  };

  return (
    <section className="form-auth">
      <Link to="/">
        <img className="form-auth__logo" alt="логотип" src={logo} />
      </Link>
      <p className="form-auth__title">Добро пожаловать!</p>
      <form className="form-auth__container" onSubmit={handleSubmit} noValidate>
        <div className="form-auth__cell">
          <span htmlFor="name" className="form-auth__subtitle">
            Имя
          </span>
        </div>
        <input
          className={`form-auth__input ${
            errors.name ? "form-auth__input_error" : "form-auth__input_valid"
          }`}
          placeholder="Введите имя"
          value={values.name || ""}
          required
          type="name"
          id="name"
          name="name"
          minLength="2"
          maxLength="200"
          onChange={handleChange}
        />
        <div className="form-auth__cell">
          <span htmlFor="email" className="form-auth__subtitle">
            E-mail
          </span>
        </div>
        <input
          className={`form-auth__input ${
            errors.email ? "form-auth__input_error" : "form-auth__input_valid"
          }`}
          type="email"
          id="email"
          name="email"
          minLength="2"
          maxLength="40"
          placeholder="Введите Email"
          value={values.email || ""}
          required
          onChange={handleChange}
        />

        <div className="form-auth__cell">
          <span htmlFor="password" className="form-auth__subtitle">
            Пароль
          </span>
          <input
            className={`form-auth__input ${
              errors.password
                ? "form-auth__input_error"
                : "form-auth__input_valid"
            }`}
            type="password"
            id="password"
            name="password"
            minLength="2"
            maxLength="200"
            placeholder="Введите пароль"
            required
            value={values.password || ""}
            onChange={handleChange}
          />
          <span className="form-auth__error-validate">{errors.password}</span>
        </div>
        <div className="form-auth__error-container">
          <span className="form-auth__error-message">{errorServer}</span>
          <button
            className={`form-auth__button ${!isValidForm || disabled}`}
            type="submit"
            disabled={!isValidForm || disabled}
          >
            Зарегистрироваться
          </button>
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
