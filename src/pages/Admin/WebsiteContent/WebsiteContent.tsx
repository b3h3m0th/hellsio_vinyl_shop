import React from "react";
import "./WebsiteContent.scss";
import { RedisStore } from "../../../stores/redisStore";
import { inject, observer } from "mobx-react";
import { useEffect } from "react";
import Title from "../../../components/Title/Title";
import { useState } from "react";

interface WebsiteContentProps {
  redisStore?: RedisStore;
}

const WebsiteContent: React.FC<WebsiteContentProps> = ({
  redisStore,
}: WebsiteContentProps) => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    (async () => {
      await redisStore?.getValue("hero-title");
      setData(null);
    })();
  }, []);

  const handleSave = (value: string | undefined) => {
    (async () => {
      await redisStore?.setValue("hero-title", value || "");
    })();
  };

  return (
    <div className="admin-website-content">
      <div className="admin-website-content__wrapper">
        <Title link={`admin/website-content`} title="Website Content" />
        <div className="admin-website-content__wrapper__setting">
          Hero Title:{" "}
          <input
            type="text"
            min={1}
            className="admin-website-content__wrapper__setting__input"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setData(e.target.value);
            }}
            value={data.title}
          />
          <span
            className="admin-website-content__wrapper__setting__save"
            onClick={() => handleSave(data.title)}
          >
            Save
          </span>
        </div>
      </div>
    </div>
  );
};

export default inject("redisStore")(observer(WebsiteContent));
