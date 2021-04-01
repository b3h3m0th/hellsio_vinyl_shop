import { decorate, observable, action } from "mobx";
import axios from "axios";
import { deleteTokenSet, setTokenSet } from "../authorization/token";

export class AdminStore {
  //write this as function
  // -> automatically check refresh token and request new one if needed (reduces logins)
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

        setTokenSet(
          loginResponse.data.accessToken,
          loginResponse.data.refreshToken
        );
        return (this.loggedIn = true);
      } catch (err) {
        return console.log(err);
      }
    })();
  }

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

        deleteTokenSet();
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
