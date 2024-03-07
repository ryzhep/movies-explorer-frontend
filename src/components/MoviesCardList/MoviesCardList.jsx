import { useLocation } from "react-router-dom";
import MoreMovies from "../../components/Movies/MoreMovies/MoreMovies";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies, loadMore}) {
  const location = useLocation();
  return (
    <section className="movies-card-list">
      <div className="movies-card-list__container">
        {location.pathname === "/movies"}{" "}
        {movies.map((movie) => (
          <MoviesCard key={movie.id} movie={movie} />
        ))}
      </div>
      {location.pathname === "/movies" && <MoreMovies loadMore={loadMore}/>}
    </section>
  );
}

export default MoviesCardList;
