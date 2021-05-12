import { observable, action, makeAutoObservable } from "mobx";

export class MusicStore {
  @observable playing: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  @action togglePlaying: () => void = () => {
    this.playing = !this.playing;
  };

  @action setPlaying: (value: boolean) => void = (value) => {
    this.playing = value;
  };
}

export const musicStore = new MusicStore();
