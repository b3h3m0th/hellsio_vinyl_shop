import React from "react";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import Title from "../../components/Title/Title";
import { inject, observer } from "mobx-react";
import "./AdminLogin.scss";
import { AdminStore } from "../../stores/adminStore";
import { LanguageStore } from "../../stores/languageStore";
import { Redirect } from "react-router";

const arrowRight = require("../../assets/icons/arrowRight/arrowRightWhite.png");

interface AdminLoginProps {
  languageStore?: LanguageStore;
  adminStore?: AdminStore;
}

const AdminLogin: React.FC<AdminLoginProps> = ({
  adminStore,
  languageStore,
}: AdminLoginProps) => {
  const login = () => {
    adminStore?.login();
    // window.location.href = `/${languageStore?.language}/${process.env.REACT_APP_ADMIN_LOGIN_PATH_HASH}/admin`;
  };

  return (
    <div className="admin-login">
      <form className="admin-login__form">
        <Title
          title="Administrator Login"
          link={`${process.env.REACT_APP_ADMIN_LOGIN_PATH_HASH}/admin-login`}
        />
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
          link={`${process.env.REACT_APP_ADMIN_LOGIN_PATH_HASH}/admin-login`}
          icon={arrowRight}
          onClick={() => login()}
        />
        {adminStore?.loggedIn ? (
          <Redirect
            to={`/${languageStore?.language}/${process.env.REACT_APP_ADMIN_LOGIN_PATH_HASH}/admin`}
          />
        ) : null}
      </form>
    </div>
  );
};

export default inject("adminStore", "languageStore")(observer(AdminLogin));
