import React, { useState } from "react";
import { Album } from "../../models/Album";
import "./ProductDetail.scss";
const albumData: Album[] = require("../../data/products.json");

interface ProductDetailProps {
  match?: any;
}

const ProductDetail = ({ match }: ProductDetailProps) => {
  const [productUrlData] = useState(match);
  console.log(productUrlData);
  const album = albumData.find((al) => al.id === match.params.albumID);

  //   const getAlbumData = async (albumID: string) => {
  //     const albumData = await fetch("");
  //   };

  console.log("correct album", album);
  return (
    <div className="product-detail">
      <div>{productUrlData.params.albumID}</div>
    </div>
  );
};

export default ProductDetail;
