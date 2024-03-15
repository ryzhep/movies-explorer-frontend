import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import ProfileNav from "../ProfileNav/ProfileNav";
import BurgerMenu from "../BurgerMenu/BurgerMenu"
import logo from "../../images/logo.svg";


function Header(props) {
  const loggedIn = props.loggedIn;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  function handleBurgerMenuOpen() {
    setIsMenuOpen(true);
  }

  function handleBurgerMenuClose() {
    setIsMenuOpen(false);
  }

  return (
    <header className="header">
      <Link to="/" className="header__link">
        <img src={logo} alt="logo" className="header__logo"  />
      </Link>
      {loggedIn && (
        <div className="header__navigation">
          <Navigation />
        </div>
      )}
      {location.pathname === "/" && !loggedIn ? (
        <div className="header__sign">
          <Link className="header__signup" to="/signup">
            Регистрация
          </Link>
          <Link className="header__signin" to="/signin">
            <button className="header__signin-button" type="submit">
              Войти
            </button>
          </Link>
        </div>
      ) : (
        ""
      )}
      {loggedIn && (
        <div className="header__profile">
          <ProfileNav />
        </div>
      )}
      {loggedIn && (
        <button
          className="header__burger-button"
          onClick={handleBurgerMenuOpen}
        />
      )}
      <BurgerMenu
        isMenuOpen={isMenuOpen}
        handleBurgerMenuClose={handleBurgerMenuClose}
      />
    </header>
  );
}

export default Header;
