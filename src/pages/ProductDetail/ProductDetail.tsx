import React, { useState, useEffect } from "react";
import "./ProductDetail.scss";
import gsap from "gsap";
import { inject, observer } from "mobx-react";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { Link } from "react-router-dom";
import { toJS } from "mobx";
import QuantityPicker from "../../components/QuantityPicker/QuantityPicker";
import DropDownPicker from "../../components/DropDownPicker/DropDownPicker";
import { CheckoutStore } from "../../stores/checkoutStore";
import toBase64 from "../../util/toBase64";
import { ProductStore } from "../../stores/productStore";
import { LanguageStore } from "../../stores/languageStore";
import Display404 from "../../components/Display404/Display404";
const arrowRight = require("../../assets/icons/arrowRight/arrowRightWhite.png");
const arrowRightSmall = require("../../assets/icons/arrowRightSmall/arrowRightSmall.svg");

export type AlbumData = { currentAlbum: any; followingAlbums: Array<any> };

interface ProductDetailProps {
  match?: any;
  checkoutStore?: CheckoutStore;
  productStore?: ProductStore;
  languageStore?: LanguageStore;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  match,
  checkoutStore,
  productStore,
  languageStore,
}: ProductDetailProps) => {
  const [albumData, setAlbumData] = useState<AlbumData>();
  const [is404, setIs404] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const currentAlbum = await productStore?.fetch(
        `${match.params.albumCode}`
      );

      if (currentAlbum === -1) setIs404(true);

      const parsedAlbums: any[] =
        productStore?.products.length !== 0
          ? productStore?.products
          : toJS(await productStore?.fetchAll());
      const startIndex: number =
        parsedAlbums.findIndex(
          (product: any) => product.code === currentAlbum.code
        ) + 1;
      const followingProductsCount = 3;
      let followingAlbums: any[] = [];

      for (let i = 0; i < followingProductsCount; i++) {
        followingAlbums.push(
          parsedAlbums[(startIndex + i) % parsedAlbums.length]
        );
      }

      setAlbumData({
        currentAlbum: currentAlbum,
        followingAlbums: followingAlbums,
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match]);

  const albums = productStore?.products;
  let linkNextAlbumIndex: number =
    albums!.findIndex((album) => album.code === albumData?.currentAlbum.code) +
    1;
  if (linkNextAlbumIndex > albums!.length - 1) linkNextAlbumIndex = 0;
  let linkPreviousAlbumIndex: number = linkNextAlbumIndex - 2;
  if (linkPreviousAlbumIndex < 0) linkPreviousAlbumIndex = albums!.length - 2;

  const linkNext = `/${languageStore?.language}/products/${
    albums![linkNextAlbumIndex]?.code
  }`;
  const linkPrevious = `/${languageStore?.language}/products/${
    albums![linkPreviousAlbumIndex]?.code
  }`;

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
  }, []);

  console.log(albumData?.currentAlbum);

  return (
    <div className="product-detail">
      {is404 ? (
        <Display404
          header="Back into the Ocean"
          text="
          Woah, you have travelled beyond the horizon..."
        ></Display404>
      ) : (
        <>
          <div className="product-detail__album-title">
            <h2 className="product-detail__album-title__title">
              {albumData?.currentAlbum?.name}
            </h2>
            <h3 className="product-detail__album-title__subtitle">
              {albumData?.currentAlbum?.artist}
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
              <img
                src={`data:image/png;base64,${toBase64(
                  albumData?.currentAlbum?.cover.data
                )}`}
                alt="Hellsio album cover"
              />
            </div>
            <div className="product-detail__nav__next-albums">
              {albumData?.followingAlbums.map((album: any, i: number) => {
                return (
                  <Link
                    to={`/${languageStore?.language}/products/${album.code}`}
                    className="product-detail__nav__next-albums__album"
                    key={i}
                  >
                    <img
                      src={`data:image/png;base64,${toBase64(
                        album?.cover.data
                      )}`}
                      alt="Hellsio album cover"
                      key={i}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="product-detail__background-container">
            <img
              src={`data:image/png;base64,${toBase64(
                albumData?.currentAlbum?.cover.data
              )}`}
              alt={`Hellsio album cover ${albumData?.currentAlbum?.name}`}
              className="product-detail__background-container__img"
            />
          </div>
          <div className="product-detail__content">
            <div className="product-detail__content__wrapper">
              <div className="album-detail">
                <div className="album-detail__tracklist">
                  <h4>Tracklist</h4>
                  <div className="album-detail__tracklist__tracks">
                    {albumData?.currentAlbum?.tracks?.map(
                      (track: any, index: any) => {
                        return (
                          <p key={index} className="tracks_track">
                            {(index + 1).toString().length > 1
                              ? index + 1
                              : "0" + (index + 1)}{" "}
                            - {track.title}
                          </p>
                        );
                      }
                    )}
                  </div>
                </div>
                <div className="album-detail__price">
                  <div className="album-detail__price__content">
                    <div className="album-detail__price__content__left">
                      <p className="album-detail__price__content__price">
                        $ {albumData?.currentAlbum?.price}
                      </p>
                      <QuantityPicker label="Quantity" maxValue={5} />
                    </div>
                    <div className="album-detail__price__content__right">
                      <p className="album-detail__price__content__right__per-item">
                        per item
                      </p>
                      <DropDownPicker
                        label="Format"
                        options={[
                          {
                            id: albumData?.currentAlbum?.format,
                            price: albumData?.currentAlbum?.price,
                          },
                        ]}
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
                      checkoutStore?.addProduct(albumData?.currentAlbum!);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default inject(
  "languageStore",
  "checkoutStore",
  "productStore"
)(observer(ProductDetail));
