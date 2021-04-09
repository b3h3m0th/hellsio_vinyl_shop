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
import { UserStore } from "../../stores/userStore";
import validateRegistrationData, {
  RegistrationData,
} from "../../validation/registration";

const logo = require("../../assets/icons/logo/full/hellsio_full_logo_web_red.png");
const searchIcon = require("../../assets/icons/search/search_web_red.png");
const shoppingBagIcon = require("../../assets/icons/shopping_bag/shopping_bag_web_red.png");
const albumData = require("../../data/products.json");
const arrowRight = require("../../assets/icons/arrowRight/arrowRightWhite.png");

interface NavProps {
  burgerMenuStore?: BurgerMenuStore;
  languageStore?: LanguageStore;
  userStore?: UserStore;
}

const Nav: React.FC<NavProps> = ({
  burgerMenuStore,
  languageStore,
  userStore,
}: NavProps) => {
  const [genres] = useState<any[]>([]);
  const [signInOrRegistration, setSignInOrRegistration] = useState<boolean>(
    true
  );

  const [signInDataChange, setSignInDataChange] = useState({
    email: "",
    password: "",
  });

  const [
    registrationDataChange,
    setRegistrationDataChange,
  ] = useState<RegistrationData>({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [registrationErrors, setRegistrationErrors]: any[] = useState<
    Array<any>
  >([]);

  const [loginErrors, setLoginErrors]: any[] = useState<Array<any>>([]);

  const handleRegister = () => {
    userStore?.register(
      registrationDataChange.username,
      registrationDataChange.email,
      registrationDataChange.password,
      registrationDataChange.password2,
      setRegistrationErrors,
      registrationErrors,
      setSignInOrRegistration
    );
  };

  const handleLogin = () => {
    userStore?.login(
      signInDataChange.email,
      signInDataChange.password,
      setLoginErrors
    );
  };

  useEffect(() => {
    (async (): Promise<void> => {
      await userStore?.isLoggedIn();
    })();
  }, [userStore]);

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
          {genres.map((genre: any, index: number) => {
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
        {userStore?.loggedIn ? (
          <div className="nav-modal__column profile-wrapper">
            <Title
              title={
                userStore.user
                  ? userStore?.user?.username.toString()
                  : "Profile"
              }
              link="/"
            />
            <Link
              to={`/`}
              onClick={() => {
                userStore.logout();
              }}
            >
              Logout
            </Link>
          </div>
        ) : (
          <div className="nav-modal__column sign-in-wrapper">
            {signInOrRegistration ? (
              <div className="sign-in-wrapper__sign-in">
                <Title title="Sign in" link={`/${languageStore?.language}`} />
                <form className="sign-in-wrapper__sign-in__sign-in">
                  <div className="sign-in-wrapper__sign-in__sign-in__email">
                    <label htmlFor="sign-in__email">Email</label>
                    <input
                      type="email"
                      id="sign-in__email"
                      name="email"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSignInDataChange({
                          email: signInDataChange.email,
                          password: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="sign-in-errors">
                    <ul className="sign-in-errors__errors">
                      {loginErrors.map((err: any, index: number) => {
                        return (
                          <li
                            key={index}
                            className="sign-in-errors__errors__error"
                          >
                            {err}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <PrimaryButton
                    label="Sign in"
                    link=""
                    icon={arrowRight}
                    onClick={() => handleLogin()}
                  />
                  <p
                    className="toggle-to-register"
                    onClick={() => {
                      setSignInOrRegistration(false);
                      setLoginErrors([]);
                      setRegistrationDataChange({
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
                      id="register__username"
                      name="username"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const pwData = {
                          username: e.target.value,
                          email: registrationDataChange.email,
                          password: registrationDataChange.password,
                          password2: registrationDataChange.password2,
                        };

                        setRegistrationDataChange(pwData);
                        setRegistrationErrors(validateRegistrationData(pwData));
                      }}
                    />
                  </div>
                  <div className="sign-in-wrapper__register__register__email">
                    <label htmlFor="register__email">Email</label>
                    <input
                      type="email"
                      id="register__email"
                      name="email"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const pwData = {
                          username: registrationDataChange.username,
                          email: e.target.value,
                          password: registrationDataChange.password,
                          password2: registrationDataChange.password2,
                        };

                        setRegistrationDataChange(pwData);
                        setRegistrationErrors(validateRegistrationData(pwData));
                      }}
                    />
                  </div>
                  <div className="sign-in-wrapper__register__register__password">
                    <label htmlFor="register__password">Password</label>
                    <input
                      type="password"
                      id="register__password"
                      name="password"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const pwData = {
                          username: registrationDataChange.username,
                          email: registrationDataChange.email,
                          password: e.target.value,
                          password2: registrationDataChange.password2,
                        };

                        setRegistrationDataChange(pwData);
                        setRegistrationErrors(validateRegistrationData(pwData));
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
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const pwData = {
                          username: registrationDataChange.username,
                          email: registrationDataChange.email,
                          password: registrationDataChange.password,
                          password2: e.target.value,
                        };
                        setRegistrationDataChange(pwData);
                        setRegistrationErrors(validateRegistrationData(pwData));
                      }}
                    />
                  </div>
                  <div className="register-errors">
                    <ul className="register-errors__errors">
                      {registrationErrors.map((err: any, index: number) => {
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
                    onClick={() => handleRegister()}
                  />
                  <p
                    className="toggle-to-sign-in"
                    onClick={() => {
                      setSignInOrRegistration(true);
                      setSignInDataChange({
                        email: registrationDataChange.email,
                        password: registrationDataChange.password,
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
              <Link to={`/${languageStore?.language}/shopping-bag`}>
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
  "userStore"
)(observer(Nav));
