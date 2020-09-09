import React, { useState, useEffect } from "react";
import "./Nav.scss";
import { inject, observer } from "mobx-react";
import NavItem from "./NavItem/NavItem";
import { BurgerMenu } from "../BurgerMenu/BurgerMenu";
import { BurgerCloseMenu } from "../BurgerCloseMenu/BurgerCloseMenu";
import { Link } from "react-router-dom";
import { BurgerMenuStore } from "../../stores/burgerMenuStore";
import { LanguageStore } from "../../stores/languageStore";
import Title from "../../components/Title/Title";
import { Album } from "../../models/Album";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { LoginStore } from "../../stores/loginStore";
import { User } from "../../models/User";
require("dotenv").config();

const emaillValidator = require("email-validator");
const logo = require("../../assets/icons/logo/full/hellsio_full_logo_web_red.png");
const searchIcon = require("../../assets/icons/search/search_web_red.png");
const shoppingBagIcon = require("../../assets/icons/shopping_bag/shopping_bag_web_red.png");
const albumData = require("../../data/products.json");
const arrowRight = require("../../assets/icons/arrowRight/arrowRightWhite.png");

interface NavProps {
  burgerMenuStore?: BurgerMenuStore;
  languageStore?: LanguageStore;
  loginStore?: LoginStore;
}

