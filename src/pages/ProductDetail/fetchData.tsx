import axios from "axios";

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
