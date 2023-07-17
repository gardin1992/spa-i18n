import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Navbar() {
  const t = useTranslations("Navigation");

  return (
    <header>
      <nav>
        <Link href="/">{t("home")}</Link>
        <Link href="/account">{t("account")}</Link>
      </nav>
    </header>
  );
}
