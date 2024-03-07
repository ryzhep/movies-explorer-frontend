import React from "react";
import { useState, useEffect } from "react";
import { moviesApi } from "../../utils/MoviesApi";
import { filterShotCheckBox, filterAllMovies } from "../../utils/constants.js";
import Preloader from "../Preloader/Preloader.js";

import SearchForm from "../Movies/SearchForm/SerachForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

const Movies = ({
  preloader,
  movies,
  isSearch,
  setSearch,
  errorFront,
  setErrorFront,
}) => {
  const [movieDisplay, setMovieDisplay] = useState([]); // Фильмы на странице
  //Mы обновляем состояние movieDisplay с помощью метода setMovieDisplay, который передает фильмы полученные из API.
  const [isMoviesCheckbox, setIsMoviesCheckbox] = React.useState(
    () => JSON.parse(localStorage.getItem("isShortMovies")) === true
  ); //чекбокс

  const [errorMovies, setErrorMovies] = React.useState(""); // Результат поиска
  // Фильмы полученные по поиску
  const [moviesSearch, setMoviesSearch] = React.useState([]);
  const [showShortMovies, setShowShortMovies] = React.useState([]);
  const [showMovies, setShowMovies] = React.useState(0); // Первое отображение карточек фильмов
  // переключение чекбокса
  function handleCheckbox() {
    setIsMoviesCheckbox(!isMoviesCheckbox);
  }
 // Отображение всех фильмов
 const isAllMoviesDisplayed =
 moviesSearch.length === movieDisplay.length || showShortMovies.length === movieDisplay.length;

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

  // Поиск по фильмам
  React.useEffect(() => {
    
    if (movies.length > 0) {
      const newFilterMovies = filterAllMovies(isSearch, movies);
      if (newFilterMovies.length > 0) {
        setMoviesSearch(newFilterMovies);
      } else if (isSearch && newFilterMovies.length === 0) {
        setMoviesSearch([]);
        setErrorMovies("Ничего не найдено");
      }
    }
  }, [isSearch, movies]);

  // Отображение карточек при разном разрешении экрана
  const handleScreenSize = () => {
    setShowMovies(
      window.innerWidth >= 980
        ? 12
        : window.innerWidth >= 768
        ? 9
        : window.innerWidth <= 767
        ? 8
        : window.innerWidth >= 320 && window.innerWidth <= 480
        ? 5
        : 0
    );
  };

  React.useEffect(() => {
    let resizeTimer;
    // Обработка изменения размера окна
    const handleScreenSizeWithTimeout = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        handleScreenSize();
      }, 800);
    };

    handleScreenSizeWithTimeout();
    if (isMoviesCheckbox) {
      // Фильтр короткометражек
      const filteredShortFilms = filterShotCheckBox(moviesSearch);
      setShowShortMovies(filteredShortFilms);
      setMovieDisplay(filteredShortFilms.slice(0, showMovies));
    } else {
      const displayedMoviesSlice =
        isSearch && moviesSearch.length > 0
          ? moviesSearch.slice(0, showMovies)
          : !isSearch
          ? movies.slice(0, showMovies)
          : [];
      setMovieDisplay(displayedMoviesSlice);
    }

    window.addEventListener('resize', handleScreenSizeWithTimeout);
    return () => {
      window.removeEventListener('resize', handleScreenSizeWithTimeout);
    };
  }, [showMovies, moviesSearch, movies, isSearch, isMoviesCheckbox]);


  console.log(filteredMovies);
  return (
    <section className="movies">
      <SearchForm
        isSearch={isSearch}
        setSearch={setSearch}
        errorFront={errorFront}
        setErrorFront={setErrorFront}
        setIsMoviesCheckbox={setIsMoviesCheckbox}
        isMoviesCheckbox={isMoviesCheckbox}
        onChange={handleCheckbox}
        isAllMoviesDisplayed={isAllMoviesDisplayed}
      />
      {preloader ? (
        <Preloader />
      ) : filteredMovies.length === 0 && movies && movies.length > 0 ? (
        <p className="movies__not-found">{errorMovies}</p>
      ) : (
        filteredMovies.length > 0 && (
          <MoviesCardList movies={filteredMovies} preloader={preloader} />
        )
      )}
    </section>
  );
};
export default Movies;
