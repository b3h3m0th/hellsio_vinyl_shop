import React, { useState, useEffect } from "react";
import "./Footer.scss";
import AudioVisualizer from "../AudioVisualizer/AudioVisualizer";
import LanguageSwitch from "../LanguageSwitch/LanguageSwitch";
import { MusicStore } from "../../stores/musicStore";
import { inject, observer } from "mobx-react";
import axios from "axios";

interface FooterProps {
  musicStore?: MusicStore;
}

const Footer: React.FC<FooterProps> = ({ musicStore }: FooterProps) => {
  const [currentSong, setCurrentSong] = useState<any>();

  useEffect(() => {
    const fetchCurrentSong = () => {
      (async () => {
        const songReponse = await axios.get(
          "https://api.laut.fm/station/wacken/current_song"
        );
        setCurrentSong(songReponse.data);
      })();
    };
    fetchCurrentSong();

    const fetchInterval = setInterval(fetchCurrentSong, 15000);
    return () => clearInterval(fetchInterval);
  }, []);
  return (
    <div className="footer">
      <div className="audio-wrapper">
        {musicStore?.enabled ? (
          <>
            <AudioVisualizer />
            <div className="audio-wrapper__content">
              <div className="audio-wrapper__content__song">
                Now Playing: {currentSong?.title} by {currentSong?.artist.name}
              </div>
              <div className="audio-wrapper__content__credits">
                <a
                  href="http://www.laut.fm/wacken"
                  target="_blank noopener noreferrer"
                >
                  laut.fm - Wacken Radio
                </a>
              </div>
            </div>
          </>
        ) : null}
      </div>
      <LanguageSwitch />
    </div>
  );
};

export default inject("musicStore")(observer(Footer));
