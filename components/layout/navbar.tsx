import Link from "next/link";
import { ReactNode } from "react";



type NavbarProps = {
  rightContent?: ReactNode;
};

export default function Navbar({ rightContent }: NavbarProps) {
  const defaultRightContent = <></>;

  return (
    <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="flex shrink-0 items-center py-0.5">
          <span className="text-2xl font-extrabold tracking-tighter text-foreground">
            Resolv<span className="text-primary">.lk</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">

          {rightContent ?? defaultRightContent}
        </div>
      </div>
    </nav>
  );
}
