import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

import ThemeToggler from "@/components/theme-toggler";

type NavbarProps = {
  rightContent?: ReactNode;
};

export default function Navbar({ rightContent }: NavbarProps) {
  const defaultRightContent = <></>;

  return (
    <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="flex shrink-0 items-center py-0.5">
          <Image
            src="/brand/onehelp-logo-navbar.png"
            alt="OneHelp"
            width={200}
            height={48}
            className="h-8 w-auto sm:h-9"
            priority
          />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggler className="hidden sm:inline-flex hover:bg-[#122841] hover:text-white" />
          {rightContent ?? defaultRightContent}
        </div>
      </div>
    </nav>
  );
}
