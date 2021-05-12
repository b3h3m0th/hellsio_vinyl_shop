import React from "react";
import "./WebsiteContent.scss";
import { RedisStore } from "../../../stores/redisStore";
import { inject, observer } from "mobx-react";
import { useEffect } from "react";
import Title from "../../../components/Title/Title";
import { useState } from "react";
import GenreCheckBox from "../../../components/GenreList/GenreCheckBox/GenreCheckBox";

interface WebsiteContentProps {
  redisStore?: RedisStore;
}

const WebsiteContent: React.FC<WebsiteContentProps> = ({
  redisStore,
}: WebsiteContentProps) => {
  const [data, setData] = useState<{
    title: string;
    subtitle: string;
    maxProductAddToCartAmount: number;
    maxProductTotalOrderAmount: number;
    radioMusicEnabled: boolean;
  }>({
    title: "",
    subtitle: "",
    maxProductAddToCartAmount: 0,
    maxProductTotalOrderAmount: 0,
    radioMusicEnabled: true,
  });

  useEffect(() => {
    (async () => {
      const title = await redisStore?.getValue("hero-title");
      const subtitle = await redisStore?.getValue("hero-subtitle");
      const maxProductAddToCartAmount = await redisStore?.getValue(
        "max-product-add-to-cart-amount"
      );
      const maxProductTotalOrderAmount = await redisStore?.getValue(
        "max-product-total-order-amount"
      );
      const radioMusicEnabled = await redisStore?.getValue(
        "radio-music-enabled"
      );
      setData({
        title,
        subtitle,
        maxProductAddToCartAmount,
        maxProductTotalOrderAmount,
        radioMusicEnabled: radioMusicEnabled as boolean,
      });
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
        <Title link={`admin/website-content`} title="Website Settings" />
        <div className="admin-website-content__wrapper__setting">
          <span className="admin-website-content__wrapper__setting__header">
            Hero Title:
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
            Hero Subtitle:
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
        <div className="admin-website-content__wrapper__setting">
          <span className="admin-website-content__wrapper__setting__header">
            Max. Product add to cart Amount:
          </span>
          <input
            type="number"
            placeholder={data.maxProductAddToCartAmount.toString()}
            className="admin-website-content__wrapper__setting__input"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setData({ ...data, maxProductAddToCartAmount: +e.target.value });
            }}
            value={data.maxProductAddToCartAmount}
          />
          <span
            className="admin-website-content__wrapper__setting__save"
            onClick={() =>
              handleSave(
                "max-product-add-to-cart-amount",
                data.maxProductAddToCartAmount.toString()
              )
            }
          >
            Save
          </span>
        </div>
        <div className="admin-website-content__wrapper__setting">
          <span className="admin-website-content__wrapper__setting__header">
            Max. Product Total Order Amount:
          </span>
          <input
            type="number"
            placeholder={data.maxProductTotalOrderAmount.toString()}
            className="admin-website-content__wrapper__setting__input"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setData({ ...data, maxProductTotalOrderAmount: +e.target.value });
            }}
            value={data.maxProductTotalOrderAmount}
          />
          <span
            className="admin-website-content__wrapper__setting__save"
            onClick={() =>
              handleSave(
                "max-product-total-order-amount",
                data.maxProductTotalOrderAmount.toString()
              )
            }
          >
            Save
          </span>
        </div>
        <div className="admin-website-content__wrapper__setting">
          <span className="admin-website-content__wrapper__setting__header">
            Radio Music Enabled:
          </span>
          <GenreCheckBox
            checked={data.radioMusicEnabled}
            label=""
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setData({ ...data, radioMusicEnabled: e.target.checked });
            }}
            style={{ display: "inline-flex", width: 240 }}
          />
          <span
            className="admin-website-content__wrapper__setting__save"
            onClick={() =>
              handleSave(
                "radio-music-enabled",
                data.radioMusicEnabled.toString()
              )
            }
          >
            Save
          </span>
        </div>
      </div>
    </div>
  );
};

export default inject("redisStore")(observer(WebsiteContent));
