import MoviesCard from "../MoviesCard/MoviesCard";
import MoreMovies from "../Movies/MoreMovies/MoreMovies";
import { useLocation } from "react-router-dom";

function MoviesCardList() {
  const location = useLocation();
  return (
    <section className="movie-card-list">
      <MoviesCard />
      {location.pathname === "/movies" && <MoreMovies />}
    </section>
  );
}
export default MoviesCardList;
