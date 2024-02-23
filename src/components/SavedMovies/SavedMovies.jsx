import React from 'react';
import SearchForm from '../Movies/SearchForm/SerachForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


const SavedMovies = () => {
  return (
    <section className="movies">
      <SearchForm/>
      <MoviesCardList/>x
    </section>
  );
};

export default SavedMovies;