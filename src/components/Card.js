import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `button ${isOwn ? 'button_type_remove-card' : 'button_type_remove-card-hidden'}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `button ${isLiked ? 'button_type_add-like-active' : 'button_type_add-like'}`
  );

  function handleClick() {
    props.onCardClick(props.card);
    console.log(props.card);
  }

  return (
    <li className="card">
      <button type="button" className="button button_type_remove-card"></button>
      <img src={props.card.link} alt={props.card.name} className="card__image" onClick={handleClick} />
      <div className="card__info">
        <h2 className="card__name">{props.card.name}</h2>
        <div className="card__like">
          <button type="button" className="button button_type_add-like"></button>
          <span className="card__like-count">{props.card.likes.length ? props.card.likes.length : ''}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
