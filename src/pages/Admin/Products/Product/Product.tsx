import React from "react";
import "./Product.scss";

interface ProductProps {
  name: string;
  artist: string;
  image: string;
  price: string;
}

const Product: React.FC<ProductProps> = ({
  name,
  artist,
  image,
  price,
}: ProductProps) => {
  return (
    <div className="admin-product">
      <img
        src={image}
        alt="Hellsio Vinyl Cover"
        className="admin-product__img"
      />
      <div className="admin-product__header">
        <div className="admin-product__header__title">{name}</div>
        <div className="admin-product__header__artist">{artist}</div>
      </div>
      <div className="admin-product__price">
        <div className="admin-product__price__price">$ {price}</div>
        <span className="admin-product__price__per-item">per item</span>
      </div>
      <div className="admin-product__actions">
        <span className="admin-product__actions__delete">Delete</span>
      </div>
    </div>
  );
};

export default Product;