const Nav = ({ burgerMenuStore, languageStore, loginStore }: NavProps) => {
  const [genres, setGenres] = useState([]);
  const [signIn, setSignIn] = useState(true);

  const [signInDataChange, setSignInDataChange] = useState({
    email: "",
    password: "",
  });
  const [registerDataChange, setRegisterDataChange] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const registerErrorOptions = {
    password_too_short: "Your Password must at least contain 8 characters",
    password_does_not_match: "Your Passwords do not match",
    username_too_short: "Your Username cannot be empty",
    email_not_valid: "Please enter a valid email",
  };

  const [registerErrors, setRegisterErrors]: any[] = useState([]);

  const validateRegister = (pwData: any) => {
    const { password: pw1, password2: pw2, username, email } = pwData;

    if (
      username.trim().length < 1 &&
      !registerErrors.includes(registerErrorOptions.username_too_short)
    ) {
      setRegisterErrors([
        ...registerErrors,
        registerErrorOptions.username_too_short,
      ]);
    } else if (username.trim().length > 1) {
      setRegisterErrors([
        registerErrors.splice(
          registerErrors.indexOf(registerErrorOptions.username_too_short),
          1
        ),
      ]);
    }

    if (
      !emaillValidator.validate(email) &&
      !registerErrors.includes(registerErrorOptions.email_not_valid)
    ) {
      setRegisterErrors([
        ...registerErrors,
        registerErrorOptions.email_not_valid,
      ]);
    } else if (emaillValidator.validate(email)) {
      setRegisterErrors([
        registerErrors.splice(
          registerErrors.indexOf(registerErrorOptions.email_not_valid),
          1
        ),
      ]);
    }

    if (
      pw1 !== pw2 &&
      !registerErrors.includes(registerErrorOptions.password_does_not_match)
    ) {
      setRegisterErrors([
        ...registerErrors,
        registerErrorOptions.password_does_not_match,
      ]);
      console.log("after ", registerErrorOptions);
    } else if (pw1 === pw2) {
      setRegisterErrors([
        registerErrors.splice(
          registerErrors.indexOf(registerErrorOptions.password_does_not_match),
          1
        ),
      ]);
    }

    if (
      pw1.length !== pw2.length &&
      !registerErrors.includes(registerErrorOptions.password_does_not_match)
    ) {
      setRegisterErrors([
        ...registerErrors,
        registerErrorOptions.password_does_not_match,
      ]);
      console.log("after ", registerErrorOptions);
    } else if (pw1.length === pw2.length) {
      setRegisterErrors([
        registerErrors.splice(
          registerErrors.indexOf(registerErrorOptions.password_does_not_match),
          1
        ),
      ]);
    }
  };

  const register = () => {
    console.log(registerErrors);
    if (registerErrors.length - 1 > 0) return console.log("not empty errors");

    (async () => {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: registerDataChange.username,
          email: registerDataChange.email,
          password: registerDataChange.password,
          pw: process.env.HASHED_ADMIN_PASSWORD,
        }),
      };

      const response = await fetch("/.netlify/functions/api/users", options);
      const result = await response.json();
      console.log(result);
    })();
  };

  const login = () => {
    (async () => {
      console.log("data ", signInDataChange);

      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: signInDataChange.email,
          password: signInDataChange.password,
          pw: "$2a$10$wQhpGTYmyJwjxb57otpBf.ymj8alOg.mGiFgYeo9.5SApLFI/AWVm",
        }),
      };

      const response = await fetch(
        "/.netlify/functions/api/users/login",
        options
      );
      const result = await response.json();
      if (result) {
        const user: User = result.user;
        console.log(user);
        loginStore?.setLoggedIn(true);
        loginStore?.setUser(user);
      }
    })();
  };

  useEffect(() => {
    (async () => {
      const response = await fetch("/.netlify/functions/api/genres");
      const genres = await response.json();
      setGenres(() => genres);
    })();
  }, []);

  return (
    <>
      <div
        className={`nav-modal ${
          burgerMenuStore?.opened ? "nav-modal-active" : "nav-modal-not-active"
        }`}
      >
        <div className="nav-modal__column">
          <Title title="New Arrivals" link="newarrivals" />
          {albumData.map((album: Album, index: number) => {
            return (
              <p className="p" key={index}>
                <Link
                  key={index}
                  to={`/${languageStore?.language}/products/${album.id}`}
                >
                  {album.name} - {album.artists[0].name}
                </Link>
              </p>
            );
          })}
        </div>
        <div className="nav-modal__column">
          <Title title="Genres" link="newarrivals" />
          {genres.map((genre: any, index) => {
            return (
              <p className="p" key={index}>
                <Link to={`/${languageStore?.language}/newarrivals`}>
                  {genre.genre}
                </Link>
              </p>
            );
          })}
        </div>
        <div className="nav-modal__column">
          <Title title="Popular" link="popular" />
          {albumData.map((album: Album, index: number) => {
            return (
              <p className="p" key={index}>
                <Link
                  key={index}
                  to={`/${languageStore?.language}/products/${album.id}`}
                >
                  {album.name} - {album.artists[0].name}
                </Link>
              </p>
            );
          })}
        </div>
        {loginStore?.loggedIn ? (
          <div className="nav-modal__column profile-wrapper">
            <Title title={loginStore!.user?.username.toString()} link="/" />
          </div>
        ) : (
          <div className="nav-modal__column sign-in-wrapper">
            {signIn ? (
              <div className="sign-in-wrapper__sign-in">
                <Title title="Sign in" link={`/${languageStore?.language}`} />
                <form className="sign-in-wrapper__sign-in__sign-in">
                  <div className="sign-in-wrapper__sign-in__sign-in__email">
                    <label htmlFor="sign-in__email">Email</label>
                    <input
                      type="email"
                      id="sign-in__email"
                      name="email"
                      onChange={(e) =>
                        setSignInDataChange({
                          email: e.target.value,
                          password: signInDataChange.password,
                        })
                      }
                    />
                  </div>
                  <div className="sign-in-wrapper__sign-in__sign-in__password">
                    <label htmlFor="sign-in__password">Password</label>
                    <input
                      type="password"
                      id="sign-in__password"
                      name="password"
                      onChange={(e) =>
                        setSignInDataChange({
                          email: signInDataChange.email,
                          password: e.target.value,
                        })
                      }
                    />
                  </div>
                  <PrimaryButton
                    label="Sign in"
                    link=""
                    icon={arrowRight}
                    onClick={login}
                  />
                  <p
                    className="toggle-to-register"
                    onClick={() => {
                      setSignIn(false);
                      setRegisterDataChange({
                        username: "",
                        email: signInDataChange.email,
                        password: signInDataChange.password,
                        password2: "",
                      });
                    }}
                  >
                    Don't have an account yet?
                  </p>
                </form>
              </div>
            ) : (
              <div className="sign-in-wrapper__register">
                <Title title="Register" link={`/${languageStore?.language}`} />
                <form className="sign-in-wrapper__register__register">
                  <div className="sign-in-wrapper__register__register__username">
                    <label htmlFor="register__username">Username</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      onChange={(e) => {
                        setRegisterDataChange({
                          username: e.target.value,
                          email: registerDataChange.email,
                          password: registerDataChange.password,
                          password2: registerDataChange.password2,
                        });

                        const pwData = {
                          username: e.target.value,
                          email: registerDataChange.email,
                          password: registerDataChange.password,
                          password2: registerDataChange.password2,
                        };

                        console.log(pwData);
                        validateRegister(pwData);
                      }}
                    />
                  </div>
                  <div className="sign-in-wrapper__register__register__email">
                    <label htmlFor="register__email">Email</label>
                    <input
                      type="email"
                      id="register__email"
                      name="email"
                      onChange={(e) => {
                        setRegisterDataChange({
                          username: registerDataChange.username,
                          email: e.target.value,
                          password: registerDataChange.password,
                          password2: registerDataChange.password2,
                        });

                        const pwData = {
                          username: registerDataChange.username,
                          email: e.target.value,
                          password: registerDataChange.password,
                          password2: registerDataChange.password2,
                        };

                        console.log(pwData);
                        validateRegister(pwData);
                      }}
                    />
                  </div>
                  <div className="sign-in-wrapper__register__register__password">
                    <label htmlFor="register__password">Password</label>
                    <input
                      type="password"
                      id="register__password"
                      name="password"
                      onChange={(e) => {
                        setRegisterDataChange({
                          username: registerDataChange.username,
                          email: registerDataChange.email,
                          password: e.target.value,
                          password2: registerDataChange.password2,
                        });
                        const pwData = {
                          username: registerDataChange.username,
                          email: registerDataChange.email,
                          password: e.target.value,
                          password2: registerDataChange.password2,
                        };

                        validateRegister(pwData);
                      }}
                    />
                  </div>
                  <div className="sign-in-wrapper__register__register__password2">
                    <label htmlFor="register__password2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="register__password2"
                      name="password2"
                      onChange={(e) => {
                        setRegisterDataChange({
                          username: registerDataChange.username,
                          email: registerDataChange.email,
                          password: registerDataChange.password,
                          password2: e.target.value,
                        });
                        const pwData = {
                          username: registerDataChange.username,
                          email: registerDataChange.email,
                          password: registerDataChange.password,
                          password2: e.target.value,
                        };
                        validateRegister(pwData);
                      }}
                    />
                  </div>
                  <div className="register-errors">
                    <ul className="register-errors__errors">
                      {registerErrors.map((err: any, index: number) => {
                        return (
                          <li
                            key={index}
                            className="register-errors__errors__error"
                          >
                            {err}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <PrimaryButton
                    label="Register"
                    link=""
                    icon={arrowRight}
                    onClick={register}
                  />
                  <p
                    className="toggle-to-sign-in"
                    onClick={() => {
                      setSignIn(true);
                      setSignInDataChange({
                        email: registerDataChange.email,
                        password: registerDataChange.password,
                      });
                    }}
                  >
                    Already have an account?
                  </p>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
      <nav className="nav">
        <div className="nav__wrapper">
          <Link
            to={`/${languageStore?.language}`}
            className="nav__wrapper__logo"
          >
            <img src={logo} alt="Hellsio logo" className="logo" />
          </Link>
          <div className="nav__wrapper__content">
            <NavItem label="NEW ARRIVALS" link="newarrivals" />
            <NavItem label="FEATURED" link="featured" />
            <NavItem label="POPULAR" link="popular" />
            <div className="nav-icons"></div>
            <div className="nav-icons__icon">
              <img
                src={searchIcon}
                alt="Hellsio search icon"
                id="search_icon"
              />
            </div>
            <div className="nav-icons__icon">
              <Link to={`/${languageStore?.language}/checkout`}>
                <img
                  src={shoppingBagIcon}
                  alt="Hellsio shopping bag icon"
                  id="shopping_bag_icon"
                />
              </Link>
            </div>
            <div className="nav-icons__icon">
              {burgerMenuStore?.opened ? (
                <BurgerCloseMenu
                  onClick={() => {
                    burgerMenuStore?.close();
                  }}
                />
              ) : (
                <BurgerMenu
                  onClick={() => {
                    burgerMenuStore?.open();
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default inject(
  "burgerMenuStore",
  "languageStore",
  "loginStore"
)(observer(Nav));
