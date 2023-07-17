import { usePathname } from "next-intl/client";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function useSearchParamsOrigin() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const originParams = React.useMemo(
    () => searchParams.get("origin") ?? "/",
    [searchParams]
  );

  const origin = React.useMemo(
    () => (/login|logout/gm.test(pathname) ? originParams : pathname),
    [originParams, pathname]
  );

  return origin;
}
