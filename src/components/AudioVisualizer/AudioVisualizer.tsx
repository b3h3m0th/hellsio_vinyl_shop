import React, { useEffect, useState } from "react";
import "./AudioVisualizer.scss";
import { MusicStore } from "../../stores/musicStore";
import { inject, observer } from "mobx-react";
import { Howl, Howler } from "howler";

//songs
const temple_of_hate = require("../../assets/audio/angra-temple_of_hate.mp3");
const ecclesia_diabolica_catholica = require("../../assets/audio/behemoth-ecclesia_diabolica_catholica.mp3");
const wash_it_all_away = require("../../assets/audio/five_finger_death_punch-wash_it_all_away.mp3");
const rats = require("../../assets/audio/ghost-rats.mp3");

interface AudioVisualizerProps {
  musicStore?: MusicStore;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  musicStore,
}: AudioVisualizerProps) => {
  const [audioPlaying, setAudioPlaying] = useState<boolean | undefined>(
    musicStore?.playing
  );

  const songs = [
    ecclesia_diabolica_catholica,
    temple_of_hate,
    rats,
    wash_it_all_away,
  ];

  useEffect(() => {
    new Howl({
      src: songs,
      autoplay: true,
      volume: 0.1,
      mute: audioPlaying ? false : true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visualizer = {
    count: 13,
  };

  let visualizerBars = [];

  for (let i = 0; i < visualizer.count; i++) {
    visualizerBars.push(
      <div
        className="audio-visualizer__bar"
        key={i}
        id={`audio-visualizer__bar__${i}`}
      ></div>
    );
  }

  const setBarColor = (active: boolean) => {
    const bars = document.getElementsByClassName(
      "audio-visualizer__bar"
    ) as HTMLCollectionOf<HTMLElement>;
    if (active) {
      for (let i = 0; i < bars.length; i++) {
        bars[i].style.backgroundColor = "#AE0B00";
        bars[i].style.opacity = "1";
      }
    } else {
      for (let i = 0; i < bars.length; i++) {
        bars[i].style.backgroundColor = "#fff";
        bars[i].style.opacity = "0.5";
      }
    }
  };

  useEffect(() => {
    if (musicStore?.playing) {
      setBarColor(true);
    } else {
      setBarColor(false);
    }
  });

  useEffect(() => {
    if (musicStore?.playing) {
      setBarColor(true);
      setInterval(() => {
        const bars = document.getElementsByClassName(
          "audio-visualizer__bar"
        ) as HTMLCollectionOf<HTMLElement>;
        let newHeight = 0;
        while (newHeight < 8) {
          newHeight = Math.floor(Math.random() * 30) + 1;
        }
        bars[
          Math.floor(Math.random() * bars.length)
        ].style.height = `${newHeight}px`;
      }, 100);
      setInterval(() => {
        const bars = document.getElementsByClassName(
          "audio-visualizer__bar"
        ) as HTMLCollectionOf<HTMLElement>;
        let newHeight = 0;
        while (newHeight < 8) {
          newHeight = Math.floor(Math.random() * 25) + 1;
        }
        bars[
          Math.floor(Math.random() * bars.length)
        ].style.height = `${newHeight}px`;
      }, 50);
    } else {
      setBarColor(false);
    }
  }, [musicStore]);

  if (musicStore?.playing) {
    setBarColor(true);
  } else {
    setBarColor(false);
  }

  return (
    <>
      <div
        className="audio-visualizer"
        onClick={() => {
          musicStore?.togglePlaying();
          if (audioPlaying) {
            Howler.mute(true);
            setAudioPlaying(false);
          } else {
            Howler.mute(false);
            setAudioPlaying(true);
          }
        }}
      >
        {visualizerBars}
      </div>
    </>
  );
};

export default inject("musicStore")(observer(AudioVisualizer));
