import React from "react";
import "./SearchOverlay.scss";

interface SearchOverlayProps {}

const SearchOverlay: React.FC<SearchOverlayProps> = ({}: SearchOverlayProps) => {
  return (
    <div className="search-overlay">
      <div></div>
    </div>
  );
};

export default SearchOverlay;
