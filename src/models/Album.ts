import { Genre } from "./Genre";

export type Album = {
  id: string;
  name: string;
  genre: Genre;
  artists: [
    {
      name: string;
    }
  ];
  releaseDate: string;
  formates: [
    {
      id: string;
      price: number;
    }
  ];
  tracklist: [
    {
      title: string;
    }
  ];
};
