import React, { useState, useEffect } from "react";
import "./NewArrivals.scss";
import GenreList from "../../components/GenreList/GenreList";
import gsap from "gsap";
import Vinyl from "../../components/Vinyl/Vinyl";
import toBase64 from "../../util/toBase64";
import Loader from "../../components/Loader/Loader";
import { ProductStore } from "../../stores/productStore";
import { inject, observer } from "mobx-react";

interface NewArrivalsProps {
  productStore?: ProductStore;
}

const NewArrivals: React.FC<NewArrivalsProps> = ({
  productStore,
}: NewArrivalsProps) => {
  const [albums, setAlbums] = useState<Array<any> | undefined>();

  useEffect((): void => {
    (async (): Promise<void> => {
      setAlbums([...(await productStore?.fetchAll())].reverse());
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
        stagger: 0.1,
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
              albums.map((album: any, i: number) => {
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
              <Loader>Loading Products</Loader>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default inject("productStore")(observer(NewArrivals));
