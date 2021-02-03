import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

function App() {
  return (
    <div className="page__container">
      <Header />
      <Main />
      <Footer />

      {/* <!-- Попап редактировать профиль --> */}
      <div className="popup popup_type_edit-profile">
        <div className="popup__container">
          <button type="button" className="button button_type_close-popup"></button>
          <form action="#" name="edit-profile" className="form" noValidate>
            <h2 className="popup__heading">Редактировать профиль</h2>
            <label className="form__field">
              <input type="text"
                name="profile-name"
                id="profile-name-input"
                placeholder="Имя"
                className="form__input form__input_el_profile-name"
                required
                minLength="2"
                maxLength="40"
                autoComplete="off" />
              <span className="form__input-error profile-name-input-error"></span>
            </label>
            <label className="form__field">
              <input type="text"
                name="profile-job"
                id="profile-job-input"
                placeholder="Вид деятельности"
                className="form__input form__input_el_profile-job"
                required
                minLength="2"
                maxLength="200"
                autoComplete="off" />
              <span className="form__input-error profile-job-input-error"></span>
            </label>
            <button type="submit" className="button button_type_submit">Сохранить</button>
          </form>
        </div>
      </div>
      {/* <!-- Попап добавить карточку --> */}
      <div className="popup popup_type_add-card">
        <div className="popup__container popup__container_size_middle">
          <button type="button" className="button button_type_close-popup"></button>
          <form action="#" name="add-card" className="form" noValidate>
            <h2 className="popup__heading popup__heading_type_add-card">Новое место</h2>
            <label className="form__field">
              <input type="text"
                name="card-name"
                id="card-name-input"
                className="form__input form__input_size_small form__input_el_card-name"
                placeholder="Название"
                required
                minLength="2"
                maxLength="30"
                autoComplete="off" />
              <span className="form__input-error card-name-input-error"></span>
            </label>
            <label className="form__field">
              <input type="url"
                name="card-link"
                id="card-link-input"
                className="form__input form__input_size_small form__input_el_card-link"
                placeholder="Ссылка на картинку"
                required
                autoComplete="off" />
              <span className="form__input-error card-link-input-error"></span>
            </label>
            <button type="submit" className="button button_type_submit">Создать</button>
          </form>
        </div>
      </div>
      {/* <!-- Попап картинка --> */}
      <div className="popup popup_type_show-card">
        <div className="popup__container popup__container_size_large">
          <button type="button" className="button button_type_close-popup"></button>
          <figure className="popup__figure">
            <img src="#" alt="#" className="popup__image" />
            <figcaption className="popup__caption"></figcaption>
          </figure>
        </div>
      </div>
      {/* <!-- Попап удаления карточки --> */}
      <div className="popup popup_type_delete-card">
        <div className="popup__container popup__container_size_content">
          <button type="button" className="button button_type_close-popup"></button>
          <h2 className="popup__heading">Вы уверены?</h2>
          <button type="button" className="button button_type_submit">Да</button>
        </div>
      </div>
      {/* <!-- Попап обновить аватар --> */}
      <div className="popup popup_type_update-avatar">
        <div className="popup__container popup__container_size_content">
          <button type="button" className="button button_type_close-popup"></button>
          <form action="#" name="update-avatar" className="form" noValidate>
            <h2 className="popup__heading">Обновить аватар</h2>
            <label className="form__field">
              <input type="url"
                name="avatar-link"
                id="avatar-link-input"
                className="form__input form__input_size_small form__input_el_avatar-link"
                placeholder="Ссылка на аватар"
                required
                autoComplete="off" />
              <span className="form__input-error avatar-link-input-error"></span>
            </label>
            <button type="submit" className="button button_type_submit">Сохранить</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
