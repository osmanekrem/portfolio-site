import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {format, subDays} from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDate(sub: number = 0) {
  const dateXdaysAgo = subDays(new Date(), sub);

  return format((dateXdaysAgo), 'yyyy-MM-dd');
}
