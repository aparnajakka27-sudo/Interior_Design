import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'neutral'
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
        {
          'border-transparent bg-accent text-[#111111]': variant === 'default',
          'border-transparent bg-emerald-900/40 text-emerald-400': variant === 'success',
          'border-transparent bg-amber-900/40 text-amber-400': variant === 'warning',
          'border-transparent bg-red-900/40 text-red-400': variant === 'danger',
          'border-border bg-elevated text-secondary': variant === 'neutral',
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
