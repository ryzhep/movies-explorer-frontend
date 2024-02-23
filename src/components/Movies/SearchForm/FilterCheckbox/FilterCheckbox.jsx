import React from 'react';

function FilterChechbox() {
  return (
    <div className="checkbox">
      <input
        className="checkbox__input"
        type="checkbox"
        id="checkbox"
      />
      <label className="checkbox__text" htmlFor="filter-checkbox">
        Короткометражки
      </label>
    </div>
  );
}

export default FilterChechbox;