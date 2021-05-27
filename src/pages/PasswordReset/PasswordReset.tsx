import React from "react";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import Title from "../../components/Title/Title";
import "./PasswordReset.scss";

const arrowRight = require("../../assets/icons/arrowRight/arrowRightWhite.png");

interface PasswordResetProps {}

const PasswordReset: React.FC<PasswordResetProps> =
  ({}: PasswordResetProps) => {
    return (
      <div className="password-reset">
        <div className="password-reset__wrapper">
          <Title link="password-reset" title="Password Reset" />
          <input type="text" className="password-reset__input" />
          <PrimaryButton label="Reset" icon={arrowRight} />
        </div>
      </div>
    );
  };

export default PasswordReset;
