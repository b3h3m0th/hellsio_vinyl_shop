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
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { UserStore } from "../../stores/userStore";
import validateRegistrationData, {
  RegistrationData,
} from "../../validation/registration";
import { ProductStore } from "../../stores/productStore";
import { checkoutStore, CheckoutStore } from "../../stores/checkoutStore";
import { SearchStore } from "../../stores/searchStore";
import SearchOverlay from "../SearchOverlay/SearchOverlay";
import ReCAPTCHA from "react-google-recaptcha";

const logo = require("../../assets/icons/logo/full/hellsio_full_logo_web_red.png");
const searchIcon = require("../../assets/icons/search/search_web_red.png");
const shoppingBagIcon = require("../../assets/icons/shopping_bag/shopping_bag_web_red.png");
const arrowRight = require("../../assets/icons/arrowRight/arrowRightWhite.png");

export const navAlbumsCount = 7 as const;

interface NavProps {
  burgerMenuStore?: BurgerMenuStore;
  languageStore?: LanguageStore;
  userStore?: UserStore;
  productStore?: ProductStore;
  checkoutStore?: CheckoutStore;
  searchStore?: SearchStore;
}

const Nav: React.FC<NavProps> = ({
  burgerMenuStore,
  languageStore,
  userStore,
  productStore,
  searchStore,
}: NavProps) => {
  const [signInOrRegistration, setSignInOrRegistration] =
    useState<boolean>(true);
  const [signInDataChange, setSignInDataChange] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const [registrationDataChange, setRegistrationDataChange] =
    useState<RegistrationData>({
      username: "",
      email: "",
      password: "",
      password2: "",
    });
  const [reCAPTCHAOK, setReCAPTCHAOK] = useState<string>();
  const [registrationErrors, setRegistrationErrors]: any[] = useState<
    Array<any>
  >([]);
  const [loginErrors, setLoginErrors]: any[] = useState<Array<any>>([]);
  const [navAlbums, setNavAlbums] = useState<{
    newArrivals: Array<any>;
    featured: Array<any>;
    popular: Array<any>;
  }>({ newArrivals: [], featured: [], popular: [] });

  const handleRegister = () => {
    userStore?.register(
      registrationDataChange.username,
      registrationDataChange.email,
      registrationDataChange.password,
      registrationDataChange.password2,
      setRegistrationErrors,
      registrationErrors,
      setSignInOrRegistration,
      reCAPTCHAOK
    );
  };

  const handleLogin = () => {
    userStore?.login(
      signInDataChange.email,
      signInDataChange.password,
      loginErrors,
      setLoginErrors
    );
  };

  useEffect(() => {
    (async (): Promise<void> => {
      await userStore?.isLoggedIn();
    })();
  }, [userStore]);

  useEffect(() => {
    (async () => {
      setNavAlbums({
        newArrivals: await productStore?.fetchNavNewArrivals(),
        featured: await productStore?.fetchNavFeatured(),
        popular: await productStore?.fetchNavPopular(),
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          {navAlbums.newArrivals.map((album: any, index: number) => {
            return (
              <p className="p" key={index}>
                <Link to={`/${languageStore?.language}/products/${album.code}`}>
                  {album.name} - {album.artist}
                </Link>
              </p>
            );
          })}
        </div>
        <div className="nav-modal__column">
          <Title title="Featured" link="featured" />
          {navAlbums.featured.map((album: any, index: number) => {
            return (
              <p className="p" key={index}>
                <Link
                  key={index}
                  to={`/${languageStore?.language}/products/${album.code}`}
                >
                  {album.name} - {album.artist}
                </Link>
              </p>
            );
          })}
        </div>
        <div className="nav-modal__column">
          <Title title="Popular" link="popular" />
          {navAlbums.popular.map((album: any, index: number) => {
            return (
              <p className="p" key={index}>
                <Link
                  key={index}
                  to={`/${languageStore?.language}/products/${album.code}`}
                >
                  {album.name} - {album.artist}
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
                  ? userStore?.getUser()?.username || userStore.user.username
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
                    <label htmlFor="sign-in__email">Email/Username</label>
                    <input
                      type="email"
                      id="sign-in__email"
                      name="email"
                      value={signInDataChange.email}
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
                      value={signInDataChange.password}
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
                      value={registrationDataChange.username}
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
                      value={registrationDataChange.email}
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
                      value={registrationDataChange.password}
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
                      value={registrationDataChange.password2}
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
                  <ReCAPTCHA
                    size="normal"
                    sitekey={process.env.REACT_APP_GOOEL_RECAPTCHA_KEY || ""}
                    onChange={(token: any) => setReCAPTCHAOK(token)}
                  />
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
                    onClick={() => {
                      handleRegister();
                      setSignInDataChange({
                        email: registrationDataChange.email,
                        password: registrationDataChange.password,
                      });
                    }}
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
            <div
              className="nav-icons__icon"
              onClick={() => {
                searchStore?.open();
              }}
            >
              <img
                src={searchIcon}
                alt="Hellsio search icon"
                id="search_icon"
              />
              {searchStore?.opened ? <SearchOverlay /> : null}
            </div>
            <div className="nav-icons__icon">
              <Link to={`/${languageStore?.language}/wishlist`}>
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzIgMTcyIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNS44LDI1LjgpIHNjYWxlKDAuNywwLjcpIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwxNzJ2LTE3MmgxNzJ2MTcyeiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxnIGZpbGw9IiNhZTBiMDAiPjxwYXRoIGQ9Ik0xMTYuNTAxMzMsMjEuNTM1ODNjLTE5LjY0MzgzLDAuODAyNjcgLTMwLjUwMTMzLDE0Ljk0MjUgLTMwLjUwMTMzLDE0Ljk0MjVjMCwwIC0xMC44NTc1LC0xNC4xMzk4MyAtMzAuNTAxMzMsLTE0Ljk0MjVjLTEzLjE3MjMzLC0wLjUzNzUgLTI1LjI0ODE3LDYuMDIgLTMzLjIwMzE3LDE2LjUzMzVjLTI3LjY3NzY3LDM2LjU3ODY3IDI0LjcyNSw3OS4zNzA4MyAzNy4wNTE2Nyw5MC44NTljNy4zNzQ1LDYuODcyODMgMTYuNDc2MTcsMTUuMDM1NjcgMjEuOTA4NSwxOS44NzMxN2MyLjcxNjE3LDIuNDIyMzMgNi43NjUzMywyLjQyMjMzIDkuNDgxNSwwYzUuNDMyMzMsLTQuODM3NSAxNC41MzQsLTEzLjAwMDMzIDIxLjkwODUsLTE5Ljg3MzE3YzEyLjMyNjY3LC0xMS40ODgxNyA2NC43MzY1LC01NC4yODAzMyAzNy4wNTE2NywtOTAuODU5Yy03Ljk0NzgzLC0xMC41MTM1IC0yMC4wMjM2NywtMTcuMDcxIC0zMy4xOTYsLTE2LjUzMzV6Ij48L3BhdGg+PC9nPjwvZz48L2c+PC9zdmc+"
                  alt="Hellsio wishlist icon"
                  height="35px"
                  width="35px"
                  style={{ marginTop: "12px", cursor: "pointer" }}
                />
              </Link>
            </div>
            <div className="nav-icons__icon">
              <Link to={`/${languageStore?.language}/shopping-bag`}>
                <img
                  src={shoppingBagIcon}
                  alt="Hellsio shopping bag icon"
                  id="shopping_bag_icon"
                />
                {checkoutStore.products.length > 0 ? (
                  <span id="shopping_bag_product-count">
                    {checkoutStore.products.length}
                  </span>
                ) : null}
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
  "userStore",
  "productStore",
  "checkoutStore",
  "searchStore"
)(observer(Nav));
