import axios from "axios";
import {
  getUserAccessToken,
  getUserRefreshToken,
  setUserAccessToken,
} from "../../authorization/token";

export const fetchAlbum = async (albumCode: string): Promise<any> => {
  try {
    const albumResponse = await axios.get(
      `${process.env.REACT_APP_BASE_API_URL}/product/${albumCode}`
    );
    return albumResponse.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchAlbums = async (): Promise<any> => {
  try {
    const albumResponse = await axios.get(
      `${process.env.REACT_APP_BASE_API_URL}/product`
    );
    return albumResponse.data;
  } catch (err) {
    console.log(err);
  }
};

export const addRate = async (value: number): Promise<any> => {
  const accessToken = getUserAccessToken();
  const refreshToken = getUserRefreshToken();
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_API_URL}/rating/rate`,
      { value },
      { headers: { authorization: `Bearer ${accessToken}` } }
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
    return await addRate(value);
  }
};
