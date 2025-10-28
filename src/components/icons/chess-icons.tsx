import { cn } from "@/lib/utils";
import React from "react";

type IconProps = {
  className?: string;
};

// Traditional chess piece SVG icons

export const King = ({ className }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" className={cn("fill-current", className)}>
    <path d="M22.5 11.63V6h-3.38v5.63h-3L15 13.75v3.38h-2.25V21h19.5v-3.88H30V13.75l-1.13-2.12h-3V6h-3.38v5.63Z" strokeMiterlimit="10" strokeWidth="1.5" stroke="currentColor" fill="none" />
    <path d="M22.5 25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
    <path d="M12.75 39h19.5V22.5H12.75Zm1.5-15h16.5v13.5H14.25Z" strokeMiterlimit="10" strokeWidth="1.5" stroke="currentColor" fill="none" />
  </svg>
);

export const Queen = ({ className }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" className={cn("fill-current", className)}>
    <path d="M13 11.25 11.25 15v4.5h22.5V15L32 11.25 30.75 13.5 28.5 12l-1.5 3-2.25-3-2.25 3-2.25-3-2.25 3-1.5-3L14.25 13.5Z" strokeMiterlimit="10" strokeWidth="1.5" stroke="currentColor" fill="none" />
    <path d="M12 21h21v2.25H12Z" strokeMiterlimit="10" strokeWidth="1.5" stroke="currentColor" fill="none" />
    <path d="M13.5 39h18V24.75h-18Z" strokeMiterlimit="10" strokeWidth="1.5" stroke="currentColor" fill="none" />
    <circle cx="12" cy="12" r="1.5" />
    <circle cx="18" cy="10" r="1.5" />
    <circle cx="22.5" cy="12" r="1.5" />
    <circle cx="27" cy="10" r="1.5" />
    <circle cx="33" cy="12" r="1.5" />
  </svg>
);

export const Rook = ({ className }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" className={cn("fill-current", className)}>
    <path d="M15 6h15v6H15Z" strokeMiterlimit="10" strokeWidth="1.5" stroke="currentColor" fill="none" />
    <path d="M17.25 13.5h10.5v10.5H17.25Z" strokeMiterlimit="10" strokeWidth="1.5" stroke="currentColor" fill="none" />
    <path d="M14.25 39h16.5V25.5H14.25Z" strokeMiterlimit="10" strokeWidth="1.5" stroke="currentColor" fill="none" />
  </svg>
);

export const Bishop = ({ className }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" className={cn("fill-current", className)}>
    <path d="M22.5 6 19.5 9l-1.5 1.5v3h9v-3l-1.5-1.5Z" strokeMiterlimit="10" strokeWidth="1.5" stroke="currentColor" fill="none" />
    <path d="M22.5 15.75a3 3 0 1 1-3-3 3 3 0 0 1 3 3Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M15 20.25h15v3H15Z" strokeMiterlimit="10" strokeWidth="1.5" stroke="currentColor" fill="none" />
    <path d="M15 39h15V24.75H15Z" strokeMiterlimit="10" strokeWidth="1.5" stroke="currentColor" fill="none" />
  </svg>
);

export const Knight = ({ className }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" className={cn("fill-current", className)}>
    <path d="M18.75 6 15 15.75 17.25 21 15 22.5v7.5h6V24l-3-1.5 1.5-3 6 1.5 1.5-3 1.5 2.25 1.5-3 3 2.25 1.5 9H36V22.5l-2.25-2.25 3-6.75-6-4.5-3 3.75-3-3.75Z" strokeMiterlimit="10" strokeWidth="1.5" stroke="currentColor" fill="none" />
    <path d="M12.75 39h19.5V31.5H12.75Z" strokeMiterlimit="10" strokeWidth="1.5" stroke="currentColor" fill="none" />
  </svg>
);

export const Pawn = ({ className }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" className={cn("fill-current", className)}>
    <path d="M22.5 9.75A3.75 3.75 0 1 1 18.75 13.5a3.75 3.75 0 0 1 3.75-3.75Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M18 18.75h9v6.75h-9Z" strokeMiterlimit="10" strokeWidth="1.5" stroke="currentColor" fill="none" />
    <path d="M15 39h15V27H15Z" strokeMiterlimit="10" strokeWidth="1.5" stroke="currentColor" fill="none" />
  </svg>
);
