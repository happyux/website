import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className="relative group overflow-hidden bg-zinc-900 border border-zinc-800/50 hover:shadow-2xl hover:border-zinc-700/50 hover:-translate-y-0.5 transition-all duration-300 rounded-lg"
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className="relative z-10 p-8"
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className="p-6 pt-0" {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// Base card component with consistent styling
const CardContainer = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <Card className={`relative group overflow-hidden bg-[linear-gradient(110deg,#1a1a1a,#0a0a0a_30%,black_50%)] border border-zinc-800/50 hover:shadow-xl transition-all duration-300 ${className || ''}`}>
      <CardHeader className="relative z-10">
        {children}
      </CardHeader>
    </Card>
  );
};

// Icon container component for consistency
const IconContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-4 w-fit rounded-xl bg-black/95 border border-zinc-800/50 mb-6 
            group-hover:scale-105 group-hover:bg-black hover:border-zinc-700/50 
            transition-all duration-300 ease-out">
      {children}
    </div>
  );
};

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }