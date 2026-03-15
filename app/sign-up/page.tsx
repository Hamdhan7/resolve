import AuthSplitLayout from "@/components/auth-split-layout";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  return (
    <AuthSplitLayout
      title="Sign up"
      description="Create your account to get started."
      footerText="Already have an account?"
      footerHref="/sign-in"
      footerLinkLabel="Sign in"
    >
      <form className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="Create a password"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
          />
        </div>

        <Button type="submit" className="w-full">
          Sign up
        </Button>
      </form>
    </AuthSplitLayout>
  );
}
