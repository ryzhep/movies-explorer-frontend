import React from 'react';
import { Movies } from "../../utils/constans";

function MoviesCard() {

  return (
    <div className="movie-card-list__container">
      {Movies.map((movie, index) => (
        <article className="movie-card" key={index}>
          <a href={movie.link} className="movie-card__link" rel="noreferrer" target="_blank">
            <img
              name="image"
              className="movie-card__image"
              src={movie.link}
              alt={movie.name}
            />
          </a>
          <button className="movie-card__button-save" />    
          <div className="movie-card__wrap">
            <h2 className="movie-card__title">{movie.name}</h2>
            <p className="movie-card__times">{movie.time}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export default MoviesCard;
