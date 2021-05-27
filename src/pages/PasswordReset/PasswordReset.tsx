import React from "react";
import { useState } from "react";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import Title from "../../components/Title/Title";
import "./PasswordReset.scss";
import axios from "axios";

const arrowRight = require("../../assets/icons/arrowRight/arrowRightWhite.png");

interface PasswordResetProps {
  readonly fill?: unique symbol;
}

const PasswordReset: React.FC<PasswordResetProps> = ({
  fill,
}: PasswordResetProps) => {
  const [notification, setNotification] = useState<any>();
  const [emailValue, setEmailValue] = useState<string>("");

  const handleReset = async (): Promise<any> => {
    const resetResponse = await axios.post(
      `${process.env.REACT_APP_BASE_API_URL}/user/forgot-password`,
      {
        email: emailValue,
      }
    );

    if (resetResponse.status === 209)
      return setNotification("This email/username is not registered");

    setNotification(true);
    setTimeout(() => {
      setNotification(false);
    }, 5000);
  };

  return (
    <div className="password-reset">
      <div className="password-reset__wrapper">
        <Title link="password-reset" title="Password Reset" />
        <label htmlFor="email">Email/Username</label>
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmailValue(e.target.value)
          }
          value={emailValue}
          id="email"
          type="text"
          className="password-reset__wrapper__input"
        />
        <PrimaryButton
          label="Reset"
          icon={arrowRight}
          onClick={() => handleReset()}
          link="password-reset"
        />
        <span className="password-reset__wrapper__notification">
          {notification && (
            <>
              <img
                src={
                  "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzIgMTcyIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwxNzJ2LTE3MmgxNzJ2MTcyeiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxnIGZpbGw9IiNhZTBiMDAiPjxwYXRoIGQ9Ik0xNi42MDUxNyw3NC4wNDZsMjguNTM3NjcsMjguNTM3NjdjMi44MjM2NywyLjgyMzY3IDcuMzI0MzMsMy4wMzg2NyAxMC4zOTg4MywwLjUwMTY3bDc2LjM0NjUsLTYyLjk2NjMzbC02Mi45NjYzMyw3Ni4zMzkzM2MtMi41MzcsMy4wNzQ1IC0yLjMyMiw3LjU4MjMzIDAuNTAxNjcsMTAuMzk4ODNsMjguNTM3NjcsMjguNTM3NjdjNC4wMDYxNyw0LjAwNjE3IDEwLjgxNDUsMi40OTQgMTIuNzQ5NSwtMi44MzA4M2w0Ni40ODMsLTEyNy44MzE4M2MyLjI0MzE3LC02LjE3NzY3IC0zLjc0MSwtMTIuMTY5IC05LjkxODY3LC05LjkxODY3bC0xMjcuODM5LDQ2LjQ4M2MtNS4zMjQ4MywxLjkzNSAtNi44MzcsOC43NDMzMyAtMi44MzA4MywxMi43NDk1eiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"
                }
                alt="Hellsio Email Sent Icon"
              />
              <span>An email has been sent to your inbox</span>
            </>
          )}
        </span>
      </div>
    </div>
  );
};

export default PasswordReset;
