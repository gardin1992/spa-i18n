"use client";

import { useTranslations } from "next-intl";
import Link, { LinkProps } from "next/link";

type Props = {
  children?: React.ReactNode;
  title: React.ReactNode;
};

const ExternalLink = ({
  description,
  title,
  ...props
}: LinkProps & { title: string; description: string }) => {
  return (
    <div>
      <p>
        <Link {...props} target="_blank">{title}</Link>
      </p>
      <span>
        <p>{description}</p>
      </span>
    </div>
  );
};

export default function PageLayout({ children, title }: Props) {
  const t = useTranslations("PageLayout");

  return (
    <div>
      <h1>{title}</h1>
      <main>{children}</main>
      <div className="mt-auto grid grid-cols-1 gap-4 pt-20 md:grid-cols-2 lg:gap-12">
        <ExternalLink
          description={t("links.docs.description")}
          href={t("links.docs.href")}
          title={t("links.docs.title")}
        />

        <ExternalLink
          description={t("links.source.description")}
          href={t("links.source.href")}
          title={t("links.source.title")}
        />
      </div>
    </div>
  );
}
