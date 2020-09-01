import { Genre } from "./Genre";

export type Album = {
  id: string;
  name: string;
  genre: Genre;
  img: any;
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
