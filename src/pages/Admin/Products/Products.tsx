import React, { useState, useEffect } from "react";
import Loader from "../../../components/Loader/Loader";
import fetchData from "../fetchData";
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
      {products ? (
        products.map((album: any, i: number) => {
          return (
            <div className="admin-products__album" key={i}>
              {album.name}
            </div>
          );
        })
      ) : (
        <Loader>Loading</Loader>
      )}
    </div>
  );
};

export default Products;
