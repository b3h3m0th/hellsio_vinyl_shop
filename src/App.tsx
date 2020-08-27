import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { inject, observer } from "mobx-react";
import Nav from "./components/Nav/Nav";

//pages
import Home from "./pages/Home";
import NewArrivals from "./pages/NewArrivals";

const pages = {
  home: Home,
  newArrivals: NewArrivals,
};

const App = () => {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/newarrivals" component={pages.newArrivals} />
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
