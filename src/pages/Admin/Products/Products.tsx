import React, { useState, useEffect } from "react";
import Loader from "../../../components/Loader/Loader";
import toBase64 from "../../../util/toBase64";
import fetchData from "../fetchData";
import Product from "./Product/Product";
import "./Products.scss";

const Products: React.FC = () => {
  const [products, setProducts] = useState<any>();

  useEffect(() => {
    (async () => {
      setProducts(await fetchData(`products`));
    })();
  }, []);

  return (
    <div className="admin-products">
      <div className="admin-products__wrapper">
        {products ? (
          products.map((album: any, i: number) => {
            return (
              <Product
                key={i}
                name={album.name}
                artist={album.artist}
                image={`data:image/png;base64,${toBase64(album.cover.data)}`}
                price={album.price}
              ></Product>
            );
          })
        ) : (
          <Loader>Loading</Loader>
        )}
      </div>
    </div>
  );
};

export default Products;
