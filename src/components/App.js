import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
  }

  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        console.log('esc');
        closeAllPopups();
      };
    }

    (isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen) && document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen]);

  return (
    <div className="page__container">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
      />
      <Footer />

      {/* <!-- Попап редактировать профиль --> */}
      <PopupWithForm
        isOpened={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        name="edit-profile"
        title="Редактировать профиль"
        children={
          <>
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
          </>
        }
      />
      {/* <!-- Попап добавить карточку --> */}
      <PopupWithForm
        isOpened={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        name="add-card"
        title="Новое место"
        children={
          <>
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
          </>
        }
      />
      {/* <!-- Попап картинка --> */}
      <ImagePopup />
      {/* <!-- Попап удаления карточки --> */}
      <PopupWithForm
        name="delete-card"
        title="Вы уверены?"
        children={
          <>
            <button type="button" className="button button_type_submit">Нет</button>
          </>
        }
      />

      {/* <!-- Попап обновить аватар --> */}
      <PopupWithForm
        isOpened={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        name="update-avatar"
        title="Обновить аватар"
        children={
          <>
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
          </>
        }
      />
    </div>
  );
}

export default App;
