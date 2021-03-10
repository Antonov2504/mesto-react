import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmationPopup({ card, isOpen, onClose, onCardDelete, isLoadingButtonText }) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onCardDelete(card._id);
  }

  return (
    <PopupWithForm
      isOpened={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="delete-card"
      title="Вы уверены?"
    >
      <button type="submit" className="button button_type_submit">{isLoadingButtonText ? 'Удаление...' : 'Да'}</button>
    </PopupWithForm>
  );
}

export default ConfirmationPopup;
