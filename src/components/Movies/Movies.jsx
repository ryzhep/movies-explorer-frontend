import { useState, useEffect } from 'react';
import { moviesApi } from '../../utils/MoviesApi';


import SearchForm from '../Movies/SearchForm/SerachForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


const Movies = ({
  saveMovies,
  disabled,
  handleDeleteMovie,
  handleSaveMovies,
}) => {
  const [movieDisplay, setMovieDisplay] = useState([]); // Фильмы на странице
  useEffect(() => {
    moviesApi.getMoviesAll()
      .then((movies) => {
        setMovieDisplay(movies); // Обновление состояния с полученными фильмами
      })
      .catch((error) => {
        console.error('Произошла ошибка при загрузке фильмов:', error);
      });
  }, []);


  return (
    <section className="movies">
      <SearchForm/>
      <MoviesCardList
            movies={movieDisplay}
            disabled={disabled}
            handleSaveMovies={handleSaveMovies}
            handleDeleteMovie={handleDeleteMovie}
            saveMovies={saveMovies}
          />
    </section>
  );
};

export default Movies;