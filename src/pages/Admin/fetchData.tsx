import axios from "axios";
import {
  getAdminAccessToken,
  getAdminRefreshToken,
  setAdminAccessToken,
} from "../../authorization/token";

export const adminEnpoints = ["orders", "products", "customers"] as const;

export type AdminDataEntpoint = typeof adminEnpoints[number];

const fetchData = async (endpoint: AdminDataEntpoint): Promise<any> => {
  const accessToken = getAdminAccessToken();
  const refreshToken = getAdminRefreshToken();
  let response;
  try {
    response = await axios.get(
      `${process.env.REACT_APP_BASE_API_URL}/admin/${endpoint}`,
      {
        headers: { authorization: `Bearer ${accessToken}` },
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

    setAdminAccessToken(tokenResponse.data.accessToken);
    return await fetchData(endpoint);
  }
};

export default fetchData;
