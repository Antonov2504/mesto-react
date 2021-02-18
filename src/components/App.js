import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import avatarDefault from './../images/profile__avatar.svg';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);                       // Стейт попап редактирования профиля открыт
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);                             // Стейт попап добавить карточку открыт
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);                         // Стейт попап редактирования аватара открыт
  const [selectedCard, setSelectedCard] = useState(null);                                            // Стейт выбранная карточка для передачи картинки карточки в попап
  const [currentUser, setCurrentUser] = useState({ name: '', about: '', avatar: avatarDefault });    // Стейт данные текущего пользователя

  // Обработчик клика по аватару
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  // Обработчик клика по кнопке редактирования профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  // Обработчик клика по кнопке добавить карточку
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  // Функция закрытия всех попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  // Обработчик клика по картинке карточки
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(userInfo) {
    api.editProfile(userInfo)
      .then(data => {
        setCurrentUser({ ...data });
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleUpdateAvatar({ avatar }) {
    api.updateAvatar(avatar)
      .then(data => {
        setCurrentUser({ ...data });
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  // Добавить/удалить слушателя нажатия Esc при открытии попапа
  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      };
    }

    (isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || selectedCard) && document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, selectedCard]);

  // Загрузка данных пользователя
  useEffect(() => {
    api.getUserInfo()
      .then(data => {
        setCurrentUser({ ...data });
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />
        <Footer />

        {/* <!-- Попап редактировать профиль --> */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        {/* <!-- Попап добавить карточку --> */}
        <PopupWithForm
          isOpened={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          name="add-card"
          title="Новое место"
        >
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
        </PopupWithForm>
        {/* <!-- Попап картинка --> */}
        <ImagePopup
          onClose={closeAllPopups}
          card={selectedCard}
        />
        {/* <!-- Попап удаления карточки --> */}
        <PopupWithForm
          onClose={closeAllPopups}
          name="delete-card"
          title="Вы уверены?"
        >
          <button type="button" className="button button_type_submit">Нет</button>
        </PopupWithForm>

        {/* <!-- Попап обновить аватар --> */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
