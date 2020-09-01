import React, { useState } from "react";
import "./GenreCheckBox.scss";
import { Genre } from "../../../models/Genre";
import gsap from "gsap";

interface GenreCheckBoxProps {
  label: string;
}

const GenreCheckBox = ({ label }: GenreCheckBoxProps) => {
  const [checked, setChecked] = useState(false);

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
          console.log(e);
          setChecked(!checked);
        }}
      />
    </label>
  );
};

export default GenreCheckBox;
