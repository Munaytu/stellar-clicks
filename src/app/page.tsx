"use client";

import { ClickButton } from "@/components/game/ClickButton";
import { EnergyCounter } from "@/components/game/EnergyCounter";
import { ClaimPanel } from "@/components/game/ClaimPanel";
import { GlobalStats } from "@/components/game/GlobalStats";
import { useGameState } from "@/hooks/useGameState";

export default function Home() {
  const { userEnergy, globalEnergy, handleFlowClick } = useGameState();

  return (
    <div className="flex-grow container mx-auto p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center gap-8">
      <div className="relative flex flex-col items-center justify-center w-full max-w-md my-8 text-center">
        <EnergyCounter energy={userEnergy} />
        <ClickButton onClick={handleFlowClick} />
      </div>

      <div className="grid grid-cols-1 gap-6 w-full max-w-2xl">
        <GlobalStats globalEnergy={globalEnergy} />
        <ClaimPanel userEnergy={userEnergy} />
      </div>
    </div>
  );
}
