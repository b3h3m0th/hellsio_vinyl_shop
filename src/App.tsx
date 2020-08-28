import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { inject, observer } from "mobx-react";
import Nav from "./components/Nav/Nav";

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

const App = () => {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/newarrivals" component={pages.newArrivals} />
          <Route exact path="/featured" component={pages.featured} />
          <Route exact path="/popular" component={pages.popular} />
          <Route path="/" component={pages.home} />
        </Switch>
      </Router>

      <div>content</div>
      <div>more content</div>
      <div>event more content</div>
    </div>
  );
};

export default inject("burgerMenuStore")(observer(App));
