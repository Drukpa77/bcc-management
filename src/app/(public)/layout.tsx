import type { ReactNode } from "react";
import { PublicFooter } from "@/components/public/public-footer";
import { PublicNav } from "@/components/public/public-nav";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PublicNav />
      <main className="flex flex-1 flex-col bg-paper">{children}</main>
      <PublicFooter />
    </>
  );
}
