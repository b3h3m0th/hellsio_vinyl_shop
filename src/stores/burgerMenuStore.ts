import { decorate, observable } from "mobx";

export class BurgerMenuStore {
  opened: boolean = false;

  toggleBurgerMenu() {
    this.opened = !this.opened;
  }
}

decorate(BurgerMenuStore, {
  opened: observable,
});

export const burgerMenuStore = new BurgerMenuStore();
