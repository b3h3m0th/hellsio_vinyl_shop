import { makeAutoObservable, observable } from "mobx";
import { Genre } from "../models/Genre";
const genres = require("../data/genres.json");

export class GenreListStore {
  @observable genres = genres;

  @observable selectedGenres: Genre[] = [];

  constructor() {
    makeAutoObservable(this);
  }
}

export const genreListStore = new GenreListStore();
