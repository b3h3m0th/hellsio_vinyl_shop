import React from "react";
import { useState } from "react";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import Title from "../../components/Title/Title";
import "./RedefinePassword.scss";
import { Redirect } from "react-router-dom";
import axios from "axios";

const arrowRight = require("../../assets/icons/arrowRight/arrowRightWhite.png");

interface PasswordResetProps {
  match?: any;
}

const PasswordReset: React.FC<PasswordResetProps> = ({
  match,
}: PasswordResetProps) => {
  const [notification, setNotification] = useState<string>("");
  const [passwordData, setPasswordData] = useState<{
    password: string;
    password2: string;
  }>({ password: "", password2: "" });

  const handleSubmit = () => {
    if (passwordData.password !== passwordData.password2)
      return setNotification("Your passwords don't match");
    (async () => {
      const matchResponse = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/user/redefine-password`,
        {
          token: match.params.token,
          newPassword: passwordData.password,
        }
      );

      if (matchResponse.status === 201)
        setNotification("Your new password has been set :D");

      if (matchResponse.status === 208)
        setNotification("You are not allowed to set a new password");

      return setTimeout(() => {
        setNotification("");
      }, 500);
    })();
  };

  return (
    <div className="password-redefine">
      <div className="password-redefine__wrapper">
        <Title link="password" title="Choose a new Password" />
        <label htmlFor="password">New Password</label>
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPasswordData({
              password: e.target.value,
              password2: passwordData.password2,
            });
          }}
          value={passwordData.password}
          id="password"
          type="password"
          className="password-redefine__wrapper__input"
        />
        <label htmlFor="password2">Confirm New Password</label>
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPasswordData({
              password: e.target.value,
              password2: passwordData.password2,
            });
          }}
          value={passwordData.password2}
          id="password2"
          type="password"
          className="password-redefine__wrapper__input"
        />
        <PrimaryButton
          label="Reset"
          icon={arrowRight}
          onClick={() => handleSubmit()}
          link="redefine-password"
        />
        {notification && (
          <span className="password-redefine__wrapper__notification">
            {notification}
          </span>
        )}
      </div>
    </div>
  );
};

export default PasswordReset;
