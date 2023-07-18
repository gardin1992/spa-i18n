"use client";

import { ComponentChildrenProps } from "@/lib/types/ComponentProps";
import { useSelectedLayoutSegment } from "next/navigation";

export default function DashboardLayout({ children }: ComponentChildrenProps) {
  const segment = useSelectedLayoutSegment();

  return (
    <>
      <h1>segment {segment}</h1>
      {children}
    </>
  );
}
