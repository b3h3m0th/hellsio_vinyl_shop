import { observable, action, makeAutoObservable } from "mobx";

export class BurgerMenuStore {
  @observable opened: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  @action toggleBurgerMenu = () => {
    this.opened = !this.opened;
  };

  @action open = () => {
    this.opened = true;
  };

  @action close = () => {
    this.opened = false;
  };
}

export const burgerMenuStore = new BurgerMenuStore();
