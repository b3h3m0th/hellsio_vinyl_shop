import React, { useState } from "react";
import "./QuantityPicker.scss";

interface QuantityPickerProps {
  label: string;
  maxValue: number;
}

const QuantityPicker = ({ label, maxValue }: QuantityPickerProps) => {
  const [quantity, setQuantity] = useState(0);

  const handleDecrease = () => {
    if (quantity - 1 < 0) {
      setQuantity(0);
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
        ></button>
        <div className="quantity-picker__wrapper__value">{quantity}</div>
        <button
          className="quantity-picker__wrapper__increase"
          onClick={handleIncrease}
        ></button>
      </div>
    </div>
  );
};

export default QuantityPicker;
