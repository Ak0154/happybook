"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";

export interface ThemeTogglerButtonProps {
  variant?: "outline" | "ghost" | "solid";
  size?: "sm" | "md" | "lg";
  direction?: "left" | "right" | "ttb" | "btt";
  modes?: ("light" | "dark" | "system")[];
}

export function ThemeTogglerButton({ variant = "outline", size = "md", direction = "ttb", modes = ['light', 'dark', 'system'] }: ThemeTogglerButtonProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    if (!document.startViewTransition) {
        if (theme === "dark") setTheme("light");
        else if (theme === "light" && modes.includes("system")) setTheme("system");
        else setTheme("dark");
        return;
    }

    const activeDirection = nextTheme === "dark" ? "ttb" : "btt";
    document.documentElement.classList.add(`theme-transition-${activeDirection}`);

    document.startViewTransition(() => {
        if (theme === "dark") setTheme("light");
        else if (theme === "light" && modes.includes("system")) setTheme("system");
        else setTheme("dark");
    }).finished.finally(() => {
        document.documentElement.classList.remove(`theme-transition-${activeDirection}`);
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 bg-surface border border-border rounded-xl text-foreground hover:bg-surface/80 transition-all flex items-center justify-center relative overflow-hidden shadow-sm shadow-black/5 dark:shadow-white/5 active:scale-95 ${size === "sm" ? "h-8 w-8" : size === "lg" ? "h-12 w-12" : "h-10 w-10"}`}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] transition-transform duration-500 ease-in-out absolute translate-y-0 dark:translate-y-[200%]" />
      <Moon className="h-[1.2rem] w-[1.2rem] transition-transform duration-500 ease-in-out absolute -translate-y-[200%] dark:translate-y-0" />
    </button>
  );
}
