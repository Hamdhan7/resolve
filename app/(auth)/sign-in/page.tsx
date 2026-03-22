"use client";

import AuthSplitLayout from "@/components/auth-split-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();

  return (
    <AuthSplitLayout
      title="Sign in"
      description="Welcome back. Enter your details to continue."
      footerText="Don't have an account?"
      footerHref="/sign-up"
      footerLinkLabel="Sign up"
    >
      <form 
        className="space-y-5" 
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/customer");
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
          />
        </div>

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" size="lg" className="w-full rounded-xl">
          Sign in
        </Button>
      </form>
    </AuthSplitLayout>
  );
}
