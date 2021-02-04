import React from 'react';

function ImagePopup(props) {
  return (
    <>
      <div className="popup popup_type_show-card">
        <div className="popup__container popup__container_size_large">
          <button type="button" className="button button_type_close-popup"></button>
          <figure className="popup__figure">
            <img src="#" alt="#" className="popup__image" />
            <figcaption className="popup__caption">Подпись</figcaption>
          </figure>
        </div>
      </div>
    </>
  );
}

export default ImagePopup;