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

const pages = {
  home: Home,
  newArrivals: NewArrivals,
  featured: Featured,
  popular: Popular,
};

interface AppProps {
  languageStore?: LanguageStore;
}

const App = ({ languageStore }: AppProps) => {
  return (
    <div className="App">
      <Router>
        <Redirect to={`/${languageStore?.language}`} />
        <Nav />
        <Switch>
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
          {/* Redirect to Home */}
          <Route path={`/${languageStore?.language}`} component={pages.home} />
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
