"use client";

import * as React from "react"
import { cn } from "@/lib/utils"
import { ShineBorder } from "@/components/magicui/shine-border"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  shineColor?: string | string[]
  borderWidth?: number
  duration?: number
  disableShine?: boolean
}

export function GlassCard({
  className,
  children,
  shineColor = ["rgb(var(--color-primary))", "rgb(var(--color-accent))"],
  borderWidth = 1,
  duration = 14,
  disableShine = false,
  ...props
}: GlassCardProps) {
  return (
    <div className={cn("glass-card overflow-hidden", className)} {...props}>
      {!disableShine && (
        <ShineBorder shineColor={shineColor} borderWidth={borderWidth} duration={duration} />
      )}
      {/* Wrapper to ensure content sits above the absolute shine border */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  )
}
