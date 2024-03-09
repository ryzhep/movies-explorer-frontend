import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { validName, validEmail } from '../../utils/validation';

function Profile({
  disabled,
  setEditInputProfileActive,
  editInputProfileActive,
  isInputProfileChanges,
  setInputProfileChanges,
  handleEditProfile,
  errorServer,
  setErrorServer,
  errorFront,
  setErrorFront
}) {
  const currentUser = useContext(CurrentUserContext);
  const [formProfile, setFormProfile] = useState({
    name: currentUser.name?.name || '',
    email: currentUser.email?.email || ''

  });
  const [errors, setErrors] = useState({ name: '', email: '' });

  const handleChange = event => {
    const { name, value } = event.target;

    setFormProfile({
      ...formProfile,
      [name]: value
    });

    const profileErrors = {
      ...errors,
      [name]: name === 'name' ? validName(value) : validEmail(value)
    };

    setErrors(profileErrors);

    // Проверка на наличие ошибок
    let hasInputErrors = false;
    for (let key in profileErrors) {
      if (profileErrors[key] !== '') {
        hasInputErrors = true;
        break;
      }
    }

    if (hasInputErrors) {
      setErrorFront('');
    }

    setErrorServer('');

    setInputProfileChanges(prevInfo => ({
      ...prevInfo,
      [name]: name === 'name' || name === 'email' ? value !== currentUser[name] : prevInfo[name]
    }));
  };

  // Проверка на наличие изменений
  const isProfileChange = Object.values(isInputProfileChanges).some(value => value);

  const handleSubmit = e => {
    e.preventDefault();

    // Сохранение ошибок валидации полей
    const profileErrors = {
      email: validEmail(formProfile.email),
      name: validName(formProfile.name)
    };

    setErrors(profileErrors);

    // Проверка на валидность
    const isFormValid =
      Object.values(profileErrors).every(error => error === '') &&
      Object.values(formProfile).every(value => value !== '');

    if (isFormValid) {
      handleEditProfile({ name: formProfile.name, email: formProfile.email });
      setErrorFront('');
      setErrorServer('');
    } else {
      setErrorFront('Во время обновления профиля произошла ошибка');
    }
  };

  // Переключение кнопки "редактировать"
  const buttonToggleEdit = () => {
    setEditInputProfileActive(!editInputProfileActive);
    setErrorFront('');
    setErrorServer('');
  };

  // Сохранение имени и эл.почты
  useEffect(() => {
    setFormProfile({
      name: currentUser.name,
      email: currentUser.email
    });
  }, [currentUser]);

  return (
    <section className="profile">
      <p className="profile__title">Привет, {currentUser.name}!</p>
      <form onSubmit={handleSubmit} className="profile__form" noValidate>
        <div className="profile__row">
          <label className="profile__subtitle">Имя</label>
          <input
            className="profile__input profile__input_line"
            type="text"
            id="name"
            placeholder="Введите Ваше имя"
            value={formProfile.name}
            name="name"
            minLength="2"
            maxLength="30"
            onChange={handleChange}
            disabled={!editInputProfileActive || disabled}
          />
          <span className="profile__error-validate">{errors.name}</span>
        </div>
        <div className="profile__row">
          <label className="profile__subtitle">E-mail</label>
          <input
            className="profile__input"
            type="email"
            id="email"
            placeholder="Введите Ваш email"
            value={formProfile.email}
            name="email"
            onChange={handleChange}
            disabled={!editInputProfileActive || disabled}
          />
          <span className="profile__error-validate">{errors.email}</span>
        </div>
        <span className="profile__error-server">{errorFront || errorServer}</span>
        {editInputProfileActive && (
          <button
            className={`profile__button ${
              (!isProfileChange || disabled) && 'profile__button_disabled'
            }`}
            type="submit"
            onClick={handleSubmit}
            disabled={!isProfileChange || disabled}
          >
            Сохранить
          </button>
        )}
      </form>
      {!editInputProfileActive && (
        <button onClick={buttonToggleEdit} className="profile__button">
          Редактировать
        </button>
      )}
      <button  className="profile__button-signout" type="submit">
        Выйти из аккаунта
      </button>
    </section>
  );
}

export default Profile;