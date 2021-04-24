import React, { useEffect, useState } from "react";
import "./GenreList.scss";
import { LanguageStore } from "../../stores/languageStore";
import { inject, observer } from "mobx-react";
import gsap from "gsap";
import Title from "../Title/Title";
import axios from "axios";

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
  const [genres, setGenres] = useState<Array<any>>([]);
  useEffect(() => {
    (async () => {
      const genresResponse = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}`
      );
      setGenres(genresResponse.data);
    })();
  }, []);

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
      <div className="genres-list__genres-container">
        {genres.map((genre: any, index: number) => {
          return null;
        })}
      </div>
    </div>
  );
};

export default inject("languageStore")(observer(GenreList));
