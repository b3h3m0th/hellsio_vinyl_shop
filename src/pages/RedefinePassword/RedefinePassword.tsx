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
  const [passwordSet, setPasswordSet] = useState<boolean>(false);
  const [isAllowedToReset, setIsAllowedToReset] = useState<boolean>(true);
  const [passwordData, setPasswordData] = useState<{
    password: string;
    password2: string;
  }>({ password: "", password2: "" });

  const handleSubmit = () => {
    (async () => {
      const matchResponse = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/`
      );
    })();
  };

  return isAllowedToReset ? (
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
        {passwordSet && (
          <span className="password-redefine__wrapper__notification">
            Your new password has been set :D
          </span>
        )}
      </div>
    </div>
  ) : (
    <Redirect to="/" />
  );
};

export default PasswordReset;
