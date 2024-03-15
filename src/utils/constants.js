
import first from '../images/first.png';
import second from '../images/second.png';
import third from '../images/third.png';
import fourth from '../images/fourth.png';
import fifth from '../images/fifth.png';
import sixth from '../images/sixth.png';
import seventh from '../images/seventh.png';
import eighth from '../images/eighth.png';
import ninth from '../images/ninth.png';
import tenth from '../images/tenth.png';
import eleventh from '../images/eleventh.png';
import twelfth from '../images/twelfth.png';


export const Movies = [
    {
      name: "33 слова о дизайне",
      link: first,
      time: "1ч 17м",
    },
    {
      name: "Киноальманах «100 лет дизайна»",
      link: second,
      time: "1ч 17м",
    },
    {
      name: "В погоне за Бенкси",
      link: third,
      time: "1ч 17м",
    },
    {
      name: "Баския: Взрыв реальности",
      link: fourth,
      time: "1ч 17м"
    },
    {
      name: "Бег это свобода",
      link: fifth,
      time: "1ч 17м"
    },
    {
      name: "Книготорговцы",
      link: sixth,
      time: "1ч 17м"
    },
    {
      name: "Когда я думаю о Германии ночью",
      link: seventh,
      time: "1ч 17м"
    },
    {
      name: "Gimme Danger: История Игги и The Stooges",
      link: eighth,
      time: "1ч 17м"
    },
    {
      name: "Дженис: Маленькая девочка грустит",
      link: ninth,
      time: "1ч 17м"
    },
    {
      name: "Соберись перед прыжком",
      link: tenth,
      time: "1ч 17м"
    },
    {
      name: "Пи Джей Харви: A dog called money",
      link: eleventh,
      time: "1ч 17м"
    },
    {
      name: "Пи Джей Харви: A dog called money",
      link: twelfth,
      time: "1ч 17м"
    },
  ];

  export const Movie_URL = "https://api.nomoreparties.co/";


  export const filterShotCheckBox = (movies) => {
    return movies.filter((movie) => movie.duration <= 40);
  };

  export const filterAllMovies = (isSearch, movies) => {
    // Проверка, что movies является массивом перед использованием метода filter()
    if (!Array.isArray(movies)) {
      // Если movies не является массивом, вернуть пустой массив
      return [];
    }
  
    return movies.filter(
      (movie) =>
        movie.nameRU.toLowerCase().includes(isSearch.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(isSearch.toLowerCase())
    );
  };
  
  
