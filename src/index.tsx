import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider as StoreProvider } from "mobx-react";

import { burgerMenuStore } from "./stores/burgerMenuStore";
import { musicStore } from "./stores/musicStore";
import { languageStore } from "./stores/languageStore";

const stores = {
  burgerMenuStore,
  musicStore,
  languageStore,
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
