import React, { useState, useEffect } from "react";
import "./NewArrivals.scss";
import gsap from "gsap";
import Vinyl from "../../components/Vinyl/Vinyl";
import toBase64 from "../../util/toBase64";
import Loader from "../../components/Loader/Loader";
import { ProductStore } from "../../stores/productStore";
import { inject, observer } from "mobx-react";
import GenreList from "../../components/GenreList/GenreList";
import { GenreListStore } from "../../stores/genreListStore";

interface NewArrivalsProps {
  productStore?: ProductStore;
  genreListStore?: GenreListStore;
}

const NewArrivals: React.FC<NewArrivalsProps> = ({
  productStore,
  genreListStore,
}: NewArrivalsProps) => {
  const [albums, setAlbums] = useState<Array<any> | undefined>();

  useEffect((): void => {
    (async (): Promise<void> => {
      setAlbums([...(await productStore?.fetchNewArrivals())]);
    })();
  }, [productStore]);

  useEffect(() => {
    gsap.fromTo(
      ".vinyl-container",
      1,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        stagger: 0.05,
        opacity: 1,
      }
    );
  });

  return (
    <div className="new-arrivals">
      <div className="new-arrivals__genres">
        <GenreList title="New Arrivals" link="newarrivals"></GenreList>
      </div>
      <div className="new-arrivals__albums">
        <div className="new-arrivals__albums__wrapper">
          <div className="new-arrivals__albums__wrapper__grid">
            {albums ? (
              [
                ...albums.filter((a: any) =>
                  genreListStore?.genres
                    .filter((g: any) => g.checked)
                    .map((g: any) => g.name)
                    .includes(a.genre)
                ),
              ].length > 0 ? (
                [
                  ...albums.filter((a: any) =>
                    genreListStore?.genres
                      .filter((g: any) => g.checked)
                      .map((g: any) => g.name)
                      .includes(a.genre)
                  ),
                ].map((album: any, i: number) => {
                  return (
                    <Vinyl
                      image={`data:image/png;base64,${toBase64(
                        album.cover.data
                      )}`}
                      id={album.code}
                      key={i}
                    ></Vinyl>
                  );
                })
              ) : (
                <div className="new-arrivals__albums__wrapper__grid__no-results">
                  No Results :/
                </div>
              )
            ) : (
              <Loader>Loading Products</Loader>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default inject("productStore", "genreListStore")(observer(NewArrivals));
