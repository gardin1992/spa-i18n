import React from "react";

import AuthContextProvider from "./AuthContext";

const ContextProvider = ({ children }: any) => (
  <AuthContextProvider>{children}</AuthContextProvider>
);

export default ContextProvider;
