import axios from "axios";
import { getAccessToken } from "../../../authorization/token";

const fetchOrders: () => void = () => {
  const accessToken = getAccessToken();
  let result: any;
  (async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/admin/orders`,
        {
          headers: { authorization: `Bearer ${getAccessToken()}` },
        }
      );
      result = response.data;
    } catch (err) {
      return console.log(err);
    }
  })();
  return result;
};

export default fetchOrders;
