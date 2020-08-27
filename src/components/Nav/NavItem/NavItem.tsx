import React from "react";
import "./NavItem.scss";
import { Link } from "react-router-dom";

interface NavItemProps {
  label: string;
  link: string;
}

const NavItem = ({ label, link }: NavItemProps) => {
  return (
    <li className="nav-item">
      <div className="nav-item__before"></div>
      <Link to={`${link}`}>
        <div className="nav-item__label">{label}</div>
      </Link>
    </li>
  );
};

export default NavItem;
