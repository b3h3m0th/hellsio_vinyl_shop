import React from "react";
import "./Vinyl.scss";
import { inject, observer } from "mobx-react";
import { LanguageStore } from "../../stores/languageStore";
import { Link } from "react-router-dom";

interface VinylProps {
  image: any;
  languageStore?: LanguageStore;
  id: string;
}

const Vinyl = ({ image, languageStore, id }: VinylProps) => {
  return (
    <Link to={`/${languageStore?.language}/products/${id}`}>
      <div className="vinyl-container">
        <img src={image} alt="Hellsio vinyl thumbnail" />
      </div>
    </Link>
  );
};

export default inject("languageStore")(observer(Vinyl));
