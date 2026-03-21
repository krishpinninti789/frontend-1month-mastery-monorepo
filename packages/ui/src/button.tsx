"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName?: string;
  onClick?: () => void;
}

export const Button = ({
  children,
  className = "",
  appName,
  onClick,
  variant = "primary",
}: ButtonProps & {
  variant?: "primary" | "outline" | "ghost";
}) => {
  const base =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500 shadow-sm",

    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-400",

    ghost:
      "text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-400",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
