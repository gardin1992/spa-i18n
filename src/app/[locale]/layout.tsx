"use client";

import clsx from "clsx";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import {
  createTranslator,
  IntlErrorCode,
  NextIntlClientProvider,
} from "next-intl";
import { ReactNode } from "react";
import ContextProvider from "@/lib/contexts";
import Navbar from "@/components/Navbar";
import { useWebVitals } from "@/lib/hooks";
import StyledComponentsRegistry from "@/registry";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/components/CustomTheme";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  children: ReactNode;
  params: { locale: string };
};

async function getMessages(locale: string) {
  try {
    return (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export async function generateStaticParams() {
  return ["en", "pt-BR"].map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: Props) {
  const messages = await getMessages(locale);

  const t = createTranslator({ locale, messages });

  return {
    title: t("LocaleLayout.title"),
  };
}

function onError(error: any) {
  if (error.code === IntlErrorCode.MISSING_MESSAGE) {
    // Missing translations are expected and should only log an error
    // console.error(error);
  } else {
    // console.error("error", error);
    // Other errors indicate a bug in the app and should be reported
    // reportToErrorTracking(error);
  }
}

function getMessageFallback({ namespace, key, error }: any) {
  const path = [namespace, key].filter((part) => part != null).join(".");

  if (error.code === IntlErrorCode.MISSING_MESSAGE) {
    return key;
  } else {
    return `Dear developer, please fix this message: ${path}`;
  }
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  useWebVitals();

  const messages = await getMessages(locale);

  return (
    <html className="h-full" lang={locale}>
      <body className={clsx(inter.className, "flex h-full flex-col")}>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          onError={onError}
          getMessageFallback={getMessageFallback}
        >
          <ContextProvider>
            <StyledComponentsRegistry>
              <ThemeProvider theme={theme}>
                <CssBaseline enableColorScheme />
                <Navbar />
                <Container maxWidth="md" component="main">
                  {children}
                </Container>
              </ThemeProvider>
            </StyledComponentsRegistry>
          </ContextProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
