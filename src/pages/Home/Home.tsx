import React, { useState, useEffect } from "react";
import "./Home.scss";
import ArrowButton from "../../components/ArrowButton/ArrowButton";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { inject, observer } from "mobx-react";
import { LanguageStore } from "../../stores/languageStore";
import HeroVinyl from "../../components/HeroVinyl/HeroVinyl";
import toBase64 from "../../util/toBase64";
import { productStore, ProductStore } from "../../stores/productStore";
import { redisStore, RedisStore } from "../../stores/redisStore";

interface HomeProps {
  languageStore?: LanguageStore;
  productstore?: ProductStore;
  redisStore?: RedisStore;
}

const Home: React.FC<HomeProps> = ({
  languageStore,
  productstore,
}: HomeProps) => {
  const [heroAlbums, setHeroAlbums] = useState<Array<any>>([]);
  const [heroTitle, setHeroTitle] = useState<string>("This is Hell");

  useEffect(() => {
    (async () => {
      setHeroTitle(await redisStore.getValue("hero-title"));
      setHeroAlbums(
        [...(await productStore.fetchFew(7))]
          .sort(() => Math.random() - Math.random())
          .slice(0, (Math.random() * 4) | 3)
      );
    })();
  }, []);

  useEffect(() => {
    if (heroAlbums.length !== 0) {
      gsap.fromTo(
        ".hero-banner__title",
        1.8,
        {
          x: -70,
          opacity: 0,
          ease: "power4",
        },
        {
          x: 0,
          opacity: 1,
          ease: "power4",
        }
      );
      gsap.fromTo(
        ".hero-banner__subtitle",
        1.8,
        {
          x: -60,
          opacity: 0,
          ease: "power4",
        },
        {
          x: 0,
          opacity: 0.2,
          ease: "power4",
          delay: 0.3,
        }
      );
      gsap.fromTo(
        ".shop-now-button",
        1.8,
        {
          x: -50,
          opacity: 0,
          ease: "power4",
        },
        {
          x: 0,
          opacity: 1,
          ease: "power4",
          delay: 0.5,
        }
      );
      gsap.fromTo(
        ".home__background-container__img",
        1,
        {
          opacity: 0,
          ease: "power1",
        },
        {
          opacity: 0.2,
          ease: "power1",
          delay: 0.5,
        }
      );
      gsap.from(".hero-vinyl", 1.8, {
        delay: 0.5,
        stagger: -0.5,
        opacity: 0,
        ease: "power4",
        x: 100,
      });
      gsap.fromTo(
        ".hero-vinyl",
        1.8,
        {
          opacity: 0,
          ease: "power4",
          x: 100,
        },
        {
          opacity: 1,
          delay: 0.5,
          stagger: -0.5,
        }
      );
      gsap.from(".hero-vinyl__link", 1.8, {
        delay: 0.5,
        stagger: -0.2,
        opacity: 0,
        ease: "power4",
        y: 50,
      });
      gsap.from(".hero-link__after", 0.5, {
        delay: 2,
        width: 0,
        ease: "power4",
      });
      gsap.from(".hero-explore-button", 0.5, {
        delay: 2.4,
        x: 45,
        ease: "power4",
      });
      gsap.fromTo(
        ".hero-explore-button",
        0.5,
        {
          x: 0,
        },
        {
          delay: 2.4,
          x: -45,
          ease: "power4",
        }
      );
    }

    const vinylContainer = document.getElementById("home-vinyl-container");
    const heroExploreButton = document.getElementById("hero-explore-button");
    const heroTitle = document.querySelector("#hero-banner-title");
    const heroSubtitle = document.getElementById("hero-banner-subtitle");
    const heroArrow = document.getElementById("hero-banner-arrow");

    vinylContainer!.style.height = `${
      parseInt("" + window.getComputedStyle(heroTitle!, null).fontSize) +
      heroSubtitle!.clientHeight +
      heroArrow!.clientHeight
    }px`;
    vinylContainer!.style.marginTop = `${
      (heroTitle!.clientHeight -
        parseInt("" + window.getComputedStyle(heroTitle!, null).fontSize)) /
        2 +
      10
    }px`;
    heroExploreButton!.style.height = `${
      parseInt("" + window.getComputedStyle(heroTitle!, null).fontSize) +
      heroSubtitle!.clientHeight +
      heroArrow!.clientHeight
    }px`;
    heroExploreButton!.style.marginTop = `${
      (heroTitle!.clientHeight -
        parseInt("" + window.getComputedStyle(heroTitle!, null).fontSize)) /
      2
    }px`;
  });

  return (
    <div className="home">
      <div className="home__hero-banner">
        <div className="hero-banner">
          <h1 className="hero-banner__title" id="hero-banner-title">
            {heroTitle}
          </h1>
          <p className="hero-banner__subtitle" id="hero-banner-subtitle">
            The newest <br /> metal albums on <br /> every available format
          </p>
          <Link
            to={`/${languageStore?.language}/newarrivals`}
            id="hero-banner-arrow"
          >
            <ArrowButton label="Shop now" className="shop-now-button" />
          </Link>
        </div>
      </div>
      <div className="home__background-container">
        <div className="home__background-container__img"></div>
        <div
          className="home__background-container__vinyls"
          id="home-vinyl-container"
        >
          <div className="home__background-container__vinyls__wrapper">
            {heroAlbums?.map((album: any, i: number) => {
              return (
                <HeroVinyl
                  className={`hero-vinyl-${i}`}
                  img={`data:image/png;base64,${toBase64(album.cover.data)}`}
                  name={album.name}
                  productCode={album.code}
                  key={i}
                  onMouseEnter={() =>
                    gsap.to(`.hero-vinyl-${i}`, 0.02, {
                      x: 20,
                      ease: "power2",
                    })
                  }
                  onMouseLeave={() =>
                    gsap.to(".hero-vinyl", 0.02, {
                      x: 0,
                      ease: "power2",
                    })
                  }
                />
              );
            })}
          </div>
        </div>
        <button
          className="hero-explore-button"
          id="hero-explore-button"
          type="button"
          onClick={() =>
            (window.location.href = `${languageStore?.language}/newarrivals`)
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11.593"
            height="20.256"
            viewBox="0 0 11.593 20.256"
          >
            <defs>
              <style>
                {`.cls-2 {
              fill: #fff;
            }`}
              </style>
            </defs>
            <g id="arrowRightSmall" transform="translate(0 0)">
              <rect
                id="arrowRightSmallTop"
                className="cls-2"
                width="2.081"
                height="14.313"
                transform="translate(0 1.472) rotate(-45)"
              />
              <rect
                id="arrowRightSmallBottom"
                className="cls-2"
                width="2.081"
                height="14.313"
                transform="translate(1.472 20.256) rotate(-135)"
              />
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default inject(
  "languageStore",
  "productStore",
  "redisStore"
)(observer(Home));
