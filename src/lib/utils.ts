import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Minimal placeholder for WithElementRef to satisfy TS
export type WithElementRef<T> = T & { ref?: any };
export type WithoutChildrenOrChild<T> = Omit<T, "children" | "child">;
