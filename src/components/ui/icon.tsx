
import React from "react";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  color?: string;
  size?: number;
  strokeWidth?: number;
  fallback?: string;
}

const Icon = ({
  name,
  color,
  size = 24,
  strokeWidth = 2,
  className,
  fallback = "CircleAlert",
  ...props
}: IconProps) => {
  const LucideIcon = (Icons as any)[name] || (Icons as any)[fallback];

  if (!LucideIcon) {
    return <div className={cn("icon-fallback", className)} {...props} />;
  }

  return (
    <LucideIcon
      color={color}
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      {...props}
    />
  );
};

export default Icon;
