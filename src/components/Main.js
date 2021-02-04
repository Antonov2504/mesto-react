import React, { useState, useEffect } from 'react';
import Card from './Card';
import api from './../utils/api.js';
import avatarDefault from './../images/profile__avatar.svg';

function Main(props) {
  const [userName, setUserName] = useState();
  const [userDescription, setUserDescription] = useState();
  const [userAvatar, setUserAvatar] = useState(avatarDefault);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo()
      .then(data => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
      })
      .catch(err => console.log(err));
  }, []);

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
            <img src={userAvatar} alt={userName} className="profile__avatar-img" />
          </div>
          <div className="profile__description">
            <h1 className="profile__name">{userName}</h1>
            <button type="button" className="button button_type_edit-profile" onClick={props.onEditProfile}></button>
            <p className="profile__job">{userDescription}</p>
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
