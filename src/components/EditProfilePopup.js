import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name,
      about: description
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      isOpened={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="edit-profile"
      title="Редактировать профиль"
    >
      <label className="form__field">
        <input type="text"
          name="name"
          id="profile-name-input"
          value={name}
          onChange={handleChangeName}
          placeholder="Имя"
          className="form__input form__input_el_profile-name"
          required
          minLength="2"
          maxLength="40"
          autoComplete="off" />
        <span className="form__input-error profile-name-input-error"></span>
      </label>
      <label className="form__field">
        <input type="text"
          name="description"
          id="profile-job-input"
          value={description}
          onChange={handleChangeDescription}
          placeholder="Вид деятельности"
          className="form__input form__input_el_profile-job"
          required
          minLength="2"
          maxLength="200"
          autoComplete="off" />
        <span className="form__input-error profile-job-input-error"></span>
      </label>
      <button type="submit" className="button button_type_submit">Сохранить</button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;