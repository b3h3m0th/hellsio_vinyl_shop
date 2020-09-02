import React from "react";
import "./Nav.scss";
import { inject, observer } from "mobx-react";
import NavItem from "./NavItem/NavItem";
import { BurgerMenu } from "../BurgerMenu/BurgerMenu";
import { BurgerCloseMenu } from "../BurgerCloseMenu/BurgerCloseMenu";
import { Link } from "react-router-dom";
import { BurgerMenuStore } from "../../stores/burgerMenuStore";
import { LanguageStore } from "../../stores/languageStore";

const logo = require("../../assets/icons/logo/full/hellsio_full_logo_web_red.png");
const searchIcon = require("../../assets/icons/search/search_web_red.png");
const shoppingBagIcon = require("../../assets/icons/shopping_bag/shopping_bag_web_red.png");

interface NavProps {
  burgerMenuStore?: BurgerMenuStore;
  languageStore?: LanguageStore;
}

const Nav = ({ burgerMenuStore, languageStore }: NavProps) => {
  return (
    <>
      <div
        className={`nav-modal ${
          burgerMenuStore?.opened ? "nav-modal-active" : "nav-modal-not-active"
        }`}
      >
        nav content TO BE ADDED
      </div>
      <nav className="nav">
        <div className="nav__wrapper">
          <Link
            to={`/${languageStore?.language}`}
            className="nav__wrapper__logo"
          >
            <img src={logo} alt="Hellsio logo" className="logo" />
          </Link>
          <div className="nav__wrapper__content">
            <NavItem label="NEW ARRIVALS" link="newarrivals" />
            <NavItem label="FEATURED" link="featured" />
            <NavItem label="POPULAR" link="popular" />
            <div className="nav-icons"></div>
            <div className="nav-icons__icon">
              <img
                src={searchIcon}
                alt="Hellsio search icon"
                id="search_icon"
              />
            </div>
            <div className="nav-icons__icon">
              <Link to={`/${languageStore?.language}/checkout`}>
                <img
                  src={shoppingBagIcon}
                  alt="Hellsio shopping bag icon"
                  id="shopping_bag_icon"
                />
              </Link>
            </div>
            <div className="nav-icons__icon">
              {burgerMenuStore?.opened ? (
                <BurgerCloseMenu
                  onClick={() => {
                    burgerMenuStore?.close();
                  }}
                />
              ) : (
                <BurgerMenu
                  onClick={() => {
                    burgerMenuStore?.open();
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default inject("burgerMenuStore", "languageStore")(observer(Nav));
