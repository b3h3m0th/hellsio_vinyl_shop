import React, { useEffect, useState } from "react";
import "./AudioVisualizer.scss";
import { MusicStore } from "../../stores/musicStore";
import { inject, observer } from "mobx-react";

interface AudioVisualizerProps {
  musicStore?: MusicStore;
}

const AudioVisualizer = ({ musicStore }: AudioVisualizerProps) => {
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
        }}
      >
        {visualizerBars}
      </div>
      <div></div>
    </>
  );
};

export default inject("musicStore")(observer(AudioVisualizer));
