import Link from "next/link";

export default function Footer() {
	return (
		<footer className="bg-slate-900 py-7 text-slate-300 dark:bg-slate-950">
			<div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-10">
				<span>© 2077 OneHelp. All rights reserved.</span>
				<div className="flex gap-6 text-slate-400">
					<Link href="#" className="transition-colors hover:text-white">
						Terms
					</Link>
					<Link href="#" className="transition-colors hover:text-white">
						Privacy
					</Link>
					<Link href="#" className="transition-colors hover:text-white">
						Cookies
					</Link>
				</div>
			</div>
		</footer>
	);
}
