import React, { useState, useEffect, useContext } from 'react';
import Card from './Card';
import api from './../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const [cards, setCards] = useState([]);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    api.getInitialCards()
      .then(initialCards => {
        setCards(initialCards);
      })
      .catch(err => console.log(err));
  }, []);


  return (
    <main className="content">
      <section className="profile">
        <div className="profile__about">
          <div className="profile__avatar" onClick={props.onEditAvatar}>
            <img src={currentUser.avatar} alt={currentUser.name} className="profile__avatar-img" />
          </div>
          <div className="profile__description">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button type="button" className="button button_type_edit-profile" onClick={props.onEditProfile}></button>
            <p className="profile__job">{currentUser.about}</p>
          </div>
        </div>
        <button type="button" className="button button_type_add-card" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="cards">
          {cards.map(card => (
            <Card key={card._id} card={card} onCardClick={props.onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
