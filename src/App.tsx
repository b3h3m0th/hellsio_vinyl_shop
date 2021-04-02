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
import ShoppingBag from "./pages/ShoppingBag/ShoppingBag";
import Admin from "./pages/Admin/Admin";
import { AdminStore } from "./stores/adminStore";
import AdminLogin from "./pages/AdminLogin/AdminLogin";

const pages = {
  home: Home,
  newArrivals: NewArrivals,
  featured: Featured,
  popular: Popular,
  productDetail: ProductDetail,
  shoppingBag: ShoppingBag,
  admin: Admin,
  adminLogin: AdminLogin,
};

interface AppProps {
  languageStore?: LanguageStore;
  adminStore?: AdminStore;
}

const App: React.FC<AppProps> = ({ languageStore, adminStore }: AppProps) => {
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
            path={`/${languageStore?.language}/shopping-bag`}
            component={pages.shoppingBag}
          />

          {/* products page */}
          <Route
            exact
            path={`/${languageStore?.language}/products`}
            component={pages.newArrivals}
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

          {/* Admin */}
          <Route
            path={`/${languageStore?.language}/${process.env.REACT_APP_ADMIN_LOGIN_PATH_HASH}/admin`}
            component={
              adminStore?.isLoggedIn()
                ? pages.admin
                : () => (
                    <Redirect
                      to={`/${languageStore?.language}/${process.env.REACT_APP_ADMIN_LOGIN_PATH_HASH}/admin-login`}
                    />
                  )
            }
          ></Route>

          <Route
            path={`/${languageStore?.language}/${process.env.REACT_APP_ADMIN_LOGIN_PATH_HASH}/admin-login`}
            component={pages.adminLogin}
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

export default inject("languageStore", "adminStore")(observer(App));
