import React, { useState } from "react";
import "./QuantityPicker.scss";
const minusIcon = require("../../assets/icons/minus/minus.svg");
const plusIcon = require("../../assets/icons/plus/plus.svg");

interface QuantityPickerProps {
  label: string;
  maxValue: number;
}

const QuantityPicker = ({ label, maxValue }: QuantityPickerProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity - 1 < 1) {
      setQuantity(1);
    } else {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity + 1 > maxValue) {
      setQuantity(maxValue);
    } else {
      setQuantity(quantity + 1);
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
        <div className="quantity-picker__wrapper__value">{quantity}</div>
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
