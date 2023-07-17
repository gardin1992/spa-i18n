"use client";

import PageLayout from "@/components/PageLayout";
import { useAuthDispatch } from "@/lib/contexts/AuthContext";
import { useTranslations } from "next-intl";

export default function IndexPage() {
  const authenticationDispatch = useAuthDispatch();

  const t = useTranslations("LoginPage");

  const handleLogin = () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjQ1NDM0MjViZGQxYzE1ZDIzY2IzYSIsImVtYWlsIjoiamF5bGluLm1heWVyOTdAZ21haWwuY29tIiwidXNlcm5hbWUiOiJjZWxpYTk1IiwiZXhwIjoxNjg5NzE4NDA1LjM4NiwiaWF0IjoxNjg5NjMyMDA1fQ.QJP51W2aYTznfok1_rrdaN1uTZBcKkBApofpk2kJwVc";
    authenticationDispatch?.login(token);
  };

  return (
    <PageLayout title={t("title")}>
      <button onClick={handleLogin}>Login</button>
    </PageLayout>
  );
}
