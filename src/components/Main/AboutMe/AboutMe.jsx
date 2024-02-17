import photo from '../../../images/photo.svg';

function AboutMe() {
  return (
    <section className="about-me">
      <div className="about-me__container">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__content">
          <div className="about-me__info">
            <h3 className="about-me__info-header">Виталий</h3>
            <h4 className="about-me__info-subheader">Фронтенд-разработчик, 30 лет</h4>
            <p className="about-me__info-description">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <a
              className="about-me__info-github"
              href="https://github.com/ryzhep"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </div>
          <img className="about-me__photo" src={photo} alt="фотография студента" />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;