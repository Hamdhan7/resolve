import Link from "next/link";
import { Headphones } from "lucide-react";

import ThemeToggler from "@/components/theme-toggler";
import { Button } from "@/components/ui/button";

export default function Navbar() {
	return (
		<nav className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur">
			<div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
				<div className="flex items-center gap-3">
					<div className="flex size-10 items-center justify-center rounded-2xl bg-primary/15 text-primary">
						<Headphones className="size-5" />
					</div>
					<div>
						<p className="text-lg font-extrabold tracking-tight">OneHelp</p>
						<p className="text-xs text-muted-foreground">AI complaint management</p>
					</div>
				</div>

				<div className="flex items-center gap-2 sm:gap-3">
					<ThemeToggler className="hidden sm:inline-flex" />
					<Button asChild variant="ghost" className="rounded-xl">
						<Link href="/sign-in">Log in</Link>
					</Button>
					<Button asChild className="rounded-xl px-5">
						<Link href="/sign-up">Sign up</Link>
					</Button>
				</div>
			</div>
		</nav>
	);
}
