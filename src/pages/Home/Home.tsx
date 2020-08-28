import React, { useEffect } from "react";
import "./Home.scss";
import ArrowButton from "../../components/ArrowButton/ArrowButton";
import { Link } from "react-router-dom";
import gsap from "gsap";

// const heroBackroundImage = require("../../assets/img/background/F8-Five_Finger_Death_Punch.jpg");

const Home = () => {
  const tl = gsap.timeline();
  useEffect(() => {
    tl.from(".hero-banner__title", 1.8, {
      x: -70,
      opacity: 0,
      ease: "power4",
      delay: 0.5,
    });
    gsap.from(".hero-banner__title", 1.8, {
      ease: "power4",
      delay: 0.5,
    });
    gsap.from(".hero-banner__subtitle", 1.8, {
      x: -60,
      opacity: 0,
      delay: 0.8,
      ease: "power4",
    });
    gsap.from(".shop-now-button", 1.8, {
      x: -50,
      opacity: 0,
      delay: 1.1,
      ease: "power4",
    });
    gsap.from(".home__background-container__img", 1, {
      opacity: 0,
      ease: "power1",
      delay: 0.5,
    });
  });
  return (
    <div className="home">
      <div className="home__hero-banner">
        <div className="hero-banner">
          <h1 className="hero-banner__title">This is Hell</h1>
          <p className="hero-banner__subtitle">
            The newest <br /> metal albums on <br /> every available format
          </p>
          <Link to="/newarrivals">
            <ArrowButton label="Shop now" className="shop-now-button" />
          </Link>
        </div>
      </div>
      <div className="home__background-container">
        <div className="home__background-container__img"></div>
      </div>
    </div>
  );
};

export default Home;
