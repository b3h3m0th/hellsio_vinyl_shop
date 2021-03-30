import React from "react";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import Title from "../../components/Title/Title";
import { LanguageStore } from "../../stores/languageStore";
import { inject, observer } from "mobx-react";
import "./AdminLogin.scss";

const arrowRight = require("../../assets/icons/arrowRight/arrowRightWhite.png");

interface AdminLoginProps {}

const AdminLogin: React.FC<AdminLoginProps> = ({}: AdminLoginProps) => {
  const login = () => {
    //login admin
  };

  return (
    <div className="admin-login">
      <form className="admin-login__form">
        <Title title="Administrator Login" link={`admin-login`} />
        <div className="admin-login__form__username">
          <label htmlFor="admin-login__username">Username</label>
          <input type="text" id="admin-login__username" name="username" />
        </div>
        <div className="admin-login__form__password">
          <label htmlFor="admin-login__password">Password</label>
          <input type="password" id="admin-login__password" name="password" />
        </div>
        <PrimaryButton
          label="Sign In"
          link={`admin-login`}
          icon={arrowRight}
          onClick={() => login()}
        />
      </form>
    </div>
  );
};

export default AdminLogin;
