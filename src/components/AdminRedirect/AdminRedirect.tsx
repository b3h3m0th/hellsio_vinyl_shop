import React from "react";
import { Redirect } from "react-router-dom";
// @ts-ignore (since it's written in plain JS)

const possibleAdminRouteCodeKeys = ["keyup", "keydown", "keyleft", "keyright"];

export type AdminRouteCode = Array<typeof possibleAdminRouteCodeKeys[number]>;

interface AdminRedirectProps {
  to: string;
  code: AdminRouteCode;
}

const AdminRedirect: React.FC<AdminRedirectProps> = ({
  to,
  code,
}: AdminRedirectProps) => {
  return <Redirect to={to} />;
};

export default AdminRedirect;
