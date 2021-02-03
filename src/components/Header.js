import React from 'react';
import logo from './../images/header__logo.svg';

function Header(props) {
  return (
    <header className="header">
      <img src={logo} alt="Место в России" className="header__logo" />
    </header>
  );
}

export default Header;