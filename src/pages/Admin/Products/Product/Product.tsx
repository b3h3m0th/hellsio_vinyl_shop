import React, { useRef, useState } from "react";
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
  const [editable, setEditable] = useState<boolean>(false);
  const nameRef = useRef<HTMLDivElement>(null);
  const artistRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLElement>(null);

  const [updatedValues, setUpdatedValues] = useState<{
    name: string;
    artist: string;
    price: number;
  }>({
    name: name,
    artist: artist,
    price: +price,
  });

  const save = () => {
    setEditable(false);
  };
  return (
    <div className="admin-product">
      <img
        src={image}
        alt="Hellsio Vinyl Cover"
        className="admin-product__img"
      />
      <div className="admin-product__header">
        <div className="admin-product__header__title" ref={nameRef}>
          {name}
        </div>
        <div className="admin-product__header__artist" ref={artistRef}>
          {artist}
        </div>
      </div>
      <div className="admin-product__price">
        <div className="admin-product__price__price">
          $
          <span
            contentEditable={editable}
            onInput={(e: React.FormEvent<HTMLElement>) =>
              setUpdatedValues({
                name: updatedValues.name,
                artist: updatedValues.artist,
                price: +e.currentTarget.innerText,
              })
            }
            ref={priceRef}
            suppressContentEditableWarning={true}
          >
            {price}
          </span>
        </div>
        <span className="admin-product__price__per-item">per item</span>
      </div>
      <div className="admin-product__actions">
        <span
          className="admin-product__actions__edit"
          onClick={() => {
            setEditable((prev: boolean) => !prev);
            editable ? (priceRef.current!.innerText = price) : void 0;
          }}
        >
          {editable ? "Cancel" : "Edit"}
        </span>
        {editable && (
          <span className="admin-product__actions__save" onClick={() => save()}>
            Save
          </span>
        )}
      </div>
    </div>
  );
};

export default Product;
