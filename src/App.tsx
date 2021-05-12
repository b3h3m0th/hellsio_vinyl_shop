import React, { useEffect } from "react";
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
import { AdminStore } from "./stores/adminStore";
import { UserStore } from "./stores/userStore";

//pages
import Home from "./pages/Home/Home";
import NewArrivals from "./pages/NewArrivals/NewArrivals";
import Featured from "./pages/Featured/Featured";
import Popular from "./pages/Popular/Popular";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import ShoppingBag from "./pages/ShoppingBag/ShoppingBag";
import Admin from "./pages/Admin/Admin";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import Checkout from "./pages/Checkout/Checkout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeConstructorOptions } from "@stripe/stripe-js";
import OrderPlaced from "./pages/OrderPlaced/OrderPlaced";
import CookieConsent from "react-cookie-consent";
import EmailVerified from "./pages/EmailVerified/EmailVerified";
import { RedisStore } from "./stores/redisStore";

const pages = {
  home: Home,
  newArrivals: NewArrivals,
  featured: Featured,
  popular: Popular,
  productDetail: ProductDetail,
  shoppingBag: ShoppingBag,
  admin: Admin,
  adminLogin: AdminLogin,
  checkout: Checkout,
  orderPlaced: OrderPlaced,
  emailVerified: EmailVerified,
};

interface AppProps {
  languageStore?: LanguageStore;
  adminStore?: AdminStore;
  userStore?: UserStore;
  redisStore?: RedisStore;
}

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLIC_KEY || "",
  { locale: "en" } as StripeConstructorOptions
);

const App: React.FC<AppProps> = ({
  languageStore,
  adminStore,
  userStore,
  redisStore,
}: AppProps) => {
  useEffect(() => {
    (async (): Promise<void> => {
      await adminStore?.isLoggedIn();
      document.documentElement.style.setProperty(
        "--color-red",
        `#${await redisStore?.getValue("accent-color")}`
      );
    })();
  }, [adminStore]);

  return (
    <div className="App">
      <Elements stripe={stripePromise}>
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

            <Route
              exact
              path={`/${languageStore?.language}/checkout`}
              component={pages.checkout}
            ></Route>

            <Route
              exact
              path={`/${languageStore?.language}/order-placed`}
              component={pages.orderPlaced}
            ></Route>

            <Route
              exact
              path={`/${languageStore?.language}/email-verified`}
              component={pages.emailVerified}
            ></Route>

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
              path={`/${languageStore?.language}/products/:albumCode`}
              component={pages.productDetail}
            ></Route>

            {/* Admin */}
            <Route
              path={`/${languageStore?.language}/admin`}
              component={
                adminStore?.loggedIn
                  ? pages.admin
                  : () => (
                      <Redirect
                        to={`/${languageStore?.language}/admin-login`}
                      />
                    )
              }
            ></Route>
            <Route
              path={`/${languageStore?.language}/admin-login`}
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

          <CookieConsent
            location="bottom"
            buttonText="Got it!"
            cookieName="hellsioCookieConsent"
            style={{
              background: "var(--color-black-transparent)",
              opacity: "",
            }}
            buttonStyle={{
              color: "white",
              fontSize: "13px",
              background: "var(--color-red)",
              marginRight: "100px",
              padding: "5px 20px 5px 20px",
            }}
            expires={100}
            overlay
          >
            Hellsio uses cookies to enhance the user experience.
          </CookieConsent>
        </Router>
      </Elements>
    </div>
  );
};

export default inject(
  "languageStore",
  "adminStore",
  "userStore",
  "redisStore"
)(observer(App));
