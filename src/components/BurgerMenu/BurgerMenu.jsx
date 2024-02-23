import React from 'react';
import ProfileNav from '../ProfileNav/ProfileNav';
import Navigation from '../Navigation/Navigation';

function BurgerMenu(props) {
  return (
    <section className={`burger-menu ${props.isMenuOpen ? 'burger-menu_opened' : ''}`}>
      <div className="burger-menu__container">
        <button
          className="burger-menu__button-close"
          onClick={props.handleBurgerMenuClose}
        ></button>
        <Navigation handleBurgerMenuClose={props.handleBurgerMenuClose} />
        <div className="burger-menu__profile">
          <ProfileNav handleBurgerMenuClose={props.handleBurgerMenuClose} />
        </div>
      </div>
    </section>
  );
}

export default BurgerMenu;