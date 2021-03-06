import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmationPopup from './ConfirmationPopup';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import avatarDefault from './../images/profile__avatar.svg';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);                       // Стейт попап редактирования профиля открыт
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);                             // Стейт попап добавить карточку открыт
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);                         // Стейт попап редактирования аватара открыт
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);                     // Стейт попап подтверждения удаления карточки открыт
  const [selectedCard, setSelectedCard] = useState(null);                                            // Стейт выбранная карточка для передачи картинки карточки в попап
  const [deletedCard, setDeletedCard] = useState(null);                                              // Стейт выбранная карточка для удаления
  const [currentUser, setCurrentUser] = useState({                                                   // Стейт данные текущего пользователя
    name: '',
    about: '',
    avatar: avatarDefault
  });
  const [cards, setCards] = useState([]);                                                            // Стейт массив карточек
  const [isLoadingCards, setIsLoadingCards] = useState(true);                                        // Стейт прелоадер загрузки карточек
  const [isLoadingUserInfo, setIsLoadingUserInfo] = useState(true);                                  // Стейт прелоадер загрузки информации пользователя
  const [isLoadingButtonText, setIsLoadingButtonText] = useState(false);                              // Стейт надпись на кнопке при сохранении контента

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

  // Обработчик клика по кнопке удалить карточку
  function handleCardDelete(card) {
    setIsConfirmationPopupOpen(true);
    setDeletedCard(card);
  }

  // Функция закрытия всех попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setSelectedCard(null);
  }

  // Обработчик клика по картинке карточки
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // Обработчик обновления информации пользователя
  function handleUpdateUser(userInfo) {
    setIsLoadingButtonText(true);
    api.editProfile(userInfo)
      .then(data => {
        setCurrentUser({ ...data });
        closeAllPopups();
        setIsLoadingButtonText(false);
      })
      .catch(err => console.log(err));
  }

  // Обработчик обновления аватара
  function handleUpdateAvatar({ avatar }) {
    setIsLoadingButtonText(true);
    api.updateAvatar(avatar)
      .then(data => {
        setCurrentUser({ ...data });
        closeAllPopups();
        setIsLoadingButtonText(false);
      })
      .catch(err => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        const newCards = cards.map(c => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch(err => console.log(err));
  }

  // Обработчик подтверждения удаления карточки
  function handleCardDeleteSubmit(cardId) {
    setIsLoadingButtonText(true);
    api.deleteCard(cardId)
      .then(() => {
        const newCards = cards.filter(c => c._id !== cardId);
        setCards(newCards);
        closeAllPopups();
        setIsLoadingButtonText(false);
      })
      .catch(err => console.log(err));
  }

  // Обработчик добавления карточки
  function handleAddPlaceSubmit(cardInfo) {
    setIsLoadingButtonText(true);
    api.addCard(cardInfo)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
        setIsLoadingButtonText(false);
      })
      .catch(err => console.log(err));
  }

  // Загрузка карточек по умолчанию
  useEffect(() => {
    api.getInitialCards()
      .then(initialCards => {
        setCards(initialCards);
        setIsLoadingCards(false);
      })
      .catch(err => console.log(err))
  }, []);

  // Добавить/удалить слушателя нажатия Esc при открытии попапа
  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      };
    }

    (isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isConfirmationPopupOpen || selectedCard) && document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, isConfirmationPopupOpen, selectedCard]);

  // Загрузка данных пользователя
  useEffect(() => {
    api.getUserInfo()
      .then(data => {
        setCurrentUser({ ...data });
        setIsLoadingUserInfo(false);
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
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
          isLoadingCards={isLoadingCards}
          isLoadingUserInfo={isLoadingUserInfo}
        />
        <Footer />
        {/* <!-- Попап редактировать профиль --> */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoadingButtonText={isLoadingButtonText}
        />
        {/* <!-- Попап добавить карточку --> */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoadingButtonText={isLoadingButtonText}
        />
        {/* <!-- Попап картинка --> */}
        <ImagePopup
          onClose={closeAllPopups}
          card={selectedCard}
        />
        {/* <!-- Попап удаления карточки --> */}
        <ConfirmationPopup
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDeleteSubmit}
          card={deletedCard}
          isLoadingButtonText={isLoadingButtonText}
        />

        {/* <!-- Попап обновить аватар --> */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoadingButtonText={isLoadingButtonText}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
