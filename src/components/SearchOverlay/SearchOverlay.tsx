import React, { useEffect } from "react";
import { ProductStore } from "../../stores/productStore";
import { SearchStore } from "../../stores/searchStore";
import { inject, observer } from "mobx-react";
import "./SearchOverlay.scss";
import { toJS } from "mobx";

const searchIcon = require("../../assets/icons/search/search_web_red.png");

interface SearchOverlayProps {
  searchStore?: SearchStore;
  productStore?: ProductStore;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({
  searchStore,
  productStore,
}: SearchOverlayProps) => {
  useEffect(() => {
    (async () => {
      productStore?.setProducts(await productStore.fetchAll());
    })();
  }, []);

  const search: () => void = () => {
    const products = toJS(productStore?.products)?.map((p: any) => {
      return {
        code: (p.code as string).replace(/-|_/g, " ").toUpperCase(),
      };
    });

    let results: Array<any> = [];

    for (let i = 0; i < (products || []).length; i++) {
      if (
        products![i].code.indexOf(searchStore!.query.toLocaleUpperCase()) > -1
      ) {
        results.push(products![i]);
      }
    }

    return searchStore?.setResults(results);
  };

  return (
    <div className={`search-overlay`}>
      <div className="search-overlay__input">
        <img src={searchIcon} alt="Hellsio Search Icon" />
        <input
          type="text"
          className="search-overlay__input__input"
          placeholder="The fuck are you looking for?"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            searchStore?.setQuery(e.target.value);
            search();
          }}
          onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) =>
            e.keyCode === 27 ? searchStore?.close() : void 0
          }
        />
      </div>
      <div className="search-overlay__results">
        {searchStore?.results.map((r: any, i: number) => {
          return <p key={i}>{r.code}</p>;
        })}
      </div>
    </div>
  );
};

export default inject("searchStore", "productStore")(observer(SearchOverlay));
