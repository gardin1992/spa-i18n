"use client";

import PageLayout from "@/components/PageLayout";
import { useAuthState } from "@/lib/contexts/AuthContext";
import { useTranslations } from "next-intl";

export default function AccountPage() {
  const authenticationState = useAuthState();
  const t = useTranslations("AccountPage");

  return (
    <PageLayout title={t("title")}>
      <h3>{t("title")}</h3>
      <ul>
        <li>{t("credentials")}</li>
        <li>
          <p>
            {t("credentialsName")}: {authenticationState?.credentials?.name}
          </p>
        </li>
        <li>
          <p>
            {t("credentialsEmail")}: {authenticationState?.credentials?.email}
          </p>
        </li>
        <li>
          <p>
            {t("credentialsUsername")}:{" "}
            {authenticationState?.credentials?.username}
          </p>
        </li>
      </ul>
    </PageLayout>
  );
}
