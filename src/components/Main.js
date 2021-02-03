import React from 'react';

function Main(props) {
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__about">
          <div className="profile__avatar">
            <img src="#" alt="Имя пользователя" className="profile__avatar-img" />
          </div>
          <div className="profile__description">
            <h1 className="profile__name"></h1>
            <button type="button" className="button button_type_edit-profile"></button>
            <p className="profile__job"></p>
          </div>
        </div>
        <button type="button" className="button button_type_add-card"></button>
      </section>
      <section className="elements">
        <ul className="cards"></ul>
      </section>
    </main>
  );
}

export default Main;
