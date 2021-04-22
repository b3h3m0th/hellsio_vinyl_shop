import React, { useState } from "react";
import "./GenreCheckBox.scss";

interface GenreCheckBoxProps {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const GenreCheckBox: React.FC<GenreCheckBoxProps> = ({
  label,
  checked,
  onChange,
}: GenreCheckBoxProps) => {
  return (
    <label
      className={`genre-checkbox__container ${
        checked ? "checkbox-checked" : "checkbox-not-checked"
      }`}
    >
      <span className={`genre-checkbox__container__checkmark`}></span>
      {label}
      <input
        className="genre-checkbox__container__checkbox"
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          onChange(e);
        }}
      />
    </label>
  );
};

export default GenreCheckBox;
