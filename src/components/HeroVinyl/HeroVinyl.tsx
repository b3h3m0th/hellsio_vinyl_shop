import React from "react";
import "./HeroVinyl.scss";
import { Link } from "react-router-dom";
import { LanguageStore } from "../../stores/languageStore";
import { inject, observer } from "mobx-react";

interface HeroVinylProps {
  img: string;
  genre: string;
  productID: string;
  languageStore?: LanguageStore;
}

const HeroVinyl = ({
  img,
  genre,
  languageStore,
  productID,
}: HeroVinylProps) => {
  return (
    <div className="hero-vinyl">
      <Link to={`/${languageStore?.language}/products/${productID}`}>
        <img src={img} alt="Hellsio hero vinyl" />
      </Link>

      <div className="hero-vinyl__link">
        <Link to={`/${languageStore?.language}/newarrivals`}>{genre}</Link>
        <div className="hero-link__after"></div>
      </div>
    </div>
  );
};

export default inject("languageStore")(observer(HeroVinyl));
