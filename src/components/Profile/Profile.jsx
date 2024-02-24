import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile() {
  const currentUser = useContext(CurrentUserContext);
  const [formProfile, setFormProfile] = useState({
    name: currentUser.name,
    email: currentUser.email
  });
  // Сохранение имени и эл.почты
  useEffect(() => {
    setFormProfile({
      name: currentUser.name,
      email: currentUser.email
    });
  }, [currentUser]);

  const handleChange = event => {
    const { name, value } = event.target;

    setFormProfile({
      ...formProfile,
      [name]: value
    });
  }

  return (
    <section className="profile">
      <p className="profile__title">Привет, Виталий!</p>
      <form className="profile__form" noValidate>
        <div className="profile__row">
          <label className="profile__subtitle">Имя</label>
          <input
            className="profile__input profile__input_line"
            type="text"
            placeholder="Введите Ваше имя"
            name="name"
            minLength="2"
            maxLength="30"
            onChange={handleChange}
            value={formProfile.name}
            required
          />
          <span className="profile__error-validate"></span>
        </div>
        <div className="profile__row">
          <label className="profile__subtitle">E-mail</label>
          <input
            className="profile__input"
            type="email"
            placeholder="Введите Ваш email"
            name="email"
            value={formProfile.email}
            onChange={handleChange}
            required
          />
          <span className="profile__error-validate"></span>
        </div>
        <span className="profile__error-server"></span>
      </form>
        <button className="profile__button">
          Редактировать
        </button>
      <button
        className="profile__button-signout"
        type="submit"
      >
        Выйти из аккаунта
      </button>
    </section>
  );
}

export default Profile;
