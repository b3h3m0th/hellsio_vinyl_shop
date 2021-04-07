import React, { useEffect, useState } from "react";
import { Album } from "../../models/Album";
import "./ProductDetail.scss";
import gsap from "gsap";
import { inject, observer } from "mobx-react";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { Link } from "react-router-dom";
import { languageStore } from "../../stores/languageStore";
import { toJS } from "mobx";
import QuantityPicker from "../../components/QuantityPicker/QuantityPicker";
import DropDownPicker from "../../components/DropDownPicker/DropDownPicker";
import { CheckoutStore } from "../../stores/checkoutStore";
const albumData: Album[] = require("../../data/products.json");
const arrowRight = require("../../assets/icons/arrowRight/arrowRightWhite.png");
const arrowRightSmall = require("../../assets/icons/arrowRightSmall/arrowRightSmall.svg");

interface ProductDetailProps {
  match?: any;
  checkoutStore?: CheckoutStore;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  match,
  checkoutStore,
}: ProductDetailProps) => {
  // const [albumData, setAlbumData] = useState();
  // (async () => {
  //   const response = await fetch("/.netlify/functions/api/albums");
  //   setAlbumData(await response.json());
  // })();

  const album = albumData.find((al) => al.id === match.params.albumID);

  let tracks: any = [];

  album?.tracklist.forEach((track, index) => {
    tracks.push(
      <p key={index} className="tracks_track">
        {(index + 1).toString().length > 1 ? index + 1 : "0" + (index + 1)} -{" "}
        {track.title}
      </p>
    );
  });

  const albumCover = require(`../../assets/img/vinyl_covers/${album?.img}`);

  //following albums
  let followingAlbums: any = [];
  for (let i = 1; i < 4; i++) {
    let currentAlbumIndex = albumData.indexOf(album!, 0) + i;
    if (currentAlbumIndex > albumData.length - 1)
      currentAlbumIndex = albumData.length - 1 - i;

    let currentAlbum = albumData[currentAlbumIndex];
    // if (currentAlbum) console.log(currentAlbum);
    // else currentAlbum = albumData[i];
    let currentAlbumCover = require(`../../assets/img/vinyl_covers/${currentAlbum.img}`);
    followingAlbums.push(
      <div
        className={`product-detail__nav__next-albums__album`}
        id={`next-albums-${currentAlbum.id}`}
        key={`next album` + currentAlbum.id}
        style={{ color: "white" }}
      >
        <img src={currentAlbumCover} key={i} alt="Hellsio album cover" />
      </div>
    );
  }

  let linkNextAlbumIndex = albumData.indexOf(album!, 0) + 1;
  if (linkNextAlbumIndex > albumData.length - 1) linkNextAlbumIndex = 0;
  let linkPreviousAlbumIndex = albumData.indexOf(album!, 0) - 1;
  if (linkPreviousAlbumIndex < 0) linkPreviousAlbumIndex = albumData.length - 1;
  // console.log(linkNextAlbumIndex);
  // console.log(linkPreviousAlbumIndex);

  const linkNext = `/${languageStore.language}/products/${albumData[linkNextAlbumIndex].id}`;
  const linkPrevious = `/${languageStore.language}/products/${albumData[linkPreviousAlbumIndex].id}`;

  const [selectedFormat, setSelectedFormat] = useState("7-vinyl");

  const handleFormatChange = (e: any) => {
    setSelectedFormat(e.target.value);
  };

  useEffect(() => {
    gsap.from(".product-detail__background-container", 0.5, {
      opacity: 0,
      ease: "power2",
    });
    gsap.from(".product-detail__album-title__title", 0.5, {
      x: -100,
      ease: "power4",
      opacity: 0,
    });
    gsap.from(".product-detail__album-title__subtitle", 0.5, {
      delay: 0.2,
      x: -100,
      ease: "power4",
      opacity: 0,
    });
    gsap.from("h4", 0.5, {
      opacity: 0,
      ease: "power4",
      x: 100,
    });
    gsap.from(".tracks_track", 0.5, {
      delay: 0.2,
      opacity: 0,
      ease: "power4",
      stagger: 0.02,
      x: "20px",
    });
    gsap.from(".product-detail__nav__current-album", 1.8, {
      y: 100,
      ease: "power4",
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
      <div className="product-detail__nav">
        <div className="product-detail__nav__buttons">
          <Link to={linkNext}>
            <button className="button-next">
              <img src={arrowRightSmall} alt="Hellsio arrow right small" />
            </button>
          </Link>
          <Link to={linkPrevious}>
            <button className="button-previous">
              <img src={arrowRightSmall} alt="Hellsio arrow right small" />
            </button>
          </Link>
        </div>
        <div className="product-detail__nav__current-album">
          <img src={albumCover} alt="Hellsio album cover" />
        </div>
        <div className="product-detail__nav__next-albums">
          {followingAlbums}
        </div>
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
              <div className="album-detail__price__content">
                <div className="album-detail__price__content__left">
                  <p className="album-detail__price__content__price">
                    ${" "}
                    {
                      album?.formates.find((al) => al.id === selectedFormat)
                        ?.price
                    }
                  </p>
                  <QuantityPicker label="Quantity" maxValue={5} />
                </div>
                <div className="album-detail__price__content__right">
                  <p className="album-detail__price__content__right__per-item">
                    per item
                  </p>
                  <DropDownPicker
                    label="Format"
                    options={album!.formates}
                    id="product-detail__drop-down"
                    onChange={(e) => handleFormatChange(e)}
                  />
                </div>
              </div>
              <PrimaryButton
                label="Add to cart"
                link="shopping-bag"
                icon={arrowRight}
                onClick={() => {
                  checkoutStore?.addProduct(album!);
                  console.log(album);
                  console.log(toJS(checkoutStore?.products));
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default inject(
  "languageStore",
  "checkoutStore"
)(observer(ProductDetail));
