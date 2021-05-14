import { makeAutoObservable, observable, action } from "mobx";
import axios from "axios";
export class GenreListStore {
  @observable genres: Array<any & { checked: boolean }> = [];

  @observable selectedGenres: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action setGenres: (value: Array<any & { checked: boolean }>) => void = (
    value
  ) => {
    this.genres = value;
  };

  @action fetchGenres = async (): Promise<Array<string> | undefined> => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/genre`
      );

      return response.data;
    } catch (err) {
      console.log(err);
    }
  };
}

export const genreListStore = new GenreListStore();
