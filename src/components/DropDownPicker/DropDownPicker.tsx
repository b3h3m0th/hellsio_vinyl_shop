import React from "react";
import "./DropDownPicker.scss";
// const dropDownArrow = require("../../assets/icons/dropDownArrow/dropDownArrow.svg");

interface DropDownPickerProps {
  options: [{ id: string; price: number }];
  label: string;
  id?: string;
  onChange?: (e: any) => void;
}

const DropDownPicker = ({
  options,
  label,
  id,
  onChange,
}: DropDownPickerProps) => {
  return (
    <div className="drop-down-picker">
      <p className="drop-down-picker__label">{label}</p>
      <select
        className="drop-down-picker__select"
        id={id && id}
        onChange={onChange && onChange}
      >
        {options.map((o, index) => {
          return (
            <option
              className="drop-down-picker__select__option"
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
