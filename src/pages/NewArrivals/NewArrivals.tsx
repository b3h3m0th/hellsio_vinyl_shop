import React, { useEffect } from "react";
import "./NewArrivals.scss";
import GenreList from "../../components/GenreList/GenreList";
import gsap from "gsap";
import Vinyl from "../../components/Vinyl/Vinyl";
import { Album } from "../../models/Album";
const albums = require("../../data/products.json");

const NewArrivals = () => {
  let albumVinyls: any = [];
  albums.forEach((album: Album, index: number) => {
    const vinylImage = require(`../../assets/img/vinyl_covers/${album.img}`);
    albumVinyls.push(<Vinyl id={album.id} key={index} image={vinylImage} />);
  });

  useEffect(() => {
    gsap.from(".vinyl-container", 1, {
      y: 50,
      stagger: 0.1,
      opacity: 0,
    });
  });

  return (
    <div className="new-arrivals">
      <div className="new-arrivals__genres">
        <GenreList title="New Arrivals" link="newarrivals"></GenreList>
      </div>
      <div className="new-arrivals__albums">
        <div className="new-arrivals__albums__wrapper">{albumVinyls}</div>
      </div>
    </div>
  );
};

export default NewArrivals;
