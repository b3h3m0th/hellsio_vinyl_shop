import { inject, observer } from "mobx-react";
import React, { useEffect } from "react";
import "./Wishlist.scss";
import { WishlistStore } from "../../stores/wishlistStore";
import Title from "../../components/Title/Title";
import { toJS } from "mobx";
import { useState } from "react";
import { ProductStore } from "../../stores/productStore";

interface WishlistProps {
  wishlistStore?: WishlistStore;
  productStore?: ProductStore;
}

const Wishlist: React.FC<WishlistProps> = ({
  wishlistStore,
  productStore,
}: WishlistProps) => {
  const [products, setProducts] = useState<Array<any>>();

  console.log(toJS(wishlistStore?.products));
  console.log(products);

  useEffect(() => {
    wishlistStore?.products.forEach((p: any) => {
      (async () => {
        setProducts([...(products || []), await productStore?.fetch(p)]);
      })();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wishlistStore?.products]);

  return (
    <div className="wishlist">
      <div className="wishlist__nav">
        <div className="wishlist__nav__content">
          <Title title="Wishlist" link="wishlist" />
        </div>
      </div>
      <div className="wishlist__wrapper">
        {products?.map((p: any) => {
          return <p>{p.name}</p>;
        })}
      </div>
    </div>
  );
};

export default inject("wishlistStore", "productStore")(observer(Wishlist));
