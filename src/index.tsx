import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider as StoreProvider } from "mobx-react";

import { burgerMenuStore } from "./stores/burgerMenuStore";
import { musicStore } from "./stores/musicStore";
import { languageStore } from "./stores/languageStore";
import { userStore } from "./stores/userStore";
import { checkoutStore } from "./stores/checkoutStore";
import { adminStore } from "./stores/adminStore";
import { productStore } from "./stores/productStore";
import { genreListStore } from "./stores/genreListStore";
import { cacheStore } from "./stores/cacheStore";
import { searchStore } from "./stores/searchStore";
import { redisStore } from "./stores/redisStore";
import { wishlistStore } from "./stores/wishlistStore";

require("dotenv").config({ path: "../" });

const stores = {
  burgerMenuStore,
  musicStore,
  languageStore,
  userStore,
  checkoutStore,
  adminStore,
  productStore,
  genreListStore,
  cacheStore,
  searchStore,
  redisStore,
  wishlistStore,
};

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider {...stores}>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
