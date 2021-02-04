import React from 'react';

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
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
