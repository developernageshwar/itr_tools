import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// tailwind Merge  
export const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};

// General helper functions
export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const truncateString = (str, num) => {
  if (str.length <= num) return str;
  return str.slice(0, num) + '...';
};
