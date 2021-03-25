import React from "react";
import "./Admin.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  Redirect,
} from "react-router-dom";

//admin pages
import Orders from "./Orders/Orders";
import Customers from "./Customers/Customers";
import Products from "./Products/Products";

const adminPages = {
  orders: Orders,
  customers: Customers,
  products: Products,
};

const Admin: React.FC = () => {
  const { path, url } = useRouteMatch();
  console.log(path, url);

  return (
    <div className="admin">
      <div className="admin__sidenav"></div>
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

export default Admin;
