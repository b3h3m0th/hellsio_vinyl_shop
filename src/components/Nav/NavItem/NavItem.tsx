import React from "react";
import "./NavItem.scss";
import { NavLink } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { LanguageStore } from "../../../stores/languageStore";

interface NavItemProps {
  label: string;
  link: string;
  languageStore?: LanguageStore;
}

const NavItem = ({ label, link, languageStore }: NavItemProps) => {
  return (
    <li className="nav-item">
      <NavLink
        to={`/${languageStore?.language}/${link}`}
        activeClassName="active"
      >
        <div className={`nav-item__before`}></div>
        <div className="nav-item__label">{label}</div>
      </NavLink>
    </li>
  );
};

export default inject("languageStore")(observer(NavItem));
