import React, { ComponentType } from "react";
import { Redirect, Route, RouteComponentProps } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { LoginStore } from "../../stores/loginStore";

interface ProtectedRoutesProps {
  component: ComponentType<any>;
  loginStore?: LoginStore;
  path: string;
}

const ProtectedRoute: React.FC<ProtectedRoutesProps> = ({
  component,
  loginStore,
  path,
}: ProtectedRoutesProps) => {
  return loginStore?.loggedIn ? (
    <Route path={path} component={component} />
  ) : (
    <Route path="/" component={() => <Redirect to="/" />} />
  );
};

export default inject("loginStore")(observer(ProtectedRoute));
