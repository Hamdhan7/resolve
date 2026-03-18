"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type SelectNativeProps = React.ComponentProps<"select"> & {
  placeholder?: string;
};

export function SelectNative({
  className,
  children,
  placeholder,
  ...props
}: SelectNativeProps) {
  return (
    <select
      data-slot="select-native"
      className={cn(
        "flex h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow]",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/30",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {placeholder ? (
        <option value="" disabled>
          {placeholder}
        </option>
      ) : null}
      {children}
    </select>
  );
}

