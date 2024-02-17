import React from 'react';
import { Link } from 'react-router-dom';

function NavTab() {
  return (
    <nav className="navTab-list">
      <Link className="navTab-list__link">
        О проекте
      </Link>
      <Link className="navTab-list__link">
        Технологии
      </Link>
      <Link className="navTab-list__link">
        Студент
      </Link>
    </nav>
  );
}

export default NavTab;