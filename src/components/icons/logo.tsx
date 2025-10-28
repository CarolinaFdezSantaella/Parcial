import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("text-primary", className)}
  >
    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z" />
    <path d="M15.5 8.5a2.5 2.5 0 1 0-2.5 2.5V15" />
    <path d="M10 16.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
    <path d="M10 16.5h.5" />
    <path d="M15 16h-2.5" />
    <path d="M8.5 12V9" />
    <path d="M8.5 12a2.5 2.5 0 1 1 2.5 2.5" />
  </svg>
);
