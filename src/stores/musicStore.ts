import { decorate, observable, action } from "mobx";

export class MusicStore {
  playing: boolean = true;

  togglePlaying: () => void = () => {
    this.playing = !this.playing;
  };
}

decorate(MusicStore, {
  playing: observable,
  togglePlaying: action,
});

export const musicStore = new MusicStore();
