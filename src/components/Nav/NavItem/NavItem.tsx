import React from "react";
import "./NavItem.scss";
import { NavLink } from "react-router-dom";

interface NavItemProps {
  label: string;
  link: string;
}

const NavItem = ({ label, link }: NavItemProps) => {
  return (
    <li className="nav-item">
      <NavLink to={`${link}`} activeClassName="active">
        <div className={`nav-item__before`}></div>
        <div className="nav-item__label">{label}</div>
      </NavLink>
    </li>
  );
};

export default NavItem;
