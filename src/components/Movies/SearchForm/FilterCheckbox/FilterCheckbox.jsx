function FilterChechbox({ isMoviesCheckbox, handleCheckbox }) {
  return (
    <div className="checkbox">
      <input
        className="checkbox__input"
        type="checkbox"
        id="checkbox"
        checked={isMoviesCheckbox}
        onChange={handleCheckbox}
      />
      <label className="checkbox__text" htmlFor="filter-checkbox">
        Короткометражки
      </label>
    </div>
  );
}

export default FilterChechbox;