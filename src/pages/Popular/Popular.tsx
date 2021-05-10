import React, { useState, useEffect } from "react";
import "./Popular.scss";
import gsap from "gsap";
import Vinyl from "../../components/Vinyl/Vinyl";
import Loader from "../../components/Loader/Loader";
import toBase64 from "../../util/toBase64";
import { ProductStore } from "../../stores/productStore";
import { inject, observer } from "mobx-react";
import Title from "../../components/Title/Title";

interface PopularProps {
  productStore?: ProductStore;
}

const Popular: React.FC<PopularProps> = ({ productStore }: PopularProps) => {
  const [albums, setAlbums] = useState<Array<any> | undefined>();

  useEffect((): void => {
    (async (): Promise<void> => {
      setAlbums([...(await productStore?.fetchAll())]);
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
        {/* <GenreList title="Popular" link="popular"></GenreList> */}
        <Title title="Popular" link="popular"></Title>
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

export default inject("productStore")(observer(Popular));
