import { decorate, observable, action } from "mobx";
import { User } from "../models/User";

export class LoginStore {
  user: User = {
    username: "Profile",
    email: "",
    registrationDate: new Date(1),
  };

  setUser = (user: User) => {
    this.user = user;
  };

  loggedIn: boolean = false;

  setLoggedIn = (loggedIn: boolean) => {
    this.loggedIn = loggedIn;
  };

  logout = () => {
    this.loggedIn = false;
  };
}

decorate(LoginStore, {
  user: observable,
  setUser: action,
  setLoggedIn: action,
  logout: action,
});

export const loginStore = new LoginStore();
