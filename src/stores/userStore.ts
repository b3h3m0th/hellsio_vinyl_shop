import { decorate, observable, action } from "mobx";
import { User } from "../models/User";
import axios from "axios";
import {
  deleteUserTokenSet,
  getUserAccessToken,
  getUserRefreshToken,
  setUserAccessToken,
  setUserTokenSet,
} from "../authorization/token";
import { register } from "../serviceWorker";

export class UserStore {
  loggedIn: boolean = false;

  user: User = {
    username: "Profile",
    email: "",
    registrationDate: new Date(1),
  };

  login(
    email: string,
    password: string,
    errorList: any[],
    setErrorList: React.Dispatch<React.SetStateAction<Array<any>>>
  ) {
    if (errorList.length === 0) {
      (async () => {
        try {
          const loginResponse = await axios.post(
            `${`${process.env.REACT_APP_BASE_API_URL}/user/login` || ""}`,
            {
              email: email,
              password: password,
            },
            { headers: { "Content-Type": "application/json" } }
          );

          setUserTokenSet(
            loginResponse.data.accessToken,
            loginResponse.data.refreshToken
          );

          console.log(loginResponse);

          return await this.isLoggedIn();
        } catch (err) {
          setErrorList((prev: any) => [err.response.data.error, ...prev]);

          setTimeout(() => {
            setErrorList([]);
          }, 4000);
          return console.log(err);
        }
      })();
    }
  }

  register(
    username: string,
    email: string,
    password: string,
    password2: string,
    setErrorList: React.Dispatch<React.SetStateAction<Array<any>>>,
    errorList: any[],
    setSignInOrRegistration: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    if (errorList.length === 0) {
      (async () => {
        try {
          const registerResponse = await axios.post(
            `${`${process.env.REACT_APP_BASE_API_URL}/user/register` || ""}`,
            {
              username: username,
              email: email,
              password: password,
              password2: password2,
            },
            { headers: { "Content-Type": "application/json" } }
          );

          setSignInOrRegistration((prev) => !prev);
        } catch (err) {
          setErrorList((prev: any) => [err.response.data.error, ...prev]);

          setTimeout(() => {
            setErrorList([]);
          }, 4000);
        }
      })();
    }
  }

  isLoggedIn = async (): Promise<any> => {
    const accessToken = getUserAccessToken();
    const refreshToken = getUserRefreshToken();

    try {
      const authResponse = await axios.get(
        `${`${process.env.REACT_APP_BASE_API_URL}/user/` || ""}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
          },
        }
      );

      this.loggedIn = true;
    } catch (err) {
      this.loggedIn = false;
      const tokenResponse = await axios.post(
        `${`${process.env.REACT_APP_BASE_API_URL}/user/token` || ""}`,
        {
          token: refreshToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setUserAccessToken(tokenResponse.data.accessToken);

      await this.isLoggedIn();
    }
    return this.loggedIn;
  };

  setUser = (user: User) => {
    this.user = user;
  };

  toggleLoggedIn() {
    this.loggedIn = !this.loggedIn;
  }

  logout() {
    const refreshToken = getUserRefreshToken();
    (async () => {
      try {
        await axios.delete(
          `${`${process.env.REACT_APP_BASE_API_URL}/user/logout` || ""}`,
          {
            headers: {
              "Content-Type": "application/json",
              token: refreshToken,
            },
          }
        );

        deleteUserTokenSet();
        return (this.loggedIn = false);
      } catch (err) {
        return console.log(err);
      }
    })();
  }
}

decorate(UserStore, {
  loggedIn: observable,
  register: register,
  login: action,
  isLoggedIn: action,
  toggleLoggedIn: action,
  user: observable,
  setUser: action,
  logout: action,
});

export const userStore = new UserStore();
