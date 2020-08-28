import React from "react";
import "./ArrowButton.scss";

interface ArrowButtonProps {
  label: string;
  className?: string;
}

const ArrowButton = ({ label, className }: ArrowButtonProps) => {
  return (
    <div className={`arrow-button ${className && className}`}>
      <span>{label}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="38.24"
        height="13.903"
        viewBox="0 0 38.24 13.903"
      >
        <defs>
          <style>
            {` .cls-1 {
        fill: #ae0b00;
      }`}
          </style>
        </defs>
        <g id="arrowRight" transform="translate(-697 -794)">
          <g
            id="arrowRight-arrow"
            transform="translate(144.746 1935.948) rotate(-90)"
          >
            <rect
              id="arrowRight-arrow-top"
              className="cls-1"
              width="2"
              height="10"
              transform="translate(1140.534 582.008) rotate(45)"
            />
            <rect
              id="arrowRight-arrow-bottom"
              className="cls-1"
              width="2"
              height="9"
              transform="translate(1128.046 583.671) rotate(-45)"
            />
          </g>
          <rect
            id="arrowRight-line"
            className="cls-1"
            width="36"
            height="2"
            transform="translate(697 800)"
          />
        </g>
      </svg>
    </div>
  );
};

export default ArrowButton;
