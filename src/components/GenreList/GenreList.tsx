import React, { useEffect, useState } from "react";
import "./GenreList.scss";
import { LanguageStore } from "../../stores/languageStore";
import { inject, observer } from "mobx-react";
import gsap from "gsap";
import Title from "../Title/Title";
import axios from "axios";
import GenreCheckBox from "./GenreCheckBox/GenreCheckBox";

// const genres = require("../../data/genres.json");

interface GenresListProps {
  title: string;
  languageStore?: LanguageStore;
  link: string;
}

const GenreList: React.FC<GenresListProps> = ({
  title,
  languageStore,
  link,
}: GenresListProps) => {
  const [genres, setGenres] = useState<Array<any>>();

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/genre`
      );
      setGenres(response.data);
    })();

    gsap.from(".genre-checkbox__container", 1, {
      x: -50,
      opacity: 0,
      ease: "power4",
      stagger: 0.05,
    });

    gsap.from(".genres-list__title", 1, {
      x: -50,
      opacity: 0,
      ease: "power4",
    });
  }, []);

  return (
    <div className="genres-list">
      <Title title={title} link={link} />
      <div className="genres-list__genres-container">
        {genres?.map((genre: any, index: number) => {
          return (
            <GenreCheckBox
              label={genre.name}
              checked={true}
              onChange={() => true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default inject("languageStore")(observer(GenreList));
