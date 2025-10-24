"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
