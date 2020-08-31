import React from "react";
import "./BurgerCloseMenu.scss";

interface BurgerCloseMenuProps {
  onClick?: () => void;
}

export const BurgerCloseMenu = ({ onClick }: BurgerCloseMenuProps) => {
  return (
    <div className="burger-close" onClick={onClick && onClick}>
      <div className="burger-close__cross-vertical"></div>
      <div className="burger-close__cross-horizontal"></div>
    </div>
  );
};
