import React, { useState } from "react";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import Title from "../../components/Title/Title";
import { inject, observer } from "mobx-react";
import "./AdminLogin.scss";
import { AdminStore } from "../../stores/adminStore";
import { LanguageStore } from "../../stores/languageStore";
import { Redirect } from "react-router";

const arrowRight = require("../../assets/icons/arrowRight/arrowRightWhite.png");

export type AdminLoginData = {
  username: string;
  password: string;
};

interface AdminLoginProps {
  languageStore?: LanguageStore;
  adminStore?: AdminStore;
}

const AdminLogin: React.FC<AdminLoginProps> = ({
  adminStore,
  languageStore,
}: AdminLoginProps) => {
  const [loginData, setLoginData] = useState<AdminLoginData>({
    username: "",
    password: "",
  });

  const [loginErrors, setLoginErros] = useState<Array<string>>([]);

  const handleLogin: () => void = () => {
    adminStore?.login(
      loginData.username,
      loginData.password,
      loginErrors,
      setLoginErros
    );
  };

  return (
    <div className="admin-login">
      <form className="admin-login__form">
        <Title title="Administrator Login" link={`admin-login`} />
        <div className="admin-login__form__username">
          <label htmlFor="admin-login__username">Username</label>
          <input
            type="text"
            id="admin-login__username"
            name="username"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLoginData({
                username: e.target.value,
                password: loginData.password,
              })
            }
          />
        </div>
        <div className="admin-login__form__password">
          <label htmlFor="admin-login__password">Password</label>
          <input
            type="password"
            id="admin-login__password"
            name="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLoginData({
                username: loginData.username,
                password: e.target.value,
              })
            }
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
              e.key === "Enter" ? handleLogin() : () => void 0
            }
          />
        </div>
        <div className="admin-login__form__errors">
          <ul className="admin-login__form__errors__errors">
            {loginErrors.map((err: any, index: number) => {
              return (
                <li
                  key={index}
                  className="admin-login__form__errors__errors__error"
                >
                  {err}
                </li>
              );
            })}
          </ul>
        </div>
        <PrimaryButton
          label="Sign In"
          link={`admin-login`}
          icon={arrowRight}
          onClick={() => handleLogin()}
        />
        {adminStore?.loggedIn ? (
          <Redirect to={`/${languageStore?.language}/admin`} />
        ) : null}
      </form>
    </div>
  );
};

export default inject("adminStore", "languageStore")(observer(AdminLogin));
