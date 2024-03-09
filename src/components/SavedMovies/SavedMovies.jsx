import React from "react";
import SearchForm from "../Movies/SearchForm/SerachForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { filterShotCheckBox, filterAllMovies } from "../../utils/constants.js";

const SavedMovies = ({
  handleSaveMovie,
  saveMovies,
  isSearch,
  setSearch,
  errorFront,
  setErrorFront,
  disabled,
}) => {
  const [showMovies, setShowMovies] = React.useState(saveMovies); // Фильмы
  const [isMoviesCheckbox, setIsMoviesCheckbox] = React.useState(false); // Короткометражки

  // Фильтр сохраненных фильмов
  React.useEffect(() => {
    const filterSaveMovies = () => {
      let filterRequestMovies;
      filterRequestMovies = filterAllMovies(isSearch, saveMovies);

      // Фильтр короткометражек
      if (isMoviesCheckbox) {
        filterRequestMovies = filterShotCheckBox(filterRequestMovies);
      }
      return filterRequestMovies;
    };

    setShowMovies(filterSaveMovies);
  }, [isSearch, saveMovies, isMoviesCheckbox]);

  //Очистка поиска
  React.useEffect(() => {
    setSearch("");
  }, []);

  return (
    <section className="movies">
      <SearchForm
        isMoviesCheckbox={isMoviesCheckbox}
        setIsMoviesCheckbox={setIsMoviesCheckbox}
        isSearch={isSearch}
        setSearch={setSearch}
        errorFront={errorFront}
        setErrorFront={setErrorFront}
      />
       {(isSearch && showMovies.length === 0) || (isMoviesCheckbox && showMovies.length === 0) ? (
        <p className="movies__not-found">{`${errorFront ? errorFront : 'Ничего не найдено'}`}</p>
      ) : (
        showMovies.length > 0 && (
          <MoviesCardList
            handleSaveMovie={handleSaveMovie}
            saveMovies={showMovies}
            disabled={disabled}       
          />
        )
      )}
    </section>
  );
}

export default SavedMovies;
