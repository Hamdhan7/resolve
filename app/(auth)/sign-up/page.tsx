"use client";

import AuthSplitLayout from "@/components/auth-split-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  return (
    <AuthSplitLayout
      title="Sign up"
      description="Create your account to get started."
      footerText="Already have an account?"
      footerHref="/sign-in"
      footerLinkLabel="Sign in"
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
            autoComplete="new-password"
            placeholder="Create a password"
          />
        </div>

        <Button type="submit" size="lg" className="w-full rounded-xl">
          Sign up
        </Button>
      </form>
    </AuthSplitLayout>
  );
}
