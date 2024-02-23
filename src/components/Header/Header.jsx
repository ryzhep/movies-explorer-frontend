import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation";
import ProfileNav from '../ProfileNav/ProfileNav';
import BurgerMenu from "../BurgerMenu/BurgerMenu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  function handleBurgerMenuOpen() {
    setIsMenuOpen(true);
  }

  function handleBurgerMenuClose() {
    setIsMenuOpen(false);
  }

  const location = useLocation();
  return (
    <header className="header">
      <Link to="/" className="header__link">
        <img src={logo} className="header__logo" alt="logo" />
      </Link>
      {(location.pathname === "/movies" ||
        location.pathname === "/profile" ||
        location.pathname === "/saved-movies") && (
        <div className="header__navigation">
          <Navigation />
        </div>
      )}
      {location.pathname === "/" && (
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
      )}
      {(location.pathname === "/movies" ||
        location.pathname === "/profile" ||
        location.pathname === "/saved-movies") && (
        <div className="header__profile">
          <ProfileNav />
        </div>
      )}
    
            {(location.pathname === "/movies" ||
        location.pathname === "/profile" ||
        location.pathname === "/saved-movies") && <button className="header__burger-button" onClick={handleBurgerMenuOpen} />}
      <BurgerMenu isMenuOpen={isMenuOpen} handleBurgerMenuClose={handleBurgerMenuClose} />
    </header>
  );
};

export default Header;
