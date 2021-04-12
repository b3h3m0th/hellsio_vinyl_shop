import React from "react";

interface ProductProps {}

const Product: React.FC<ProductProps> = ({}: ProductProps) => {
  return (
    <div className="admin-product">
      <div></div>
    </div>
  );
};

export default Product;
