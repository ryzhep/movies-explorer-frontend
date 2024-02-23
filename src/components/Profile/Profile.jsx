import React from "react";

function Profile() {
  return (
    <section className="profile">
      <p className="profile__title">Привет, Виталя!</p>
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
          />
          <span className="profile__error-validate">Что-то пошло не так</span>
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
