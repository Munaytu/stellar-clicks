"use client";

import { Button } from "@/components/ui/button";

interface ClickButtonProps {
  onClick: () => void;
}

export function ClickButton({ onClick }: ClickButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="group rounded-full shadow-lg w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center transition-all duration-200 ease-in-out active:scale-90 focus:outline-none focus:ring-4 focus:ring-primary/50 text-2xl font-bold bg-primary/10 hover:bg-primary/20 border-2 border-primary/30 text-primary-foreground hover:shadow-primary/20 hover:shadow-2xl"
      aria-label="Click to generate energy"
      size="lg"
    >
      Generar Flujo
    </Button>
  );
}
