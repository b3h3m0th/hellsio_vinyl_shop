import React, { useEffect } from "react";
import "./GenreList.scss";
import { LanguageStore } from "../../stores/languageStore";
import { inject, observer } from "mobx-react";
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
  useEffect(() => {
    (async () => {
      genreListStore?.setGenres(
        [...((await genreListStore?.fetchGenres()) || [])].map((g: any) => ({
          ...g,
          checked: true,
        }))
      );
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="genres-list">
      <Title title={title} link={link} />
      <div className="genres-list__genres-container">
        {genreListStore?.genres?.map((genre: any, i: number) => {
          return (
            <GenreCheckBox
              key={i}
              label={genre.name}
              checked={genre.checked}
              onChange={(e) => {
                genreListStore?.setGenres([
                  ...genreListStore.genres.splice(
                    0,
                    genreListStore.genres.findIndex(
                      (g: any) => g.name === genre.name
                    )
                  ),
                  {
                    ...genreListStore.genres[
                      genreListStore.genres.findIndex(
                        (g: any) => g.name === genre.name
                      )
                    ],
                    checked: e.target.checked,
                  },
                  ...genreListStore.genres.splice(
                    genreListStore.genres.findIndex(
                      (g: any) => g.name === genre.name
                    ) + 1
                  ),
                ]);
              }}
            />
          );
        })}
        <GenreCheckBox
          style={{ marginTop: "20px" }}
          label={`Select ${genreListStore?.isToggledAll ? `None` : `All`}`}
          checked={genreListStore?.isToggledAll || false}
          onChange={(e) => {
            genreListStore?.setGenres([
              ...genreListStore.genres.map((g) => ({
                ...g,
                checked: !genreListStore.isToggledAll,
              })),
            ]);
            genreListStore?.setIsToggledAll(!genreListStore.isToggledAll);
          }}
        />
      </div>
    </div>
  );
};

export default inject("languageStore", "genreListStore")(observer(GenreList));
