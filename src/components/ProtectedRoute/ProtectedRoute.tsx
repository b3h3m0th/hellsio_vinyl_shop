import React, { ComponentType } from "react";
import { Redirect, Route } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { UserStore } from "../../stores/userStore";

interface ProtectedRoutesProps {
  component: ComponentType<any>;
  userStore?: UserStore;
  path: string;
}

const ProtectedRoute: React.FC<ProtectedRoutesProps> = ({
  component,
  userStore,
  path,
}: ProtectedRoutesProps) => {
  return userStore?.loggedIn ? (
    <Route path={path} component={component} />
  ) : (
    <Route path="/" component={() => <Redirect to="/" />} />
  );
};

export default inject("userStore")(observer(ProtectedRoute));
