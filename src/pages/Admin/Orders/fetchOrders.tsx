import axios from "axios";
import { getAccessToken } from "../../../authorization/token";

const fetchOrders = async (): Promise<any> => {
  const accessToken = getAccessToken();
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_API_URL}/admin/orders`,
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data;
  } catch (err) {
    return console.log(err);
  }
};

export default fetchOrders;
