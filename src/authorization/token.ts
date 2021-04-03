export type TokenSet = {
  accessToken: string;
  refreshToken: string;
};

export const adminStoragePrefix = "hellsio-admin";
export const userStoragePrefix = "hellsio-user";

export const setAdminAccessToken: (accessToken: string) => void = (
  accessToken: string
) => {
  window.localStorage.setItem(
    `${adminStoragePrefix}-access-token`,
    accessToken
  );
};

export const setAdminRefreshToken: (refreshToken: string) => void = (
  refreshToken: string
) => {
  window.localStorage.setItem(
    `${adminStoragePrefix}-refresh-token`,
    refreshToken
  );
};

export const setAdminTokenSet: (
  accessToken: string,
  refreshToken: string
) => void = (accessToken: string, refreshToken: string) => {
  window.localStorage.setItem(
    `${adminStoragePrefix}-access-token`,
    accessToken
  );
  window.localStorage.setItem(
    `${adminStoragePrefix}-refresh-token`,
    refreshToken
  );
};

export const deleteAdminTokenSet: () => void = () => {
  window.localStorage.removeItem(`${adminStoragePrefix}-access-token`);
  window.localStorage.removeItem(`${adminStoragePrefix}-refresh-token`);
};

export const deleteAdminAccessToken: () => void = () => {
  window.localStorage.removeItem(`${adminStoragePrefix}-access-token`);
};

export const deleteAdminRefreshToken: () => void = () => {
  window.localStorage.removeItem(`${adminStoragePrefix}-refresh-token`);
};

export const getAdminAccessToken: () => string = () => {
  return (
    window.localStorage.getItem(`${adminStoragePrefix}-access-token`) || ""
  );
};

export const getAdminRefreshToken: () => string = () => {
  return (
    window.localStorage.getItem(`${adminStoragePrefix}-refresh-token`) || ""
  );
};

export const getAdminTokenSet: () => TokenSet = () => {
  return {
    accessToken:
      window.localStorage.getItem(`${adminStoragePrefix}-access-token`) || "",
    refreshToken:
      window.localStorage.getItem(`${adminStoragePrefix}-refresh-token`) || "",
  };
};

//
export const setUserAccessToken: (accessToken: string) => void = (
  accessToken: string
) => {
  window.localStorage.setItem(`${userStoragePrefix}-access-token`, accessToken);
};

export const setUserRefreshToken: (refreshToken: string) => void = (
  refreshToken: string
) => {
  window.localStorage.setItem(
    `${userStoragePrefix}-refresh-token`,
    refreshToken
  );
};

export const setUserTokenSet: (
  accessToken: string,
  refreshToken: string
) => void = (accessToken: string, refreshToken: string) => {
  window.localStorage.setItem(`${userStoragePrefix}-access-token`, accessToken);
  window.localStorage.setItem(
    `${userStoragePrefix}-refresh-token`,
    refreshToken
  );
};

export const deleteUserTokenSet: () => void = () => {
  window.localStorage.removeItem(`${userStoragePrefix}-access-token`);
  window.localStorage.removeItem(`${userStoragePrefix}-refresh-token`);
};

export const deleteUserAccessToken: () => void = () => {
  window.localStorage.removeItem(`${userStoragePrefix}-access-token`);
};

export const deleteUserRefreshToken: () => void = () => {
  window.localStorage.removeItem(`${userStoragePrefix}-refresh-token`);
};

export const getUserAccessToken: () => string = () => {
  return window.localStorage.getItem(`${userStoragePrefix}-access-token`) || "";
};

export const getUserRefreshToken: () => string = () => {
  return (
    window.localStorage.getItem(`${userStoragePrefix}-refresh-token`) || ""
  );
};

export const getUserTokenSet: () => TokenSet = () => {
  return {
    accessToken:
      window.localStorage.getItem(`${userStoragePrefix}-access-token`) || "",
    refreshToken:
      window.localStorage.getItem(`${userStoragePrefix}-refresh-token`) || "",
  };
};
