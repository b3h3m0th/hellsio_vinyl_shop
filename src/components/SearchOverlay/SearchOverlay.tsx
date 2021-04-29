import React, { useEffect } from "react";
import { ProductStore } from "../../stores/productStore";
import { SearchStore } from "../../stores/searchStore";
import { inject, observer } from "mobx-react";
import "./SearchOverlay.scss";
import { toJS } from "mobx";
import SearchResult from "./SearchResult/SearchResult";
import Loader from "../Loader/Loader";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const search: () => void = () => {
    searchStore?.setLoading(true);
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

    searchStore?.setResults(
      results.map((r: any) => {
        return productStore?.products.find(
          (p: any) =>
            (p.code as string).replace(/-|_/g, " ").toUpperCase() === r.code
        );
      })
    );
    searchStore?.setLoading(false);
  };

  console.log(searchStore?.loading);

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
          }}
          onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
            e.keyCode === 13 ? search() : void 0;
          }}
        />
      </div>
      <div className="search-overlay__results">
        {searchStore?.loading ? (
          <Loader>Loading Products</Loader>
        ) : (
          searchStore?.results.map((r: any, i: number) => {
            return <SearchResult key={i} album={r} />;
          })
        )}
      </div>
    </div>
  );
};

export default inject("searchStore", "productStore")(observer(SearchOverlay));
