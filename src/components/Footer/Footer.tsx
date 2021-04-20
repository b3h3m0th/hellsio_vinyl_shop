import React from "react";
import "./Footer.scss";
import AudioVisualizer from "../AudioVisualizer/AudioVisualizer";
import LanguageSwitch from "../LanguageSwitch/LanguageSwitch";
import { MusicStore } from "../../stores/musicStore";
import { inject, observer } from "mobx-react";

interface FooterProps {
  musicStore?: MusicStore;
}

const Footer: React.FC<FooterProps> = ({}: FooterProps) => {
  return (
    <div className="footer">
      <div className="audio-wrapper">
        <AudioVisualizer />
        <div className="audio-wrapper__credits">
          <a href="https://www.rm.fm/wackenradio" target="tab">
            RAUTEMUSIK - Wacken Radio
          </a>
        </div>
      </div>
      <LanguageSwitch />
    </div>
  );
};

export default inject("musicStore")(observer(Footer));
