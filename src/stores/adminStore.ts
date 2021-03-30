import { decorate, observable, action } from "mobx";

export class AdminStore {
  loggedIn: boolean = false;

  login() {
    this.loggedIn = true;
  }

  toggleLoggedIn() {
    this.loggedIn = !this.loggedIn;
  }

  logout() {
    this.loggedIn = false;
  }
}

decorate(AdminStore, {
  loggedIn: observable,
  login: action,
  toggleLoggedIn: action,
  logout: action,
});

export const adminStore = new AdminStore();
