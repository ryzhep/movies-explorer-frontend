import SearchForm from '../Movies/SearchForm/SerachForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


const Movies = () => {
  return (
    <section className="movies">
      <SearchForm/>
      <MoviesCardList/>
    </section>
  );
};

export default Movies;