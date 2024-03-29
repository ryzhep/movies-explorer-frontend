import { useLocation } from "react-router-dom";
import { Movie_URL } from "../../utils/constants";

function MoviesCard({ movie, saveMovies, handleSaveMovies, disabled, handleDeleteMovie }) {
  const location = useLocation();

  const saveMovieBtn = Array.isArray(saveMovies) && saveMovies.some(
    (savedMovie) => savedMovie.movieId === movie.id
  );


  const handleSavedMovieBtn = () => {
    if (!saveMovieBtn) {
      return handleSaveMovies(movie);
    }
    return handleDelete(movie);
  };

  const handleDelete = () => {
    handleDeleteMovie(movie);
  };

  return (
    <article className="movie-card">
      <a href={movie.trailerLink} className="movie-card__link" rel="noreferrer" target="_blank">
        <img
          name="image"
          className="movie-card__image"
          src={movie.image.url ? `${Movie_URL}${movie.image.url}` : movie.image}
          alt={movie.nameRU}
        />
      </a>
      {location.pathname === '/movies' && (
        <button
          className={`movie-card__button-save ${
            saveMovieBtn ? 'movie-card__button-save_active' : ''
          }`}
          disabled={disabled}
          onClick={handleSavedMovieBtn}
        />
      )}
      {location.pathname === '/saved-movies' && (
        <button
          className="movie-card__button-save movie-card__button-save_delete"
          disabled={disabled}
          onClick={handleDelete}
        />
      )}

      <div className="movie-card__wrap">
        <h2 className="movie-card__title">{movie.nameRU}</h2>
        <p className="movie-card__times">
          {`${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`}
        </p>
      </div>
    </article>
  );
}

export default MoviesCard;