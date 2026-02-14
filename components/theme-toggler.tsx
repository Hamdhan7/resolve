"use client";

import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const THEMES = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
] as const;

type ThemeTogglerProps = {
  className?: string;
};

const ThemeToggler = ({ className }: ThemeTogglerProps) => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle theme"
          className={cn(
            "relative rounded-full transition-colors duration-300",
            "hover:text-secondary-foreground focus-visible:ring-0",
            className,
          )}
        >
          <Sun
            className="h-5 w-5 transition-transform duration-300 
                       rotate-0 scale-100 dark:-rotate-90 dark:scale-0"
          />
          <Moon
            className="absolute h-5 w-5 transition-transform duration-300
                       rotate-90 scale-0 dark:rotate-0 dark:scale-100"
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="rounded-lg">
        {THEMES.map(({ value, label }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => setTheme(value)}
            className="cursor-pointer rounded-sm transition-colors duration-300"
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggler;
