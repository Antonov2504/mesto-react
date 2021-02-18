import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__about">
          <div className="profile__avatar" onClick={onEditAvatar}>
            <img src={currentUser.avatar} alt={currentUser.name} className="profile__avatar-img" />
          </div>
          <div className="profile__description">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button type="button" className="button button_type_edit-profile" onClick={onEditProfile}></button>
            <p className="profile__job">{currentUser.about}</p>
          </div>
        </div>
        <button type="button" className="button button_type_add-card" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="cards">
          {cards.map(card => (
            <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
