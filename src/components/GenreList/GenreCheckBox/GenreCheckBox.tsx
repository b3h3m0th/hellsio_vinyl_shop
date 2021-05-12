import React from "react";
import { CSSProperties } from "react";
import "./GenreCheckBox.scss";

interface GenreCheckBoxProps {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: CSSProperties;
}

const GenreCheckBox: React.FC<GenreCheckBoxProps> = ({
  label,
  checked,
  onChange,
  style,
}: GenreCheckBoxProps) => {
  return (
    <label
      className={`genre-checkbox__container ${
        checked ? "checkbox-checked" : "checkbox-not-checked"
      }`}
      style={style && style}
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
