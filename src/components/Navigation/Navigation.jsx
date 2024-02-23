import { NavLink } from "react-router-dom";

function Navigation() {
  const setActiveMovie = ({ isActive }) =>
    `navigation__link ${isActive ? "navigation__link_active" : ""}`;
  const setActiveMain = ({ isActive }) =>
    `navigation__link navigation__link_hidden ${
      isActive ? "navigation__link_active" : ""
    }`;
  return (
    <nav className="navigation">
      <NavLink to="/" className={setActiveMain}>
        Главная
      </NavLink>
      <NavLink to="/movies" className={setActiveMovie}>
        Фильмы
      </NavLink>
      <NavLink to="/saved-movies" className={setActiveMovie}>
        Сохраненные фильмы
      </NavLink>
    </nav>
  );
}

export default Navigation;
