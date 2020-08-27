import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav";

//pages
import Home from "./pages/Home";
import Products from "./pages/Products";

const pages = {
  home: Home,
  products: Products,
};

const App = () => {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/products" component={pages.products} />
          <Route path="/" component={pages.home} />
        </Switch>
      </Router>

      <div>content</div>
      <div>more content</div>
      <div>event more content</div>
    </div>
  );
};

export default App;
