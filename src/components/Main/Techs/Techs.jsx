function Techs() {
    return (
      <section className="techs" id="techs">
        <div className="techs__container">
          <h2 className="techs__title">Технологии</h2>
          <div className="techs__content">
            <h3 className="techs__subtitle">7 технологий</h3>
            <p className="techs__info">
            На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
            </p>
          </div>
          <ul className="techs__description">
            <li className="techs__name">HTML</li>
            <li className="techs__name">CSS</li>
            <li className="techs__name">JS</li>
            <li className="techs__name">React</li>
            <li className="techs__name">Git</li>
            <li className="techs__name">Express.js</li>
            <li className="techs__name">mongoDB</li>
          </ul>
        </div>
      </section>
    );
  }
  
  export default Techs;