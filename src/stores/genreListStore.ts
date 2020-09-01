import { decorate, observable } from "mobx";
import { Genre } from "../models/Genre";
const genres = require("../data/genres.json");

export class GenreListStore {
  genres = genres;

  selectedGenres: Genre[] = [];
}

decorate(GenreListStore, {
  genres: observable,
  selectedGenres: observable,
});

export const genreListStore = new GenreListStore();
