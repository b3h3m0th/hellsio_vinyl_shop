import { inject, observer } from "mobx-react";
import React, { useEffect } from "react";
import "./Wishlist.scss";
import { WishlistStore } from "../../stores/wishlistStore";
import Title from "../../components/Title/Title";
import { toJS } from "mobx";
import { useState } from "react";
import { ProductStore } from "../../stores/productStore";
import toBase64 from "../../util/toBase64";
import { CheckoutProduct, CheckoutStore } from "../../stores/checkoutStore";

interface WishlistProps {
  wishlistStore?: WishlistStore;
  productStore?: ProductStore;
  checkoutStore?: CheckoutStore;
}

const Wishlist: React.FC<WishlistProps> = ({
  wishlistStore,
  productStore,
  checkoutStore,
}: WishlistProps) => {
  const [products, setProducts] = useState<Array<any>>([]);

  console.log(toJS(wishlistStore?.products));
  console.log(products);

  useEffect(() => {
    (async () => {
      const response = await productStore?.fetchSome(
        wishlistStore?.products || []
      );
      console.log(response);
      setProducts([...response]);
    })();
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
        {!products || products.length === 0 ? (
          <div className="wishlist__wrapper__products__wrapper__empty">
            Your wishlist is empty ... The Void
          </div>
        ) : (
          <>
            {products?.map((p: any, index: number) => {
              return (
                <div
                  key={index}
                  className="wishlist__wrapper__products__wrapper__product"
                >
                  <img
                    className="wishlist__wrapper__products__wrapper__product__album-cover"
                    src={`data:image/png;base64,${toBase64(p.cover.data)}`}
                    alt="Hellsio album cover"
                  />
                  <div className="wishlist__wrapper__products__wrapper__product__name">
                    <p className="wishlist__wrapper__products__wrapper__product__name__title">
                      {p.name}
                    </p>
                    <p className="wishlist__wrapper__products__wrapper__product__name__artist">
                      {p.artist}
                    </p>
                  </div>
                  <div className="wishlist__wrapper__products__wrapper__product__price">
                    <div className="wishlist__wrapper__products__wrapper__product__price__price">
                      $ {p.price}
                    </div>
                    <div className="wishlist__wrapper__products__wrapper__product__price__per-item">
                      per item
                    </div>
                  </div>

                  <div className="wishlist__wrapper__products__wrapper__product__remove">
                    <span
                      className="wishlist__wrapper__products__wrapper__product__remove__text"
                      onClick={() => {
                        products.splice(index, 1);
                        wishlistStore?.removeProduct(
                          wishlistStore.products.findIndex(
                            (pr: string) => pr === p.code
                          )
                        );
                      }}
                    >
                      <img
                        src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzIgMTcyIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwxNzJ2LTE3MmgxNzJ2MTcyeiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxnIGZpbGw9IiNhZTBiMDAiPjxwYXRoIGQ9Ik0xNDkuODU1LDM3Ljg5NzMzYzI1Ljc4NTY3LDM0Ljk5NDgzIC0xOS4yOTI2Nyw3NS42MTU1IC0zMy44OTgzMyw4OC42NjZsLTI1LjIxMjMzLDIyLjA4MDVjLTIuNzE2MTcsMi4zNzkzMyAtNi43NzI1LDIuMzc5MzMgLTkuNDg4NjcsMGwtMjUuMjEyMzMsLTIyLjA4MDVjLTE0Ljg0MjE3LC0xMy4yNjU1IC02MS4xNjAzMywtNTUuMDA0MTcgLTMyLjU3OTY3LC05MC4zNzE2N2MzLjcxOTUsLTQuNjA4MTcgOC40NjM4MywtOC40MzUxNyAxMy44Mzg4MywtMTAuOTI5MTdjMTUuMDY0MzMsLTcuMDAxODMgMjguNjIzNjcsLTMuMTUzMzMgMzguMjQxMzMsMi43NTkxN2wtMTYuMTM5MzMsMzguNjg1NjdjLTAuOTg5LDIuMzU3ODMgMC43NDUzMyw0Ljk1OTMzIDMuMzAzODMsNC45NTkzM2gxOC45MmMyLjI2NDY3LDAgMy45NTYsMi4wNzExNyAzLjUxMTY3LDQuMjg1NjdsLTYuMTYzMzMsMjEuODUxMTdjLTAuNDQ0MzMsMi4yMjE2NyAyLjQ1ODE3LDMuNDgzIDMuNzc2ODMsMS42MzRsMjcuODY0LC0zNi40MzUzM2MxLjY5ODUsLTIuMzcyMTcgMCwtNS42Njg4MyAtMi45MTY4MywtNS42Njg4M2gtMTYuMjY4MzNjLTIuNTcyODMsMCAtNC4zMDcxNywtMi42MzAxNyAtMy4yODk1LC00Ljk5NTE3bDExLjExNTUsLTI1Ljg5MzE3YzcuOTQ3ODMsLTQuMTg1MzMgMTcuODgwODMsLTYuNjg2NSAyOS4zNDc1LC0zLjUwNDVjOC41MjExNywyLjM2NSAxNi4wMDMxNyw3LjgzMzE3IDIxLjI0OTE3LDE0Ljk1NjgzeiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"
                        alt="Hellsio remove from wishlist icon"
                        title="Remove from wishlist"
                        height="30px"
                      />
                    </span>
                  </div>
                  <div className="wishlist__wrapper__products__wrapper__product__add">
                    <span
                      className="wishlist__wrapper__products__wrapper__product__add__text"
                      onClick={() => {
                        wishlistStore?.removeProduct(
                          wishlistStore.products.findIndex(
                            (pr: string) => pr === p.code
                          )
                        );
                        products.splice(
                          products.findIndex((pr) => pr.code === p.code)
                        );
                        checkoutStore?.addProduct({
                          ...p,
                          amount: 1,
                        } as CheckoutProduct);
                      }}
                    >
                      Add to Cart
                    </span>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default inject(
  "wishlistStore",
  "productStore",
  "checkoutStore"
)(observer(Wishlist));
