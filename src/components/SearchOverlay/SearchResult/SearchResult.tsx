import React from "react";
import { Link } from "react-router-dom";
import { LanguageStore } from "../../../stores/languageStore";
import toBase64 from "../../../util/toBase64";
import { inject, observer } from "mobx-react";
import "./SearchResult.scss";

interface SearchResultProps {
  album: any & { code: string };
  languageStore?: LanguageStore;
}

const SearchResult: React.FC<SearchResultProps> = ({
  album,
  languageStore,
}: SearchResultProps) => {
  return (
    <Link to={`/${languageStore?.language}/products/${album.code}`}>
      <div className="search-result">
        <img
          src={`data:image/png;base64,${toBase64(album.cover.data)}`}
          alt="Hellsio Vinyl Covewr"
          className="search-result__img"
        />
        <div className="search-result__title">
          {(album.code as string).replace(/_/g, " ").toUpperCase()}
        </div>
      </div>
    </Link>
  );
};

export default inject("languageStore")(observer(SearchResult));
