import React from "react";
import "./Admin.scss";
import { Switch, Route, useRouteMatch, Redirect, Link } from "react-router-dom";
import { inject, observer } from "mobx-react";

//admin pages
import Orders from "./Orders/Orders";
import Customers from "./Customers/Customers";
import Products from "./Products/Products";
import Title from "../../components/Title/Title";
import { AdminStore } from "../../stores/adminStore";
import { LanguageStore } from "../../stores/languageStore";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
const arrowRight = require("../../assets/icons/arrowRight/arrowRightWhite.png");

const adminPages = {
  orders: Orders,
  customers: Customers,
  products: Products,
} as const;

interface AdminProps {
  adminStore?: AdminStore;
  languageStore?: LanguageStore;
}

const Admin: React.FC<AdminProps> = ({
  adminStore,
  languageStore,
}: AdminProps) => {
  const { path } = useRouteMatch();

  const endpoint = window.location.href.split("/").reverse()[0];
  const databaseTableURL: string = `${
    process.env.REACT_APP_BASE_DATABASE_URL
  }&table=${
    endpoint === "orders"
      ? "invoice"
      : endpoint === "products"
      ? "album"
      : "user"
  }&pos=0`;

  const handleLogout: () => void = () => {
    adminStore?.logout();
  };

  return (
    <div className="admin">
      <div className="admin__sidenav">
        <div className="admin__sidenav__nav">
          <Title
            title="Administrator"
            link={`${path.split("/").slice(2).join("/")}`}
          />
          <Link to={`${path}/orders`} className={`admin__sidenav__nav__link`}>
            Orders
          </Link>
          <Link to={`${path}/products`} className={`admin__sidenav__nav__link`}>
            Products
          </Link>
          <Link
            to={`${path}/customers`}
            className={`admin__sidenav__nav__link`}
          >
            Customers
          </Link>
          <Link
            to={`${languageStore?.language}/${process.env.REACT_APP_ADMIN_LOGIN_PATH_HASH}/admin`}
            className="admin__sidenav__nav__logout"
            onClick={() => handleLogout()}
          >
            Logout
          </Link>
          <PrimaryButton
            label="View in DB"
            icon={arrowRight}
            onClick={() => (window.location.href = databaseTableURL)}
          ></PrimaryButton>
        </div>
      </div>
      <div className="admin__content">
        <Switch>
          <Route
            exact
            path={`${path}/orders`}
            component={adminPages.orders}
          ></Route>
          <Route
            exact
            path={`${path}/customers`}
            component={adminPages.customers}
          ></Route>
          <Route
            exact
            path={`${path}/products`}
            component={adminPages.products}
          ></Route>
          <Route
            path={`${path}`}
            component={() => <Redirect to={`${path}/orders`}></Redirect>}
          ></Route>
        </Switch>
      </div>
    </div>
  );
};

export default inject("adminStore", "languageStore")(observer(Admin));
