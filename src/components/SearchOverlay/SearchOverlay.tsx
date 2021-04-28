import React from "react";
import { SearchStore } from "../../stores/searchStore";
import "./SearchOverlay.scss";

interface SearchOverlayProps {
  searchStore?: SearchStore;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({
  searchStore,
}: SearchOverlayProps) => {
  return (
    <div className={`search-overlay`}>
      <div className="search-overlay__input">
        <input type="text" className="search-overlay__input__input" />
      </div>
    </div>
  );
};

export default SearchOverlay;
