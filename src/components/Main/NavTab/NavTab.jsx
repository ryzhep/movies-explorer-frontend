import React from 'react';
import { Link as ScrollLink } from 'react-scroll';

function NavTab() {
  return (
    <nav className="navTab-list">
      <ScrollLink className="navTab-list__link" to="about-project">
        О проекте
      </ScrollLink>
      <ScrollLink className="navTab-list__link" to="techs">
        Технологии
      </ScrollLink>
      <ScrollLink className="navTab-list__link" to="about-me">
        Студент
      </ScrollLink>
    </nav>
  );
}

export default NavTab;