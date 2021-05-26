import React from "react";
import "./TOS.scss";
import { useEffect } from "react";
import Title from "../../components/Title/Title";
import { RedisStore } from "../../stores/redisStore";
import { inject, observer } from "mobx-react";
import { useState } from "react";

interface TOSProps {
  redisStore?: RedisStore;
}

const TOS: React.FC<TOSProps> = ({ redisStore }: TOSProps) => {
  const [TOS, setTOS] = useState();
  useEffect(() => {
    (async () => {
      setTOS(await redisStore?.getValue("terms-of-service"));
    })();
  }, []);

  console.log(TOS);

  return (
    <div className="tos">
      <div className="tos__wrapper">
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
