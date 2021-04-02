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

export const deleteTokenSet: () => void = () => {
  window.localStorage.removeItem(`${storagePrefix}-access-token`);
  window.localStorage.removeItem(`${storagePrefix}-refresh-token`);
};

export const deleteAccessToken: () => void = () => {
  window.localStorage.removeItem(`${storagePrefix}-access-token`);
};

export const deleteRefreshToken: () => void = () => {
  window.localStorage.removeItem(`${storagePrefix}-refresh-token`);
};

export const getAccessToken: () => void = () => {
  return window.localStorage.getItem(`${storagePrefix}-access-token`) || "";
};

export const getRefreshToken: () => string = () => {
  return window.localStorage.getItem(`${storagePrefix}-refresh-token`) || "";
};

export const getTokenSet: () => TokenSet = () => {
  return {
    accessToken:
      window.localStorage.getItem(`${storagePrefix}-access-token`) || "",
    refreshToken:
      window.localStorage.getItem(`${storagePrefix}-refresh-token`) || "",
  };
};
