import React from 'react';
import FilterChechbox from './FilterCheckbox/FilterCheckbox';

function SearchForm() {

  return (
    <form className="search-form" noValidate>
      <div className="search-form__row">
        <input
          name="search"
          className="search-form__input"
          placeholder="Фильм"
          type="search"
        />
        <button className="search-form__button" type="submit" />
       <span className="search-form__error"></span>
      </div>
      <FilterChechbox/>
    </form>
  );
}

export default SearchForm;