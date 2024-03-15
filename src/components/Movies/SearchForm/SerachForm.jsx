import FilterChechbox from "./FilterCheckbox/FilterCheckbox";

function SearchForm({
  isSearch,
  setSearch,
  isMoviesCheckbox,
  setIsMoviesCheckbox,
  errorFront,
  setErrorFront,
}) {
  function handleCheckbox() {
    setIsMoviesCheckbox(!isMoviesCheckbox);
  }

  const handleChange = (event) => {
    const { value } = event.target;
    setSearch(value);
    setErrorFront("");
  };
  
  const handleSubmit = event => {
    event.preventDefault();

    if (!isSearch) {
      setErrorFront('Нужно ввести ключевое слово');
      localStorage.removeItem('isSearch');
      localStorage.removeItem('moviesSearch');
    } else {
      setErrorFront('');
    }
  };
  return (
    <form className="search-form" onSubmit={handleSubmit} noValidate>
      <div className="search-form__row">
        <input
          name="search"
          className="search-form__input"
          placeholder="Фильм"
          type="search"
          value={isSearch}
          required
          maxLength="50"
          onChange={handleChange}
        />
        <button className="search-form__button" type="submit" onSubmit={handleSubmit}/>
        <span className="search-form__error">{errorFront}</span>
      </div>
      <FilterChechbox
        handleCheckbox={handleCheckbox}
        isMoviesCheckbox={isMoviesCheckbox}
      />
    </form>
  );
}

export default SearchForm;
