"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export const RouteScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
};
