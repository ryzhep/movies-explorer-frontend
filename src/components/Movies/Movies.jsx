import React from "react";
import { useState, useEffect } from "react";
import { moviesApi } from "../../utils/MoviesApi";
import { filterShotCheckBox } from "../../utils/constants.js";

import SearchForm from "../Movies/SearchForm/SerachForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

const Movies = () => {

  const [movieDisplay, setMovieDisplay] = useState([]); // Фильмы на странице
  //Mы обновляем состояние movieDisplay с помощью метода setMovieDisplay, который передает фильмы полученные из API.
  const [isMoviesCheckbox, setIsMoviesCheckbox] = React.useState(
    () => JSON.parse(localStorage.getItem("isShortMovies")) === true
  ); //чекбокс

// переключение чекбокса
  function handleCheckbox() {
    setIsMoviesCheckbox(!isMoviesCheckbox); 
  }

  // Отслеживание изменений чекбокса и сохранение в локальное хранилище
  React.useEffect(() => {
    localStorage.setItem("isShortMovies", JSON.stringify(isMoviesCheckbox));
  }, [isMoviesCheckbox]);

// запрос к апи
  useEffect(() => {
    moviesApi
      .getMoviesAll()
      .then((movies) => {
        setMovieDisplay(movies); // Обновление состояния с полученными фильмами
      })
      .catch((error) => {
        console.error("Произошла ошибка при загрузке фильмов:", error);
      });
  }, []);

  const filteredMovies = isMoviesCheckbox
    ? filterShotCheckBox(movieDisplay) // Применяем функцию фильтрации короткометражных фильмов
    : movieDisplay; // Если чекбокс не выбран, отображаем все фильмы

  console.log(filteredMovies);
  return (
    <section className="movies">
      <SearchForm
        setIsMoviesCheckbox={setIsMoviesCheckbox}
        isMoviesCheckbox={isMoviesCheckbox}
        onChange={handleCheckbox}
      />
      <MoviesCardList movies={filteredMovies} />
    </section>
  );
};

export default Movies;
