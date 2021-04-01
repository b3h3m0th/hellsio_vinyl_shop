export type TokenSet = {
  accessToken: string;
  refreshToken: string;
};

export const storagePrefix = "hellsio-admin";

export const setAccessToken: (accessToken: string) => void = (
  accessToken: string
) => {
  window.localStorage.setItem(`${storagePrefix}-access-token`, accessToken);
};

export const setRefreshToken: (refreshToken: string) => void = (
  refreshToken: string
) => {
  window.localStorage.setItem(`${storagePrefix}-refresh-token`, refreshToken);
};

export const setTokenSet: (
  accessToken: string,
  refreshToken: string
) => void = (accessToken: string, refreshToken: string) => {
  window.localStorage.setItem(`${storagePrefix}-access-token`, accessToken);
  window.localStorage.setItem(`${storagePrefix}-refresh-token`, refreshToken);
};
