import React from "react";
import { Link } from "react-router-dom";
import { LanguageStore } from "../../stores/languageStore";
import { inject, observer } from "mobx-react";
import { languages } from "../../stores/languageStore";
import "./LanguageSwitch.scss";

interface LanguageSwitchProps {
  languageStore?: LanguageStore;
}

const LanguageSwitch: React.FC<LanguageSwitchProps> = ({
  languageStore,
}: LanguageSwitchProps) => {
  return (
    <div className="language-switch">
      {languages.map((la: any) => {
        return (
          <Link
            to={`/${la}`}
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
    </div>
  );
};

export default inject("languageStore")(observer(LanguageSwitch));
