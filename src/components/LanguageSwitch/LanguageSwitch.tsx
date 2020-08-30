import React from "react";
import { Link } from "react-router-dom";
import { LanguageStore } from "../../stores/languageStore";
import { inject, observer } from "mobx-react";
import { languages } from "../../stores/languageStore";
import "./LanguageSwitch.scss";

interface LanguageSwitchProps {
  languageStore?: LanguageStore;
}

const LanguageSwitch = ({ languageStore }: LanguageSwitchProps) => {
  const languageLinks: any = [];
  return (
    <div className="language-switch">
      {languages.forEach((la) => {
        languageLinks.push(
          <Link
            to={`/${la}/newarrivals`}
            key={la}
            className={
              languageStore?.language === la
                ? "language-active"
                : "language-not-active"
            }
            onClick={() => {
              languageStore?.setLanguage(la);
            }}
          >
            {la}
          </Link>
        );
      })}
      {languageLinks}
    </div>
  );
};

export default inject("languageStore")(observer(LanguageSwitch));
