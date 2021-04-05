import { decorate, observable, action } from "mobx";
import axios from "axios";
import {
  deleteAdminTokenSet,
  getAdminAccessToken,
  getAdminRefreshToken,
  setAdminAccessToken,
  setAdminTokenSet,
} from "../authorization/token";

export class AdminStore {
  loggedIn: boolean = false;

  login(username: string, password: string) {
    (async () => {
      try {
        const loginResponse = await axios.post(
          `${`${process.env.REACT_APP_BASE_API_URL}/admin/login` || ""}`,
          {
            username: username,
            password: password,
          },
          { headers: { "Content-Type": "application/json" } }
        );

        setAdminTokenSet(
          loginResponse.data.accessToken,
          loginResponse.data.refreshToken
        );

        await this.isLoggedIn();
      } catch (err) {
        return console.log(err);
      }
    })();
  }

  isLoggedIn = async (): Promise<any> => {
    const accessToken = getAdminAccessToken();
    const refreshToken = getAdminRefreshToken();

    try {
      const authResponse = await axios.get(
        `${`${process.env.REACT_APP_BASE_API_URL}/admin/` || ""}`,
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
        `${`${process.env.REACT_APP_BASE_API_URL}/admin/token` || ""}`,
        {
          token: refreshToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setAdminAccessToken(tokenResponse.data.accessToken);

      return await this.isLoggedIn();
    }
    return this.loggedIn;
  };

  toggleLoggedIn() {
    this.loggedIn = !this.loggedIn;
  }

  logout() {
    (async () => {
      try {
        await axios.delete(
          `${`${process.env.REACT_APP_BASE_API_URL}/admin/logout` || ""}`,
          { headers: { "Content-Type": "application/json" } }
        );

        deleteAdminTokenSet();
        return (this.loggedIn = false);
      } catch (err) {
        return console.log(err);
      }
    })();
  }
}

decorate(AdminStore, {
  loggedIn: observable,
  login: action,
  toggleLoggedIn: action,
  logout: action,
});

export const adminStore = new AdminStore();
