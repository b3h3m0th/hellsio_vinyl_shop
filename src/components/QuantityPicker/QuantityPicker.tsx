import React, { useState } from "react";
import "./QuantityPicker.scss";
const minusIcon = require("../../assets/icons/minus/minus.svg");
const plusIcon = require("../../assets/icons/plus/plus.svg");

interface QuantityPickerProps {
  label: string;
  maxValue: number;
  value: number;
  setValue: (value: number) => void;
}

const QuantityPicker = ({
  label,
  maxValue,
  value,
  setValue,
}: QuantityPickerProps) => {
  const handleDecrease = () => {
    if (value - 1 < 1) {
      setValue(1);
    } else {
      setValue(value - 1);
    }
  };

  const handleIncrease = () => {
    if (value + 1 > maxValue) {
      setValue(maxValue);
    } else {
      setValue(value + 1);
    }
  };

  return (
    <div className="quantity-picker">
      <p className="quantity-picker__label">{label}</p>
      <div className="quantity-picker__wrapper">
        <button
          className="quantity-picker__wrapper__decrease"
          onClick={handleDecrease}
        >
          <img src={minusIcon} alt="Hellsio icon minus" />
        </button>
        <div className="quantity-picker__wrapper__value">{value}</div>
        <button
          className="quantity-picker__wrapper__increase"
          onClick={handleIncrease}
        >
          <img src={plusIcon} alt="Hellsio icon plus" />
        </button>
      </div>
    </div>
  );
};

export default QuantityPicker;
