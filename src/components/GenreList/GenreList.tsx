import React, { useEffect } from "react";
import "./GenreList.scss";
import { Genre } from "../../models/Genre";
import GenreCheckBox from "./GenreCheckBox/GenreCheckBox";
import { LanguageStore } from "../../stores/languageStore";
import { inject, observer } from "mobx-react";
import gsap from "gsap";
import Title from "../Title/Title";
import axios from "axios";
const genres = require("../../data/genres.json");

// const genres = require("../../data/genres.json");

interface GenresListProps {
  title: string;
  languageStore?: LanguageStore;
  link: string;
}

const GenreList = ({ title, languageStore, link }: GenresListProps) => {
  useEffect(() => {
    (async () => {
      axios
        .get(
          "https://hellsio-vinyl-shop-server.netlify.app/.netlify/functions/api/genres"
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  });

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
      <Title title={title} link={link} />
      <div className="genres-list__genres-container">{genresList}</div>
    </div>
  );
};

export default inject("languageStore")(observer(GenreList));
