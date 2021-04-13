import React, { useEffect, useState } from "react";
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
import { fetchAlbum, fetchAlbums } from "./fetchData";
import toBase64 from "../../util/toBase64";
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
  const [albums, setAlbums] = useState<Array<any>>([]);
  const [currentAlbum, setCurrentAlbum] = useState<any>();

  useEffect(() => {
    (async () => {
      const albums = await fetchAlbums();
      const currentAlbum = albums.find(
        (album: any) => album.code === match.params.albumCode
      );

      console.log(
        albums.find((album: any) => album.code === match.params.albumCode)
      );
      setAlbums(albums);
      setCurrentAlbum(currentAlbum);
    })();
  }, [match]);

  console.log("currentAlbum: ", currentAlbum);
  console.log("albums: ", albums);

  // console.log(albums);

  // let album = albums.find((album) => album.code === match.params.albumCode);
  // album = currentAlbum;

  // let tracks: any = [];

  // // album?.tracklist.forEach((track, index) => {
  // //   tracks.push(
  // //     <p key={index} className="tracks_track">
  // //       {(index + 1).toString().length > 1 ? index + 1 : "0" + (index + 1)} -{" "}
  // //       {track.title}
  // //     </p>
  // //   );
  // // });

  // //following albums
  // let followingAlbums: any = [];
  // for (let i = 1; i < 4; i++) {
  //   let currentAlbumIndex = albums.indexOf(album!, 0) + i;
  //   if (currentAlbumIndex > albums.length - 1)
  //     currentAlbumIndex = albums.length - 1 - i;

  //   let currentAlbum = albums[currentAlbumIndex];
  //   let currentAlbumCover = `data:image/png;base64,${toBase64(
  //     album?.cover.data
  //   )}`;
  //   followingAlbums.push(
  //     <div
  //       className={`product-detail__nav__next-albums__album`}
  //       id={`next-albums-${currentAlbum?.code}`}
  //       key={`next album` + currentAlbum?.code}
  //       style={{ color: "white" }}
  //     >
  //       <img src={currentAlbumCover} key={i} alt="Hellsio album cover" />
  //     </div>
  //   );
  // }

  // let linkNextAlbumIndex = albums.indexOf(album!, 0) + 1;
  // if (linkNextAlbumIndex > albums.length - 1) linkNextAlbumIndex = 0;
  // let linkPreviousAlbumIndex = albums.indexOf(album!, 0) - 1;
  // if (linkPreviousAlbumIndex < 0) linkPreviousAlbumIndex = albums.length - 1;
  // // console.log(linkNextAlbumIndex);
  // // console.log(linkPreviousAlbumIndex);

  // const linkNext = `/${languageStore.language}/products/${albums[linkNextAlbumIndex]?.code}`;
  // const linkPrevious = `/${languageStore.language}/products/${albums[linkPreviousAlbumIndex]?.code}`;

  // const [selectedFormat, setSelectedFormat] = useState("7-vinyl");

  // const handleFormatChange = (e: any) => {
  //   setSelectedFormat(e.target.value);
  // };

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
        <h2 className="product-detail__album-title__title">
          {currentAlbum?.name}
        </h2>
        <h3 className="product-detail__album-title__subtitle">
          {currentAlbum?.artist}
        </h3>
      </div>
      <div className="product-detail__nav">
        <div className="product-detail__nav__buttons">
          <Link to={"AAA"}>
            <button className="button-next">
              <img src={arrowRightSmall} alt="Hellsio arrow right small" />
            </button>
          </Link>
          <Link to={"AAA"}>
            <button className="button-previous">
              <img src={arrowRightSmall} alt="Hellsio arrow right small" />
            </button>
          </Link>
        </div>
        <div className="product-detail__nav__current-album">
          <img
            src={`data:image/png;base64,${toBase64(currentAlbum?.cover.data)}`}
            alt="Hellsio album cover"
          />
        </div>
        <div className="product-detail__nav__next-albums">
          {"FOLLOWING ALBUMS"}
        </div>
      </div>
      <div className="product-detail__background-container">
        <img
          src={`data:image/png;base64,${toBase64(currentAlbum?.cover.data)}`}
          alt={`Hellsio album cover ${currentAlbum?.name}`}
          className="product-detail__background-container__img"
        />
      </div>
      <div className="product-detail__content">
        <div className="product-detail__content__wrapper">
          <div className="album-detail">
            <div className="album-detail__tracklist">
              <h4>Tracklist</h4>
              <div className="album-detail__tracklist__tracks">
                {currentAlbum?.tracks.forEach((track: any, index: any) => {
                  return (
                    <p key={index} className="tracks_track">
                      {(index + 1).toString().length > 1
                        ? index + 1
                        : "0" + (index + 1)}{" "}
                      - {track.title}
                    </p>
                  );
                })}
                {currentAlbum?.tracks?.map((track: any) => {
                  return <div>{track}</div>;
                })}
              </div>
            </div>
            <div className="album-detail__price">
              <div className="album-detail__price__content">
                <div className="album-detail__price__content__left">
                  <p className="album-detail__price__content__price">$ 0</p>
                  <QuantityPicker label="Quantity" maxValue={5} />
                </div>
                <div className="album-detail__price__content__right">
                  <p className="album-detail__price__content__right__per-item">
                    per item
                  </p>
                  <DropDownPicker
                    label="Format"
                    options={[{ id: "0", price: 4.0 }]}
                    id="product-detail__drop-down"
                    onChange={(e) => null}
                  />
                </div>
              </div>
              <PrimaryButton
                label="Add to cart"
                link="shopping-bag"
                icon={arrowRight}
                onClick={() => {
                  checkoutStore?.addProduct(currentAlbum!);
                  console.log(currentAlbum);
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
