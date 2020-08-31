import { decorate, observable, action } from "mobx";

export class BurgerMenuStore {
  opened: boolean = false;

  toggleBurgerMenu = () => {
    this.opened = !this.opened;
  };

  open = () => {
    this.opened = true;
  };

  close = () => {
    this.opened = false;
  };
}

decorate(BurgerMenuStore, {
  opened: observable,
  toggleBurgerMenu: action,
  open: action,
  close: action,
});

export const burgerMenuStore = new BurgerMenuStore();
