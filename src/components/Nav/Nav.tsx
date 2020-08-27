import React from "react";
import "./Nav.scss";
import NavItem from "./NavItem/NavItem";
import { Link } from "react-router-dom";

const logo = require("../../assets/icons/logo/full/hellsio_full_logo_web_red.png");

const Nav = () => {
  return (
    <nav className="nav">
      <div className="nav__wrapper">
        <Link to="/home" className="nav__wrapper__logo">
          <img src={logo} alt="Hellsio logo" className="logo" />
        </Link>
        <div className="nav__wrapper__content">
          <NavItem label="FEATURED" link="products" />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
