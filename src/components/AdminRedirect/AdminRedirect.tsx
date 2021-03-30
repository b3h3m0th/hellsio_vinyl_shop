import React from "react";
import { Redirect } from "react-router-dom";

interface AdminRedirectProps {
  to: string;
}

const AdminRedirect: React.FC<AdminRedirectProps> = ({
  to,
}: AdminRedirectProps) => {
  return <Redirect to={to} />;
};

export default AdminRedirect;
