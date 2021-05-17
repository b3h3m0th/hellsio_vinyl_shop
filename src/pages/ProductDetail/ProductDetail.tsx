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
import { RedisStore } from "../../stores/redisStore";
import { WishlistStore } from "../../stores/wishlistStore";
import Rating from "../../components/Rating/Rating";
import { addRate } from "./fetchData";
import axios from "axios";
import { UserStore } from "../../stores/userStore";
const arrowRight = require("../../assets/icons/arrowRight/arrowRightWhite.png");
const arrowRightSmall = require("../../assets/icons/arrowRightSmall/arrowRightSmall.svg");

export type AlbumData = {
  currentAlbum: any;
  followingAlbums: Array<any>;
  formates: { id: string; optionValue: any }[];
};

interface ProductDetailProps {
  match?: any;
  checkoutStore?: CheckoutStore;
  productStore?: ProductStore;
  languageStore?: LanguageStore;
  redisStore?: RedisStore;
  wishlistStore?: WishlistStore;
  userStore?: UserStore;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  match,
  checkoutStore,
  productStore,
  languageStore,
  redisStore,
  wishlistStore,
  userStore,
}: ProductDetailProps) => {
  const [albumData, setAlbumData] = useState<AlbumData>();
  const [is404, setIs404] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [albumRating, setAlbumRating] = useState<{
    average: number;
    ratings_count: number;
  }>({ average: 0, ratings_count: 0 });
  const [ratingAlert, setRatingAlert] = useState<string>();

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

      let formates = [...(await checkoutStore?.fetchFormates())].map(
        (format: any) => {
          return {
            id: format.name,
            optionValue: format.inches,
          };
        }
      );

      checkoutStore?.setMaxProductAddToCartAmount(
        await redisStore?.getValue("max-product-add-to-cart-amount")
      );

      setAlbumData({
        currentAlbum: currentAlbum,
        followingAlbums: followingAlbums,
        formates: formates,
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (albumData?.currentAlbum.code !== undefined) {
      (async () => {
        const ratingResponse = await axios.get(
          `${process.env.REACT_APP_BASE_API_URL}/rating/${albumData?.currentAlbum.code}`
        );
        setAlbumRating({
          average: Math.round(ratingResponse.data.average),
          ratings_count: ratingResponse.data.ratings_count,
        });
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [albumData?.currentAlbum, albumRating.average]);

  const handleRate: (value: number) => void = (value) => {
    if (!userStore?.loggedIn)
      return setRatingAlert("Please login before rating a product!");

    if (albumData?.currentAlbum.code) {
      (async () => {
        await addRate(value, albumData.currentAlbum.code);
        const ratingRollback = albumRating;
        setAlbumRating({
          average: value,
          ratings_count: albumRating.ratings_count,
        });
        setTimeout(() => {
          setAlbumRating(ratingRollback);
        }, 100);
        return setRatingAlert("Thanks for your Feedback");
      })();
    }
  };

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
                      <QuantityPicker
                        label="Quantity"
                        maxValue={checkoutStore?.maxProductAddToCartAmount || 5}
                        value={quantity}
                        setValue={setQuantity}
                      />
                    </div>
                    <div className="album-detail__price__content__right">
                      <p className="album-detail__price__content__right__per-item">
                        per item
                        {wishlistStore?.products.includes(
                          albumData?.currentAlbum.code
                        ) ? (
                          <img
                            src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzIgMTcyIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNS44LDI1LjgpIHNjYWxlKDAuNywwLjcpIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwxNzJ2LTE3MmgxNzJ2MTcyeiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxnIGZpbGw9IiNhZTBiMDAiPjxwYXRoIGQ9Ik0xMTYuNTAxMzMsMjEuNTM1ODNjLTE5LjY0MzgzLDAuODAyNjcgLTMwLjUwMTMzLDE0Ljk0MjUgLTMwLjUwMTMzLDE0Ljk0MjVjMCwwIC0xMC44NTc1LC0xNC4xMzk4MyAtMzAuNTAxMzMsLTE0Ljk0MjVjLTEzLjE3MjMzLC0wLjUzNzUgLTI1LjI0ODE3LDYuMDIgLTMzLjIwMzE3LDE2LjUzMzVjLTI3LjY3NzY3LDM2LjU3ODY3IDI0LjcyNSw3OS4zNzA4MyAzNy4wNTE2Nyw5MC44NTljNy4zNzQ1LDYuODcyODMgMTYuNDc2MTcsMTUuMDM1NjcgMjEuOTA4NSwxOS44NzMxN2MyLjcxNjE3LDIuNDIyMzMgNi43NjUzMywyLjQyMjMzIDkuNDgxNSwwYzUuNDMyMzMsLTQuODM3NSAxNC41MzQsLTEzLjAwMDMzIDIxLjkwODUsLTE5Ljg3MzE3YzEyLjMyNjY3LC0xMS40ODgxNyA2NC43MzY1LC01NC4yODAzMyAzNy4wNTE2NywtOTAuODU5Yy03Ljk0NzgzLC0xMC41MTM1IC0yMC4wMjM2NywtMTcuMDcxIC0zMy4xOTYsLTE2LjUzMzV6Ij48L3BhdGg+PC9nPjwvZz48L2c+PC9zdmc+"
                            alt="Hellsio wishlist icon"
                            width="40"
                            height="40"
                            style={{ marginLeft: "21px" }}
                            title="Remove from wishlist"
                            onClick={() => {
                              wishlistStore?.removeProduct(
                                wishlistStore.products.findIndex(
                                  (p: string) =>
                                    p === albumData?.currentAlbum.code
                                )
                              );
                            }}
                          ></img>
                        ) : (
                          <img
                            src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzIgMTcyIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwxNzJ2LTE3MmgxNzJ2MTcyeiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxnIGZpbGw9IiNhZTBiMDAiPjxwYXRoIGQ9Ik0xMTguMjUsMjEuNWMtMjAuNzQ3NSwwIC0zMi4yNSwxNC45NzgzMyAtMzIuMjUsMTQuOTc4MzNjMCwwIC0xMS41MDI1LC0xNC45NzgzMyAtMzIuMjUsLTE0Ljk3ODMzYy0yMS43NzIzMywwIC0zOS40MTY2NywxNy42NDQzMyAtMzkuNDE2NjcsMzkuNDE2NjdjMCwyOS44OTIxNyAzNS4yMDI2Nyw1OC44NTk4MyA0NS4wMTM4Myw2OC4wMTE2N2MxMS4zMDE4MywxMC41MzUgMjYuNjUyODMsMjQuMDggMjYuNjUyODMsMjQuMDhjMCwwIDE1LjM1MSwtMTMuNTQ1IDI2LjY1MjgzLC0yNC4wOGM5LjgxMTE3LC05LjE1MTgzIDQ1LjAxMzgzLC0zOC4xMTk1IDQ1LjAxMzgzLC02OC4wMTE2N2MwLC0yMS43NzIzMyAtMTcuNjQ0MzMsLTM5LjQxNjY3IC0zOS40MTY2NywtMzkuNDE2Njd6TTEwNi4xNDU1LDExNS40NTVjLTEuMjY4NSwxLjE0NjY3IC0yLjM3MjE3LDIuMTQyODMgLTMuMjY4LDIuOTgxMzNjLTUuMzgyMTcsNS4wMTY2NyAtMTEuNzQ2MTcsMTAuNzcxNSAtMTYuODc3NSwxNS4zNzI1Yy01LjEzMTMzLC00LjYwMSAtMTEuNTAyNSwtMTAuMzYzIC0xNi44Nzc1LC0xNS4zNzI1Yy0wLjkwMywtMC44Mzg1IC0yLjAwNjY3LC0xLjg0MTgzIC0zLjI2OCwtMi45ODEzM2MtMTAuMTc2NjcsLTkuMTk0ODMgLTM3LjE4NzgzLC0zMy42MTg4MyAtMzcuMTg3ODMsLTU0LjUzODMzYzAsLTEzLjgzMTY3IDExLjI1MTY3LC0yNS4wODMzMyAyNS4wODMzMywtMjUuMDgzMzNjMTMuMDkzNSwwIDIwLjY4Myw5LjEzNzUgMjAuODgzNjcsOS4zNzRsMTEuMzY2MzMsMTIuMTI2bDExLjM2NjMzLC0xMi4xMjZjMC4wNzE2NywtMC4wOTMxNyA3Ljc5MDE3LC05LjM3NCAyMC44ODM2NywtOS4zNzRjMTMuODMxNjcsMCAyNS4wODMzMywxMS4yNTE2NyAyNS4wODMzMywyNS4wODMzM2MwLDIwLjkxOTUgLTI3LjAxMTE3LDQ1LjM0MzUgLTM3LjE4NzgzLDU0LjUzODMzeiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"
                            alt="Hellsio wishlist icon"
                            style={{ marginLeft: "27px" }}
                            width="28"
                            height="28"
                            title="Add to wishlist"
                            onClick={() =>
                              wishlistStore?.addProduct(
                                albumData?.currentAlbum.code
                              )
                            }
                          ></img>
                        )}
                      </p>
                      <DropDownPicker
                        label="Format"
                        options={albumData?.formates || []}
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
                      checkoutStore?.addProduct({
                        ...albumData?.currentAlbum,
                        amount: quantity,
                      });
                    }}
                  />
                  <div className="album-detail__price__rating">
                    <Rating
                      value={albumRating.average}
                      length={5}
                      label={`Product Rating (${albumRating.ratings_count} ratings): `}
                      onRate={(value) => {
                        handleRate(value);
                        setTimeout(() => {
                          setRatingAlert(undefined);
                        }, 2000);
                      }}
                    />
                    <span className="rating-feedback">
                      {ratingAlert ? ratingAlert : ""}
                    </span>
                  </div>
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
  "productStore",
  "redisStore",
  "wishlistStore",
  "userStore"
)(observer(ProductDetail));
