import React, { useEffect } from "react";
import { ProductStore } from "../../stores/productStore";
import { SearchStore } from "../../stores/searchStore";
import { inject, observer } from "mobx-react";
import "./SearchOverlay.scss";
import { toJS } from "mobx";
import SearchResult from "./SearchResult/SearchResult";
import Loader from "../Loader/Loader";
import gsap from "gsap/all";

const searchIcon = require("../../assets/icons/search/search_web_red.png");
const closeIcon = require("../../assets/icons/close/closeIcon.png");

export const NoResultsFoundError = "No Results Error :(" as const;

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

    searchStore?.setProducts([
      ...(toJS(productStore?.products)?.map((p: any) => {
        return {
          code: (p.code as string).replace(/-|_/g, " ").toUpperCase(),
        };
      }) || []),
    ]);

    gsap.fromTo(
      ".search-overlay",
      1,
      {
        opacity: 0,
      },
      {
        opacity: 1,
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".search-result",
      0.6,
      {
        opacity: 0,
        x: 40,
      },
      {
        x: 0,
        opacity: 1,
        stagger: 0.1,
        ease: "power2",
      }
    );
  });

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

    if (results.length === 0) {
      searchStore?.setResults([NoResultsFoundError]);
    } else {
      searchStore?.setResults(
        results.map((r: any) => {
          return productStore?.products.find(
            (p: any) =>
              (p.code as string).replace(/-|_/g, " ").toUpperCase() === r.code
          );
        })
      );
    }
  };

  return (
    <div className={`search-overlay`}>
      <div className="search-overlay__input">
        <img
          src={searchIcon}
          alt="Hellsio Search Icon"
          className="search-overlay__input__search-icon"
        />
        <input
          type="text"
          className="search-overlay__input__input"
          placeholder="The fuck are you looking for?"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            searchStore?.setQuery(e.target.value);
            searchStore?.setLoading(true);
            search();
            setTimeout(() => {
              searchStore?.setLoading(false);
            }, 100);
          }}
          onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.keyCode === 13) search();
            else if (e.keyCode === 27) searchStore?.close();
          }}
        />
        <div
          className="search-overlay__input__close"
          onMouseUp={() => {
            searchStore?.close();
          }}
        >
          <img
            src={closeIcon}
            alt="Hellsio Close Icon"
            className="search-overlay__input__close__close-icon"
          />
        </div>
      </div>
      <div className="search-overlay__results">
        {searchStore?.loading === true ? (
          <Loader>Loading Products</Loader>
        ) : (
          searchStore?.results.map((r: any, i: number) => {
            return r === NoResultsFoundError ? (
              <span key={i}>{r}</span>
            ) : (
              <SearchResult
                key={i}
                album={r}
                onClick={() => setTimeout(() => searchStore.close(), 200)}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default inject("searchStore", "productStore")(observer(SearchOverlay));
