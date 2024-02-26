import { useState, useEffect } from 'react';
import { moviesApi } from '../../utils/MoviesApi';


import SearchForm from '../Movies/SearchForm/SerachForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


const Movies = () => {
  const [movieDisplay, setMovieDisplay] = useState([]); // Фильмы на странице
  //Mы обновляем состояние movieDisplay с помощью метода setMovieDisplay, который передает фильмы полученные из API.

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
          />
    </section>
  );
};

export default Movies;