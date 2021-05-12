import { observable, action, makeAutoObservable } from "mobx";
import { redisStore } from "./redisStore";

export class MusicStore {
  @observable playing: boolean = true;
  @observable enabled: boolean = false;

  constructor() {
    makeAutoObservable(this);
    (async () => {
      console.log(await redisStore.getValue("radio-music-enabled"));
      this.setEnabled(await redisStore.getValue("radio-music-enabled"));
    })();
  }

  @action togglePlaying: () => void = () => {
    this.playing = !this.playing;
  };

  @action setPlaying: (value: boolean) => void = (value) => {
    this.playing = value;
  };

  @action setEnabled: (value: boolean) => void = (value) => {
    this.enabled = value;
  };
}

export const musicStore = new MusicStore();
