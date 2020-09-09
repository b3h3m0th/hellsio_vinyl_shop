import React from "react";
import "./DropDownPicker.scss";
// const dropDownArrow = require("../../assets/icons/dropDownArrow/dropDownArrow.svg");

interface DropDownPickerProps {
  options: [{ id: string; price: number }];
  label: string;
}

const DropDownPicker = ({ options, label }: DropDownPickerProps) => {
  return (
    <div className="drop-down-picker">
      <p className="drop-down-picker__label">{label}</p>
      <select className="drop-down-picker__select">
        {options.map((o, index) => {
          return (
            <option
              className="dopr-down-picker__select__option"
              key={index}
              value={o.id}
            >
              {o.id}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DropDownPicker;