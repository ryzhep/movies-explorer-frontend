function Portfolio() {
    return (
      <section className="portfolio" >
        <div className="portfolio__container">
          <h2 className="portfolio__title">Портфолио</h2>
          <ul className="portfolio__content">
            <li className="portfolio__container">
              <a
                className="portfolio__site"
                href="/"
                target="_blank"
              >
                <span>Статичный сайт</span>
                <span className="portfolio__arrow">↗</span>
              </a>
            </li>
            <li className="portfolio__container">
              <a
                className="portfolio__site"
                href="/"
                target="_blank"
              >
                <span>Адаптивный сайт</span>
                <span className="portfolio__arrow">↗</span>
              </a>
            </li>
            <li className="portfolio__container">
              <a
                className="portfolio__site"
                href="/"
                target="_blank"
              >
                <span>Одностраничное приложение</span>
                <span className="portfolio__arrow">↗</span>
              </a>
            </li>
          </ul>
        </div>
      </section>
    );
  }
  
  export default Portfolio;