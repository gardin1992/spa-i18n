"use client";

import { useAuthDispatch } from "@/lib/contexts/AuthContext";
import React from "react";

export default function LogoutPage() {
  const authenticationDispatch = useAuthDispatch();

  React.useEffect(() => {
    authenticationDispatch?.logout();
  }, [authenticationDispatch]);

  return <p>wait Logout</p>;
}
