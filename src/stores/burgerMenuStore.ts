import { decorate, observable, action } from "mobx";

export class BurgerMenuStore {
  opened: boolean = false;

  toggleBurgerMenu = () => {
    this.opened = !this.opened;
  };
}

decorate(BurgerMenuStore, {
  opened: observable,
  toggleBurgerMenu: action,
});

export const burgerMenuStore = new BurgerMenuStore();
