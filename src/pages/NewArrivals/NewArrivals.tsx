import React, { useState, useEffect } from "react";
import "./NewArrivals.scss";
import GenreList from "../../components/GenreList/GenreList";
import gsap from "gsap";
import Vinyl from "../../components/Vinyl/Vinyl";
import axios from "axios";
import toBase64 from "../../util/toBase64";
import Loader from "../../components/Loader/Loader";

const NewArrivals: React.FC = () => {
  const [albums, setAlbums] = useState<Array<any> | undefined>();

  useEffect(() => {
    (async () => {
      try {
        const albumsResponse = await axios.get(
          `${process.env.REACT_APP_BASE_API_URL}/product`
        );

        console.log(albumsResponse.data);
        setAlbums(
          albumsResponse.data
            .sort((a: any, b: any) => b.added_date - a.added_date)
            .reverse()
        );
      } catch (error) {}
    })();
  }, []);

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

export default NewArrivals;
