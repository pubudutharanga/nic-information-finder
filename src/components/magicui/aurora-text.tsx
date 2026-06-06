"use client"

import React, { memo } from "react"

interface AuroraTextProps {
  children: React.ReactNode
  className?: string
  colors?: string[]
  speed?: number
}

export const AuroraText = memo(
  ({
    children,
    className = "",
    colors = ["#FF0080", "#7928CA", "#0070F3", "#38bdf8"],
    speed = 1,
  }: AuroraTextProps) => {
    const gradientStyle: React.CSSProperties = {
      backgroundImage: `linear-gradient(135deg, ${colors.join(", ")}, ${colors[0]})`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      color: "transparent",
      backgroundSize: "200% auto",
      animationName: "aurora",
      animationTimingFunction: "linear",
      animationIterationCount: "infinite",
      animationDuration: `${10 / speed}s`,
    }

    return (
      <span
        className={`inline-block ${className}`}
        style={gradientStyle}
      >
        {children}
      </span>
    )
  }
)

AuroraText.displayName = "AuroraText"
