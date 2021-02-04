import React from 'react';

function ImagePopup(props) {
  return (
    <>
      <div className={`popup popup_type_show-card ${props.card && 'popup_opened'}`} onClick={(e) => { if (e.target.classList.contains('popup')) props.onClose() }}>
        <div className="popup__container popup__container_size_large">
          <button type="button" className="button button_type_close-popup" onClick={props.onClose}></button>
          <figure className="popup__figure">
            <img src={props.card && props.card.link} alt={props.card && props.card.name} className="popup__image" />
            <figcaption className="popup__caption">{props.card && props.card.name}</figcaption>
          </figure>
        </div>
      </div>
    </>
  );
}

export default ImagePopup;