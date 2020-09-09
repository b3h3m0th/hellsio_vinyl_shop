import React from "react";
import "./PrimaryButton.scss";
import { LanguageStore } from "../../stores/languageStore";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";

interface PrimaryButtonProps {
  label: string;
  link: string;
  languageStore?: LanguageStore;
  icon?: any;
  submit?: boolean;
  onClick?: () => void;
}

const PrimaryButton = ({
  label,
  link,
  languageStore,
  icon,
  submit,
  onClick,
}: PrimaryButtonProps) => {
  return (
    <Link
      to={`/${languageStore?.language}/${link}`}
      onClick={onClick && onClick}
    >
      <button className="primary-button" type={submit ? "submit" : "button"}>
        <p>{label}</p>
        {icon && <img src={icon} alt="Hellsio primary button icon" />}
      </button>
    </Link>
  );
};

export default inject("languageStore")(observer(PrimaryButton));
