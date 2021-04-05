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

export class UserStore {
  loggedIn: boolean = false;

  user: User = {
    username: "Profile",
    email: "",
    registrationDate: new Date(1),
  };

  login(email: string, password: string) {
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

        await this.isLoggedIn();
      } catch (err) {
        return console.log(err);
      }
    })();
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

      console.log(authResponse);

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

      return await this.isLoggedIn();
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
    (async () => {
      try {
        await axios.delete(
          `${`${process.env.REACT_APP_BASE_API_URL}/user/logout` || ""}`,
          { headers: { "Content-Type": "application/json" } }
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
  login: action,
  isLoggedIn: action,
  toggleLoggedIn: action,
  user: observable,
  setUser: action,
  logout: action,
});

export const userStore = new UserStore();
