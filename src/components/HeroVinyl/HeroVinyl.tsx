import React from "react";
import "./HeroVinyl.scss";
import { Link } from "react-router-dom";
import { LanguageStore } from "../../stores/languageStore";
import { inject, observer } from "mobx-react";

interface HeroVinylProps {
  img: string;
  name: string;
  productCode: string;
  languageStore?: LanguageStore;
}

const HeroVinyl: React.FC<HeroVinylProps> = ({
  img,
  name,
  languageStore,
  productCode,
}: HeroVinylProps) => {
  return (
    <div className="hero-vinyl">
      <Link to={`/${languageStore?.language}/products/${productCode}`}>
        <img src={img} alt="Hellsio hero vinyl" />
      </Link>

      <div className="hero-vinyl__link">
        <Link to={`/${languageStore?.language}/products/${productCode}`}>
          {name}
        </Link>
        <div className="hero-link__after"></div>
      </div>
    </div>
  );
};

export default inject("languageStore")(observer(HeroVinyl));
