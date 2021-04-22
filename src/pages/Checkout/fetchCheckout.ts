import axios from "axios";

export const fetchCheckout = async (): Promise<any | string> => {
  try {
    const checkoutResponse = await axios.get(
      `${process.env.REACT_APP_BASE_API_URL}/user/checkout`
    );

    return checkoutResponse.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
