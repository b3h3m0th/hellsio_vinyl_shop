import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
} from "../../../authorization/token";

const fetchOrders = async (): Promise<any> => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  let response;
  try {
    response = await axios.get(
      `${process.env.REACT_APP_BASE_API_URL}/admin/orders`,
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

    setAccessToken(tokenResponse.data.accessToken);
    return await fetchOrders();
  }
};

export default fetchOrders;
