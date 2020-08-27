import React from "react";
import "./NavItem.scss";
import { NavLink } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { NavStore } from "../../../stores/navStore";

interface NavItemProps {
  label: string;
  link: string;
  navStore?: NavStore;
}

const NavItem = ({ label, link, navStore }: NavItemProps) => {
  return (
    <li className="nav-item">
      <NavLink to={`${link}`} activeClassName="active">
        <div className={`nav-item__before`}></div>
        <div className="nav-item__label">{label}</div>
      </NavLink>
    </li>
  );
};

export default inject("navStore")(observer(NavItem));
