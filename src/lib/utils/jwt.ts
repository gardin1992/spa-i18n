import jwtDecode, { JwtPayload } from "jwt-decode";
import secureLocalStorage from "react-secure-storage";

export enum TokenErrorKind {
  INVALID_TOKEN = "INVALID_TOKEN",
  EXPIRED_TOKEN = "EXPIRED_TOKEN",
  EMPTY_TOKEN = "EMPTY_TOKEN",
}

export class TokenInvalidError extends Error {
  constructor() {
    super(TokenErrorKind.INVALID_TOKEN);
  }
}

export class TokenExpiredError extends Error {
  constructor() {
    super(TokenErrorKind.EXPIRED_TOKEN);
  }
}

export class TokenEmptyError extends Error {
  constructor() {
    super(TokenErrorKind.EMPTY_TOKEN);
  }
}

export const tokenDecode = (token: string) => {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    return TokenErrorKind.INVALID_TOKEN;
  }
};

export const tokenExpired = (jwt: JwtPayload) =>
  !!jwt.exp ? jwt.exp < Date.now() / 1000 : false;

export const getValidCredentials = (token?: string) => {
  if (typeof token !== "string" || !token) throw new TokenEmptyError();

  const jwt = tokenDecode(token);

  if (jwt === TokenErrorKind.INVALID_TOKEN) throw new TokenInvalidError();

  if (tokenExpired(jwt)) throw new TokenExpiredError();

  return jwt;
};

export const clearToken = () => secureLocalStorage.removeItem("token");

export const saveToken = (token: string) =>
  secureLocalStorage.setItem("token", token);

export const getToken = () => {
  const token = secureLocalStorage.getItem("token");
  return null !== token ? (token as string) : "";
};
