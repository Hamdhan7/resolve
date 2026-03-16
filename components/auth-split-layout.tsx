import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="mx-auto grid min-h-screen w-full max-w-7xl lg:grid-cols-2">
        <section className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-16">
          <Card className="w-full max-w-md border-border/70 bg-card/95 backdrop-blur">
            <CardHeader className="space-y-2 pb-6">
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>

            <CardContent>{children}</CardContent>

            <CardFooter>
              <p className="w-full text-center text-sm text-muted-foreground">
                {footerText}{" "}
                <Link
                  href={footerHref}
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  {footerLinkLabel}
                </Link>
              </p>
            </CardFooter>
          </Card>
        </section>

        <section className="relative hidden overflow-hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-accent/10 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(107,214,233,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(167,139,250,0.22),transparent_28%)]" />
          <div className="relative flex h-full items-center justify-center p-16">
            <div className="absolute inset-10 rounded-[2rem] border border-border/40 bg-background/40 backdrop-blur-sm" />
            <div className="relative z-10 flex max-w-md flex-col items-center text-center">
              <div className="mb-8 rounded-3xl border border-border/60 bg-background/90 p-10 shadow-2xl shadow-primary/10">
                <Image
                  src="/brand/logo-mark.svg"
                  alt="OneHelp"
                  width={220}
                  height={220}
                  priority
                  className="h-auto w-40"
                />
              </div>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                OneHelp support starts here
              </h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                Access your account, manage requests, and stay connected with a clean,
                modern experience.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
