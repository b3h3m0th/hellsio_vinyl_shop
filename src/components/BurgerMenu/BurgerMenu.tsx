import React from "react";
import "./BurgerMenu.scss";

interface BurgerMenuProps {
  onClick: () => void;
}

export const BurgerMenu = ({ onClick }: BurgerMenuProps) => {
  return (
    <div className="burger-wrapper" onClick={onClick && onClick}>
      <div className="burger-layer"></div>
      <div className="burger-layer"></div>
    </div>
  );
};
