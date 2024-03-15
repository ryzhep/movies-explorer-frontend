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
      <!-- Yandex.Metrika counter -->
<script type="text/javascript" >
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(39084735, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
   });
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/39084735" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->
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
