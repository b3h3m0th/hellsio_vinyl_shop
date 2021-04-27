import { observable, action, makeAutoObservable } from "mobx";

export class MusicStore {
  @observable playing: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  @action togglePlaying: () => void = () => {
    this.playing = !this.playing;
  };
}

export const musicStore = new MusicStore();
