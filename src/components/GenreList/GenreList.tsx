import React, { useEffect, useState } from "react";
import "./GenreList.scss";
import { LanguageStore } from "../../stores/languageStore";
import { inject, observer } from "mobx-react";
import gsap from "gsap";
import Title from "../Title/Title";
import GenreCheckBox from "./GenreCheckBox/GenreCheckBox";
import { GenreListStore } from "../../stores/genreListStore";

// const genres = require("../../data/genres.json");

interface GenresListProps {
  title: string;
  link: string;
  languageStore?: LanguageStore;
  genreListStore?: GenreListStore;
}

const GenreList: React.FC<GenresListProps> = ({
  title,
  link,
  languageStore,
  genreListStore,
}: GenresListProps) => {
  const [genres, setGenres] = useState<Array<any & { checked: boolean }>>();

  useEffect(() => {
    (async () => {
      setGenres(
        [...((await genreListStore?.fetchGenres()) || [])].map((g: any) => ({
          ...g,
          checked: false,
        }))
      );
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(genres);

  return (
    <div className="genres-list">
      <Title title={title} link={link} />
      <div className="genres-list__genres-container">
        {genres?.map((genre: any, i: number) => {
          return (
            <GenreCheckBox
              key={i}
              label={genre.name}
              checked={genre.checked}
              onChange={(e) => {
                setGenres([
                  ...genres.splice(
                    0,
                    genres.findIndex((g: any) => g.name === genre.name)
                  ),
                  {
                    ...genres[
                      genres.findIndex((g: any) => g.name === genre.name)
                    ],
                    checked: e.target.checked,
                  },
                  ...genres.splice(
                    genres.findIndex((g: any) => g.name === genre.name) + 1
                  ),
                ]);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default inject("languageStore", "genreListStore")(observer(GenreList));
