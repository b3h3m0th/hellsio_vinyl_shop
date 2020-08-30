import React from "react";
import "./Footer.scss";
import AudioVisualizer from "../AudioVisualizer/AudioVisualizer";
import LanguageSwitch from "../LanguageSwitch/LanguageSwitch";
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
      <LanguageSwitch />
    </div>
  );
};

export default inject("musicStore")(observer(Footer));
