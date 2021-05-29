import React from "react";
import { useState } from "react";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import Title from "../../components/Title/Title";
import "./RedefinePassword.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { LanguageStore } from "../../stores/languageStore";
import { inject, observer } from "mobx-react";

const arrowRight = require("../../assets/icons/arrowRight/arrowRight.png");
const arrowRightWhite = require("../../assets/icons/arrowRight/arrowRightWhite.png");

interface PasswordResetProps {
  match?: any;
  languageStore?: LanguageStore;
}

const PasswordReset: React.FC<PasswordResetProps> = ({
  match,
  languageStore,
}: PasswordResetProps) => {
  const [notification, setNotification] = useState<string>("");
  const [passwordData, setPasswordData] = useState<{
    password: string;
    password2: string;
  }>({ password: "", password2: "" });

  const handleSubmit = () => {
    if (passwordData.password !== passwordData.password2) {
      setNotification("Your passwords don't match");
      return setTimeout(() => {
        setNotification("");
      }, 5000);
    }

    if (passwordData.password.length < 8) {
      setNotification("Your new password must at least contain 8 characters");
      return setTimeout(() => {
        setNotification("");
      }, 5000);
    }

    try {
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

        return setTimeout(() => {
          setNotification("");
        }, 5000);
      })();
    } catch (err) {
      setNotification(err.response.data.error);
      return setTimeout(() => {
        setNotification("");
      }, 5000);
    }
  };

  return (
    <div className="password-redefine">
      <div className="password-redefine__wrapper">
        <Link
          to={`/${languageStore?.language}/password-reset`}
          className="password-redefine__wrapper__back"
        >
          <img src={arrowRight} alt="Hellsio arrow left" /> Back to Email
        </Link>
        <Link
          to={`/${languageStore?.language}`}
          className="password-redefine__wrapper__further"
        >
          Home <img src={arrowRight} alt="Hellsio arrow left" />
        </Link>
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
              password: passwordData.password,
              password2: e.target.value,
            });
          }}
          value={passwordData.password2}
          id="password2"
          type="password"
          className="password-redefine__wrapper__input"
        />
        <PrimaryButton
          label="Reset"
          icon={arrowRightWhite}
          onClick={() => handleSubmit()}
          link={`redefine-password/${match.params.token}`}
        />
        <span className="password-redefine__wrapper__notification">
          {notification && notification}
        </span>
      </div>
    </div>
  );
};

export default inject("languageStore")(observer(PasswordReset));
