"use client";

interface EnergyCounterProps {
  energy: number;
}

export function EnergyCounter({ energy }: EnergyCounterProps) {
  return (
    <div className="text-center mb-4">
      <h2 className="text-7xl md:text-8xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-br from-primary to-accent">
        {Math.floor(energy).toLocaleString()}
      </h2>
      <p className="text-muted-foreground font-code mt-2">Energía Acumulada</p>
    </div>
  );
}
