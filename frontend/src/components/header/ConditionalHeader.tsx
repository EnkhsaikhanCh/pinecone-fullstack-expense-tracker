"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";

const excludePaths = ["/login", "/signUp", "/forgotPassword"];

export function ConditionalHeader() {
  const pathname = usePathname();
  const showHeader = !excludePaths.includes(pathname);

  return showHeader ? <Header /> : null;
}
