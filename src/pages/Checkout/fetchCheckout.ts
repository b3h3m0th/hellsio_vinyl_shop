import axios from "axios";
import {
  getUserAccessToken,
  getUserRefreshToken,
  setUserAccessToken,
} from "../../authorization/token";
import { BillingData } from "./Checkout";

export const fetchCheckout = async (
  billingData: BillingData
): Promise<any | string> => {
  const accessToken = getUserAccessToken();
  const refreshToken = getUserRefreshToken();
  let response;

  try {
    response = await axios.post(
      `${process.env.REACT_APP_BASE_API_URL}/user/checkout`,
      {
        billingData: billingData,
      },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (err) {
    const tokenResponse = await axios.post(
      `${`${process.env.REACT_APP_BASE_API_URL}/user/token` || ""}`,
      {
        token: refreshToken,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    setUserAccessToken(tokenResponse.data.accessToken);
    return await fetchCheckout(billingData);
  }
};

export const fetchCreatePaymentIntent = async (
  billingData: BillingData
): Promise<any | string> => {
  const accessToken = getUserAccessToken();
  const refreshToken = getUserRefreshToken();
  let response;

  try {
    response = await axios.post(
      `${process.env.REACT_APP_BASE_API_URL}/user/checkout`,
      {
        billingData: billingData,
      },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (err) {
    const tokenResponse = await axios.post(
      `${`${process.env.REACT_APP_BASE_API_URL}/admin/token` || ""}`,
      {
        token: refreshToken,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    setUserAccessToken(tokenResponse.data.accessToken);
    return await fetchCheckout(billingData);
  }
};
