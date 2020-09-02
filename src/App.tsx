import React from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { inject, observer } from "mobx-react";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";

import { LanguageStore } from "./stores/languageStore";

//pages
import Home from "./pages/Home/Home";
import NewArrivals from "./pages/NewArrivals/NewArrivals";
import Featured from "./pages/Featured/Featured";
import Popular from "./pages/Popular/Popular";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Checkout from "./pages/Checkout/Checkout";

const pages = {
  home: Home,
  newArrivals: NewArrivals,
  featured: Featured,
  popular: Popular,
  productDetail: ProductDetail,
  checkout: Checkout,
};

interface AppProps {
  languageStore?: LanguageStore;
}

const App = ({ languageStore }: AppProps) => {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Switch>
          {/* nav pages */}
          <Route
            exact
            path={`/${languageStore?.language}/newarrivals`}
            component={pages.newArrivals}
          />
          <Route
            exact
            path={`/${languageStore?.language}/featured`}
            component={pages.featured}
          />
          <Route
            exact
            path={`/${languageStore?.language}/popular`}
            component={pages.popular}
          />

          <Route
            exact
            path={`/${languageStore?.language}/checkout`}
            component={pages.checkout}
          />

          {/* products page */}
          <Route
            exact
            path={`/${languageStore?.language}/products`}
            component={pages.productDetail}
          ></Route>

          {/* genres page */}
          <Route
            exact
            path={`/${languageStore?.language}/genres`}
            component={pages.productDetail}
          ></Route>

          {/* product detail page */}
          <Route
            exact
            path={`/${languageStore?.language}/products/:albumID`}
            component={pages.productDetail}
          ></Route>

          {/* Home */}
          <Route
            exact
            path={`/${languageStore?.language}`}
            component={pages.home}
          />
          <Route
            path={`/`}
            component={() => <Redirect to={`/${languageStore?.language}`} />}
          />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default inject("languageStore")(observer(App));
