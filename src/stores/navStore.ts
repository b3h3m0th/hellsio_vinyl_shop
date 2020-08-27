import { decorate, observable } from "mobx";
import { NavItem } from "../models/NavItem";

export class NavStore {
  items: NavItem[] = [
    {
      src: 1,
      id: "newarrivals",
      navLabel: "NEW ARRIVALS",
      active: false,
    },
    {
      src: 2,
      id: "featured",
      navLabel: "FEATURED",
      active: false,
    },
    {
      src: 3,
      id: "popular",
      navLabel: "POPULAR",
      active: false,
    },
  ];

  getCurrentItem(currentPage: string) {
    let currentItem = null;
    this.items.forEach((item) => {
      if (item.id === currentPage) {
        currentItem = item;
      }
    });
    return currentItem;
  }

  setNavItem(newItem: NavItem, id: string) {
    console.log(newItem);
  }
}

decorate(NavStore, {
  items: observable,
});

export const navStore = new NavStore();
