import React from "react";
import "./TOS.scss";
import { useEffect } from "react";
import Title from "../../components/Title/Title";
import { RedisStore } from "../../stores/redisStore";
import { inject, observer } from "mobx-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const arrowRight = require("../../assets/icons/arrowRight/arrowRight.png");

interface TOSProps {
  redisStore?: RedisStore;
}

const TOS: React.FC<TOSProps> = ({ redisStore }: TOSProps) => {
  const [TOS, setTOS] = useState();
  useEffect(() => {
    (async () => {
      setTOS(await redisStore?.getValue("terms-of-service"));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="tos">
      <div className="tos__wrapper">
        <Link to="shopping-bag" className="tos__wrapper__back">
          <img src={arrowRight} alt="Hellsio arrow left" /> Back to Checkout
        </Link>
        <Title link={`tos`} title="Terms of Service" />
        <div
          className="tos__wrapper__tos"
          dangerouslySetInnerHTML={{ __html: TOS || "" }}
        ></div>
      </div>
    </div>
  );
};

export default inject("redisStore")(observer(TOS));
