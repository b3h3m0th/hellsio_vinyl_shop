import React, { useEffect } from "react";
import "./GenreList.scss";
import { Genre } from "../../models/Genre";
import GenreCheckBox from "./GenreCheckBox/GenreCheckBox";
import { Link } from "react-router-dom";
import { LanguageStore } from "../../stores/languageStore";
import { inject, observer } from "mobx-react";
import gsap from "gsap";

const genres = require("../../data/genres.json");

interface GenresListProps {
  title: string;
  languageStore?: LanguageStore;
  link: string;
}

const GenreList = ({ title, languageStore, link }: GenresListProps) => {
  let genresList: any = [];

  genres.forEach((genre: Genre) =>
    genresList.push(<GenreCheckBox label={genre} key={genre} />)
  );

  useEffect(() => {
    gsap.from(".genres-list__title", 1, {
      x: -50,
      opacity: 0,
      ease: "power4",
    });
  });

  useEffect(() => {
    gsap.from(".genre-checkbox__container", 1, {
      x: -50,
      opacity: 0,
      ease: "power4",
      stagger: 0.05,
    });
  });

  return (
    <div className="genres-list">
      <Link
        className="genres-list__title"
        to={`/${languageStore?.language}/${link}`}
      >
        <h3 className="genres-list__title__text"> {title.toUpperCase()}</h3>
        <div className="genres-list__title__after"></div>
      </Link>
      <div className="genres-list__genres-container">{genresList}</div>
    </div>
  );
};

export default inject("languageStore")(observer(GenreList));
