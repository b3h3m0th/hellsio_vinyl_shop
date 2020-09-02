import React from "react";
import "./Title.scss";
import { Link } from "react-router-dom";
import { LanguageStore } from "../../stores/languageStore";
import { inject, observer } from "mobx-react";

interface TitleProps {
  title: string;
  languageStore?: LanguageStore;
  link: string;
}

const Title = ({ title, languageStore, link }: TitleProps) => {
  return (
    <Link
      className="title-container"
      to={`/${languageStore?.language}/${link}`}
    >
      <h3 className="title-container__text"> {title.toUpperCase()}</h3>
      <div className="title-container__after"></div>
    </Link>
  );
};

export default inject("languageStore")(observer(Title));
