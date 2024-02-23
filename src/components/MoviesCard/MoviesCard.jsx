import React, { useState } from "react";
import { Movies } from "../../utils/constans";
import { useLocation } from "react-router-dom";

function MoviesCard() {
  const location = useLocation();
  //хранить информацию об активности кнопкиюзначальное значение состояния устанавливается в массив из Movies.length элементов, заполненных значением false.
  //При этом используется деструктуризация массива, чтобы инициализировать состояние activeButtons.
  const [activeButtons, setActiveButtons] = useState(
    Array(Movies.length).fill(false)
  );

  //обновляет соответствующее состояние для каждой карточки.
  //При вызове функции с индексом карточки index, она создает копию массива состояния activeButtons, меняет значение элемента с соответствующим индексом на противоположное и устанавливает обновленный массив
  const handleSaveButtonClick = (index) => {
    const updatedButtons = [...activeButtons];
    updatedButtons[index] = !updatedButtons[index];
    setActiveButtons(updatedButtons);
  };

  return (
    <div className="movie-card-list__container">
      {Movies.map((movie, index) => (
        <article className="movie-card" key={index}>
          <a
            href={movie.link}
            className="movie-card__link"
            rel="noreferrer"
            target="_blank"
          >
            <img
              name="image"
              className="movie-card__image"
              src={movie.link}
              alt={movie.name}
            />
          </a>
          {location.pathname === "/movies" && (
            <button
              className={`movie-card__button-save ${
                activeButtons[index] ? "movie-card__button-save_active" : ""
              }`}
              onClick={() => handleSaveButtonClick(index)}
            />
          )}
          {location.pathname === "/saved-movies" && (
            <button className="movie-card__button-save movie-card__button-save_delete" />
          )}
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
