import axios from "axios";
import { action, makeAutoObservable, observable } from "mobx";
import {
  getAdminAccessToken,
  getAdminRefreshToken,
  setAdminAccessToken,
} from "../authorization/token";

export const redisHellsioPrefix = "hellsio-" as const;

export class RedisStore {
  @observable handover: any;

  constructor() {
    makeAutoObservable(this);
  }

  @action setHandover: (value: any) => void = (value) => {
    this.handover = value;
  };

  @action setValue = async (key: string, value: string): Promise<any> => {
    const accessToken = getAdminAccessToken();
    const refreshToken = getAdminRefreshToken();

    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/admin/site-content/edit`,
        {
          key: key,
          value: value,
        },
        { headers: { authorization: `Bearer ${accessToken}` } }
      );
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
    }
  };

  @action getValue = async (key: string): Promise<any> => {
    const accessToken = getAdminAccessToken();
    const refreshToken = getAdminRefreshToken();

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/admin/site-content/value`,
        { headers: { authorization: `Bearer ${accessToken}`, key: key } }
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
    }
  };
}

export const redisStore = new RedisStore();
