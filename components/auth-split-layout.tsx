import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

type AuthSplitLayoutProps = {
  title: string;
  description: string;
  footerText: string;
  footerHref: string;
  footerLinkLabel: string;
  children: ReactNode;
};

export default function AuthSplitLayout({
  title,
  description,
  footerText,
  footerHref,
  footerLinkLabel,
  children,
}: AuthSplitLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto grid min-h-screen w-full max-w-7xl lg:grid-cols-2">
        <section className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-16">
          <div className="w-full max-w-md space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>

            {children}

            <p className="text-center text-sm text-muted-foreground">
              {footerText}{" "}
              <Link
                href={footerHref}
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                {footerLinkLabel}
              </Link>
            </p>
          </div>
        </section>

        <section className="relative hidden lg:block">
          <Image
            src="/brand/logo-mark.svg"
            alt="OneHelp"
            fill
            priority
            className="object-contain p-20"
          />
          <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-accent/30" />
        </section>
      </div>
    </div>
  );
}
