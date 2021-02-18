import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleCardNameChange(evt) {
    setName(evt.target.value);
  }

  function handleCardLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name,
      link
    });
    setName('');
    setLink('');
  }

  return (
    <PopupWithForm
      isOpened={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="add-card"
      title="Новое место"
    >
      <label className="form__field">
        <input type="text"
          name="card-name"
          id="card-name-input"
          value={name}
          onChange={handleCardNameChange}
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
          value={link}
          onChange={handleCardLinkChange}
          className="form__input form__input_size_small form__input_el_card-link"
          placeholder="Ссылка на картинку"
          required
          autoComplete="off" />
        <span className="form__input-error card-link-input-error"></span>
      </label>
      <button type="submit" className="button button_type_submit">Создать</button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;