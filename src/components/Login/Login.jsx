import  { useEffect } from "react";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { useValidation } from "../../utils/validation";

function Login({ onLogin, setErrorServer, errorServer, disabled }) {
  const requiredInput = ["email", "password"];

  // пустые начальные значения
  const { values, handleChange, errors, isValid, resetForm } = useValidation({
    email: "",
    password: "",
  });

  const { email, password } = values;
  const isValidForm =
    isValid && requiredInput.every((data) => values[data] !== undefined);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidForm) {
      onLogin({ email, password });
      setErrorServer("");
    } else if (!values.email || !values.password) {
      setErrorServer("Не верный логин или пароль");
    }
    setErrorServer("");
  };

  // очистка формы
  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <section className="form-auth">
      <Link to="/">
        <img className="form-auth__logo" alt="логотип" src={logo} />
      </Link>
      <p className="form-auth__title">Рады видеть!</p>
      <form className="form-auth__container" onSubmit={handleSubmit}>
        <div className="form-auth__cell">
          <span className="form-auth__subtitle">E-mail</span>
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
            onChange={handleChange}
            required
          />
          <span className="form-auth__error-validate">{errors.email}</span>
        </div>
        <div className="form-auth__cell">
          <span className="form-auth__subtitle">Пароль</span>
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
            value={values.password || ""}
            onChange={handleChange}
            required
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
            Войти
          </button>
          <p className="form-auth__question">
            Еще не зарегистрированы?
            <Link to="/signup" className="form-auth__link">
              {" "}
              Регистрация
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}

export default Login;
