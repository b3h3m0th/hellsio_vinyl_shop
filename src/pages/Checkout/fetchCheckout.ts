import axios from "axios";
import { getUserAccessToken } from "../../authorization/token";
import { BillingData } from "./Checkout";

export const fetchCheckout = async (
  billingData: BillingData
): Promise<any | string> => {
  try {
    const checkoutResponse = await axios.post(
      `${process.env.REACT_APP_BASE_API_URL}/user/checkout`,
      {
        billingData: billingData,
        token: getUserAccessToken(),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return checkoutResponse.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
