"use client";

import { usePathname } from "next/navigation";
import { Header } from "./header";

const excludePaths = ["/login", "/signUp", "/forgotPassword"];

export function ConditionalHeader() {
  const pathname = usePathname();
  const shouldShowHeader = !excludePaths.includes(pathname);

  return shouldShowHeader ? <Header /> : null;
}
