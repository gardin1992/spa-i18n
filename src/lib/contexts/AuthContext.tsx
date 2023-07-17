import React from "react";
import { usePathname, useRouter } from "next-intl/client";
import {
  clearToken,
  getToken,
  getValidCredentials,
  saveToken,
} from "../utils/jwt";
import { KeyValue } from "../types/KeyValue";
import { JwtPayload } from "jwt-decode";
import useSearchParamsOrigin from "../hooks/useSearchParamsOrigin";

export type IAuthCredentials = JwtPayload & KeyValue<any>;

export type IAuthState = {
  authenticated: boolean;
  credentials?: IAuthCredentials;
};

const AuthStateContext = React.createContext<IAuthState | undefined>(undefined);

export type IAuthDispatch = {
  login: (token: string) => void;
  logout: () => void;
};

const AuthDispatchContext = React.createContext<IAuthDispatch | undefined>(
  undefined
);

const AuthContextProvider = ({ children }: { children?: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [verifiedToken, setVerifiedToken] = React.useState(false);
  const [authenticated, setAuthenticated] = React.useState<boolean>();
  const [credentials, setCredentials] = React.useState<IAuthCredentials>();

  const isLogin = React.useMemo(() => pathname.includes("login"), [pathname]);
  const origin = useSearchParamsOrigin();

  const goLogin = React.useCallback(() => {
    if (!isLogin) router.push(`/login?origin=${origin}`);
  }, [router, isLogin, origin]);

  const goUrl = React.useCallback(() => {
    if (isLogin) router.push(origin ?? "/");
  }, [router, isLogin, origin]);

  const getCredentials = React.useCallback((token?: string) => {
    let authenticated = false;
    try {
      const credentials = getValidCredentials(
        typeof token === "string" ? token : undefined
      );

      authenticated = true;
      setCredentials(credentials as IAuthCredentials);
    } catch (error) {
      console.log(error instanceof Error ? error.message : String(error));
      setCredentials(undefined);
    } finally {
      setAuthenticated(authenticated);
      setVerifiedToken(true);
    }
  }, []);

  React.useEffect(() => {
    getCredentials(getToken());
  }, [getCredentials]);

  React.useEffect(() => {
    if (!verifiedToken || typeof authenticated === "undefined") {
    } else {
      if (authenticated) goUrl();
      else goLogin();
    }
  }, [authenticated, verifiedToken, goLogin, goUrl]);

  const logout = React.useCallback(() => {
    clearToken();
    setAuthenticated(false);
    setCredentials(undefined);
    goLogin();
  }, [goLogin]);

  const login = React.useCallback(
    (token: string) => {
      saveToken(token);
      getCredentials(token);
    },
    [getCredentials]
  );

  if (!verifiedToken) return <div>wait verifiedToken</div>;

  return (
    <AuthDispatchContext.Provider
      value={{
        logout,
        login,
      }}
    >
      <AuthStateContext.Provider
        value={{
          authenticated: !!authenticated,
          credentials,
        }}
      >
        {children}
      </AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  );
};

export const useAuthState = () => {
  const state = React.useContext(AuthStateContext);
  return state;
};

export const useAuthDispatch = () => {
  const dispatch = React.useContext(AuthDispatchContext);
  return dispatch;
};

export default AuthContextProvider;
