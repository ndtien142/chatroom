import * as React from "react";

interface CenteredContainerProps {
  maxWidth?: string;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
}

export function CenteredContainer({
  maxWidth = "max-w-md",
  className = "",
  innerClassName = "",
  children,
}: CenteredContainerProps) {
  return (
    <div
      className={`flex min-h-screen w-full items-center justify-center bg-background ${className}`}
    >
      <div
        className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${maxWidth} ${innerClassName}`}
      >
        {children}
      </div>
    </div>
  );
}
