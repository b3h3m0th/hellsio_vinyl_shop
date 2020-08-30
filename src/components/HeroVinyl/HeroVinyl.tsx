import React from "react";
import "./HeroVinyl.scss";
import { Link } from "react-router-dom";
import { LanguageStore } from "../../stores/languageStore";
import { inject, observer } from "mobx-react";

interface HeroVinylProps {
  img: string;
  genre: string;
  languageStore?: LanguageStore;
}

const HeroVinyl = ({ img, genre, languageStore }: HeroVinylProps) => {
  return (
    <div className="hero-vinyl">
      <Link to={`/${languageStore?.language}/newarrivals`}>
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
