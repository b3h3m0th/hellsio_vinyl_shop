import React from "react";
import { LanguageStore } from "../../stores/languageStore";
import { inject, observer } from "mobx-react";
import "./EmailVerified.scss";
import { Link } from "react-router-dom";
import ArrowButton from "../../components/ArrowButton/ArrowButton";

interface EmailVerifiedProps {
  languageStore?: LanguageStore;
}

const EmailVerified: React.FC<EmailVerifiedProps> = ({
  languageStore,
}: EmailVerifiedProps) => {
  return (
    <div className="email-verified">
      <div className="email-verified__wrapper">
        <div className="email-verified__wrapper__header">
          <span className="email-verified__wrapper__header__thank-you">
            Email verified
          </span>
          <span className="email-verified__wrapper__content">
            Your Email adress has been verified!
          </span>
        </div>
        <Link to="/" className="email-verified__wrapper__back-button">
          <ArrowButton
            label="Back to Home"
            className="email-verified__wrapper__back-button__button"
          />
        </Link>
      </div>
    </div>
  );
};

export default inject("languageStore")(observer(EmailVerified));
