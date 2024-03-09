import { useLocation } from "react-router-dom";
import MoreMovies from "../../components/Movies/MoreMovies/MoreMovies";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  movies,
  loadMore,
  saveMovies,
  handleSaveMovies,
  disabled,
}) {
  const location = useLocation();
  return (
    <section className="movies-card-list">
      <div className="movies-card-list__container">
        {location.pathname === "/movies"
          ? movies.map((movie) => (
              <MoviesCard
                key={movie.id}
                movie={movie}
                saveMovies={saveMovies}
                handleSaveMovies={handleSaveMovies}
                disabled={disabled}
              />
            ))
          : saveMovies.map((movie) => (
              <MoviesCard
                key={movie._id}
                movie={movie}
                saveMovies={saveMovies}
                handleSaveMovies={handleSaveMovies}
                disabled={disabled}
              />
            ))}
      </div>
      {location.pathname === "/movies"
        ?  <MoreMovies loadMore={loadMore} />
        : ""}
    </section>
  );
}

export default MoviesCardList;
