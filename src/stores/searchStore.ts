import { observable, action, makeAutoObservable } from "mobx";

export class SearchStore {
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

export const searchStore = new SearchStore();
