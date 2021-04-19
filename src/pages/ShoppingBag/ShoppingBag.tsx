import React, { useState, useEffect } from "react";
import "./ShoppingBag.scss";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import { LanguageStore } from "../../stores/languageStore";
import Title from "../../components/Title/Title";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { CheckoutStore } from "../../stores/checkoutStore";
import QuantityPicker from "../../components/QuantityPicker/QuantityPicker";
import DropDownPicker from "../../components/DropDownPicker/DropDownPicker";
import gsap from "gsap";
import toBase64 from "../../util/toBase64";
import axios from "axios";

const arrowRight = require("../../assets/icons/arrowRight/arrowRightWhite.png");
const paymentOptions = require("../../data/payment_options.json");

interface CheckoutProps {
  languageStore?: LanguageStore;
  checkoutStore?: CheckoutStore;
}

const Checkout: React.FC<CheckoutProps> = ({
  languageStore,
  checkoutStore,
}: CheckoutProps) => {
  const [formats, setFormats] = useState<Array<any>>([]);

  const handleFormatChange = (e: any) => {
    setFormats([...formats, e.target.value]);
  };

  useEffect(() => {
    gsap.fromTo(
      ".checkout__products__wrapper__product",
      1.8,
      {
        opacity: 0,
        x: 100,
      },
      {
        opacity: 1,
        x: 0,
        ease: "power4",
        stagger: 0.2,
      }
    );

    (async () => {
      setFormats((await checkoutStore?.fetchFormates()) || []);
    })();
  }, []);

  console.log(formats);

  return (
    <div className="checkout">
      <div className="checkout__payment">
        <div className="checkout__payment__content">
          <Title title="Your shopping bag" link={`shopping-bag`} />
          <p className="checkout__payment__content__subtitle">
            Continue to checkout <br /> and payment process
          </p>
          <div className="checkout__payment__content__payment-info">
            <ul>
              <li>
                <span>Free shipping</span>
              </li>
              <li>
                <span> 2 - 7 days delivery time</span>
              </li>
              <li>
                <span className="payment-options">
                  {paymentOptions.map((opt: any, index: number) => {
                    const img = require(`../../assets/img/payment_options/${opt.img}`);
                    return (
                      <img
                        key={index}
                        src={img}
                        alt="Hellsio payment option"
                        style={{ height: opt.imgSize }}
                      />
                    );
                  })}
                </span>
              </li>
            </ul>
          </div>
          <PrimaryButton label="checkout" icon={arrowRight} link="checkout" />
        </div>
      </div>
      <div className="checkout__products">
        <div className="checkout__products__wrapper">
          {toJS(checkoutStore?.products)?.map((p: any, index) => {
            return (
              <div key={index} className="checkout__products__wrapper__product">
                <img
                  className="checkout__products__wrapper__product__album-cover"
                  src={`data:image/png;base64,${toBase64(p.cover.data)}`}
                  alt="Hellsio album cover"
                />
                <div className="checkout__products__wrapper__product__name">
                  <p className="checkout__products__wrapper__product__name__title">
                    {p.name}
                  </p>
                  <p className="checkout__products__wrapper__product__name__artist">
                    {p.artist}
                  </p>
                </div>
                <div className="checkout__products__wrapper__product__quantity">
                  <QuantityPicker label="Quantity" maxValue={5} />
                </div>
                <div className="checkout__products__wrapper__product__format">
                  <DropDownPicker
                    label="Format"
                    options={[
                      ...formats.map((format: any) => {
                        return { id: format.name, optionValue: p.price };
                      }),
                    ]}
                    onChange={(e) => handleFormatChange(e)}
                  />
                </div>
                <div className="checkout__products__wrapper__product__price">
                  <div className="checkout__products__wrapper__product__price__price">
                    $ {p.price}
                  </div>
                  <div className="checkout__products__wrapper__product__price__per-item">
                    per item
                  </div>
                </div>

                <div className="checkout__products__wrapper__product__remove">
                  <span
                    className="checkout__products__wrapper__product__remove__text"
                    onClick={() => checkoutStore?.removeProduct(index)}
                  >
                    remove
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default inject("languageStore", "checkoutStore")(observer(Checkout));
