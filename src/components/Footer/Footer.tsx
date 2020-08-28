import React from "react";
import "./Footer.scss";
import AudioVisualizer from "../AudioVisualizer/AudioVisualizer";
import { MusicStore } from "../../stores/musicStore";
import { inject, observer } from "mobx-react";

interface FooterProps {
  musicStore?: MusicStore;
}

const Footer = () => {
  return (
    <div className="footer">
      <div className="audio-wrapper">
        <AudioVisualizer />
      </div>
    </div>
  );
};

export default inject("musicStore")(observer(Footer));
