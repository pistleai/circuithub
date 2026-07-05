import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "amber" | "blue" | "slate";
}

export function Badge({ className = "", variant = "default", ...props }: BadgeProps) {
  const baseStyle = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2";
  
  const variantStyles = {
    default: "border-transparent bg-slate-900 text-slate-50 hover:bg-slate-900/80",
    secondary: "border-transparent bg-slate-100 text-slate-950 hover:bg-slate-100/80",
    destructive: "border-transparent bg-red-500 text-slate-50 hover:bg-red-500/80",
    outline: "border-slate-200 text-slate-950 hover:bg-slate-50",
    amber: "border-amber-500/30 bg-amber-500/10 text-amber-700 hover:bg-amber-500/20",
    blue: "border-blue-500/30 bg-blue-500/10 text-blue-700 hover:bg-blue-500/20",
    slate: "border-slate-300 bg-slate-100 text-slate-600 hover:bg-slate-200"
  };

  return (
    <div
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
      {...props}
    />
  );
}
