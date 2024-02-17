import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

const Header = () =>  {

  return (
    <header className="header">
      <Link to="/" className="header__link">
        <img src={logo} className="header__logo" alt="logo" />
      </Link>
      <div className="header__sign">
      <Link className="header__signup" to="/signup">
            Регистрация
          </Link>
          <Link className="header__signin" to="/signin">
            <button type="submit" className="header__signin-button">
              Войти
            </button>
          </Link>
        </div>
    </header>

  );
}

export default Header;