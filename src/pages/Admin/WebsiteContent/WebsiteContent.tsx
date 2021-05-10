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
  const [data, setData] = useState<any>({ title: "", subtitle: "" });

  useEffect(() => {
    (async () => {
      const title = await redisStore?.getValue("hero-title");
      const subtitle = await redisStore?.getValue("hero-subtitle");
      setData({ title: title, subtitle: subtitle });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = (key: string, value: string | undefined) => {
    (async () => {
      await redisStore?.setValue(key, value || "");
    })();
  };

  return (
    <div className="admin-website-content">
      <div className="admin-website-content__wrapper">
        <Title link={`admin/website-content`} title="Website Content" />
        <div className="admin-website-content__wrapper__setting">
          <span className="admin-website-content__wrapper__setting__header">
            Hero Title:{" "}
          </span>
          <input
            type="text"
            placeholder={data.title}
            className="admin-website-content__wrapper__setting__input"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setData({ ...data, title: e.target.value });
            }}
            value={data.title}
          />
          <span
            className="admin-website-content__wrapper__setting__save"
            onClick={() => handleSave("hero-title", data.title)}
          >
            Save
          </span>
        </div>
        <div className="admin-website-content__wrapper__setting">
          <span className="admin-website-content__wrapper__setting__header">
            {" "}
            Hero Subtitle
          </span>
          <input
            type="text"
            placeholder={data.subtitle}
            className="admin-website-content__wrapper__setting__input"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setData({ ...data, subtitle: e.target.value });
            }}
            value={data.subtitle}
          />
          <span
            className="admin-website-content__wrapper__setting__save"
            onClick={() => handleSave("hero-subtitle", data.subtitle)}
          >
            Save
          </span>
        </div>
      </div>
    </div>
  );
};

export default inject("redisStore")(observer(WebsiteContent));
