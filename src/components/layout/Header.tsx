"use client";

import { Waves } from "lucide-react";
import { WalletConnect } from "@/components/wallet/WalletConnect";

export function Header() {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/80 backdrop-blur-sm border-b border-primary/20">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center gap-3">
          <Waves className="w-8 h-8 text-primary" />
          <h1 className="font-headline text-2xl md:text-3xl font-bold">Sonic Flow</h1>
        </div>
        <WalletConnect />
      </div>
    </header>
  );
}
