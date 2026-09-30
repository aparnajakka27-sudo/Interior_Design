import * as React from "react"
import { cn } from "@/lib/utils"

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant = 'ghost', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50",
          {
            'bg-accent text-[#111111] hover:bg-accent-hover shadow-sm': variant === 'primary',
            'bg-surface border border-border text-primary hover:bg-elevated': variant === 'secondary',
            'hover:bg-elevated text-secondary hover:text-primary': variant === 'ghost',
            'h-8 w-8': size === 'sm',
            'h-9 w-9': size === 'md',
            'h-10 w-10': size === 'lg',
          },
          className
        )}
        {...props}
      />
    )
  }
)
IconButton.displayName = "IconButton"

export { IconButton }
