import React, { useState, useEffect } from "react";
import { Album } from "../../models/Album";
import "./ProductDetail.scss";
import gsap from "gsap";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
const albumData: Album[] = require("../../data/products.json");
const arrowRight = require("../../assets/icons/arrowRight/arrowRightWhite.png");

interface ProductDetailProps {
  match?: any;
}

const ProductDetail = ({ match }: ProductDetailProps) => {
  const [productUrlData] = useState(match);
  console.log(productUrlData);
  const album = albumData.find((al) => al.id === match.params.albumID);

  let tracks: any = [];

  album?.tracklist.forEach((track, index) => {
    tracks.push(
      <p key={index}>
        {index.toString().length > 1 ? index : "0" + index} - {track.title}
      </p>
    );
  });

  console.log("correct album", album);

  const albumCover = require(`../../assets/img/vinyl_covers/${album?.img}`);

  useEffect(() => {
    gsap.from(".product-detail__background-container", 1.8, {
      opacity: 0,
      ease: "power2",
    });

    gsap.from(".product-detail__album-title__title", 1.8, {
      x: -100,
      ease: "power4",
      opacity: 0,
    });

    gsap.from(".product-detail__album-title__subtitle", 1.8, {
      delay: 0.2,
      x: -100,
      ease: "power4",
      opacity: 0,
    });
  });

  return (
    <div className="product-detail">
      <div className="product-detail__album-title">
        <h2 className="product-detail__album-title__title">{album?.name}</h2>
        <h3 className="product-detail__album-title__subtitle">
          {album?.artists[0].name}
        </h3>
      </div>
      <div className="product-detail__background-container">
        <img
          src={albumCover}
          alt={`Hellsio album cover ${album?.name}`}
          className="product-detail__background-container__img"
        />
      </div>
      <div className="product-detail__content">
        <div className="product-detail__content__wrapper">
          <div className="album-detail">
            <div className="album-detail__tracklist">
              <h4>Tracklist</h4>
              <div className="album-detail__tracklist__tracks">{tracks}</div>
            </div>
            <div className="album-detail__price">
              <p className="album-detail__price__price">
                $ {album?.formates[0].price}
              </p>
              <PrimaryButton
                label="Add to cart"
                link="checkout"
                icon={arrowRight}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <div>{productUrlData.params.albumID}</div> */}
    </div>
  );
};

export default ProductDetail;
