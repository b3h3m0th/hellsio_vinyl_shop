import axios from "axios";
import {
  getAdminAccessToken,
  getAdminRefreshToken,
  setAdminAccessToken,
} from "../../../authorization/token";

export const fetchTopCustomers = async (count: number): Promise<void> => {
  const accessToken = getAdminAccessToken();
  const refreshToken = getAdminRefreshToken();
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_API_URL}/admin/customers/top/${count}`,
      { headers: { authorization: `Bearer ${accessToken}` } }
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

    setAdminAccessToken(tokenResponse.data.accessToken);
    return await fetchTopCustomers(count);
  }
};

export const fetchTopSellingAlbums = async (count: number): Promise<void> => {
  const accessToken = getAdminAccessToken();
  const refreshToken = getAdminRefreshToken();
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_API_URL}/admin/products/top/${count}`,
      { headers: { authorization: `Bearer ${accessToken}` } }
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

    setAdminAccessToken(tokenResponse.data.accessToken);
    return await fetchTopCustomers(count);
  }
};

export const fetchTopSellingCountries = async (
  count: number
): Promise<void> => {
  const accessToken = getAdminAccessToken();
  const refreshToken = getAdminRefreshToken();
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_API_URL}/admin/countries/top/${count}`,
      { headers: { authorization: `Bearer ${accessToken}` } }
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

    setAdminAccessToken(tokenResponse.data.accessToken);
    return await fetchTopSellingCountries(count);
  }
};
