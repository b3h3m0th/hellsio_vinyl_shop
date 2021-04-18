import React from "react";
import { Link } from "react-router-dom";
import ArrowButton from "../ArrowButton/ArrowButton";
import "./Display404.scss";

interface Display404Props {
  header: string;
  text: string;
}

const Display404: React.FC<Display404Props> = ({
  text,
  header,
}: Display404Props) => {
  return (
    <div className="is404">
      <div className="is404__header">
        <span className="is404__header__404">404</span>
        <span className="is404__header__content">{text}</span>
      </div>
      <Link to="/" className="is404__back-button">
        <ArrowButton label={header} className="is404__back-button__button" />
      </Link>
    </div>
  );
};

export default Display404;
