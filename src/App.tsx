import React from "react";
import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import Nav from "./components/Nav/Nav";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Nav />
        <div>moin</div>
      </div>
    </Router>
  );
};

export default App;
