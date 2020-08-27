import React from "react";
import "./Nav.scss";
const logo = require("../../assets/icons/logo/full/hellsio_full_logo_web_red.png");

const Nav = () => {
  return (
    <nav className="nav">
      <div className="nav__wrapper">
        <div className="nav__wrapper__logo">
          <img src={logo} alt="Hellsio logo" className="logo" />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
