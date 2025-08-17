"use client";

import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useGameState = () => {
  const [userEnergy, setUserEnergy] = useLocalStorage('sonic-flow-clicks', 0);
  const [globalEnergy, setGlobalEnergy] = useState(123456789);

  const handleFlowClick = useCallback(() => {
    setUserEnergy((prev: number) => prev + 1);
    setGlobalEnergy((prev: number) => prev + 1);
  }, [setUserEnergy]);

  useEffect(() => {
    const globalEnergyGenerator = setInterval(() => {
      setGlobalEnergy(prev => prev + Math.floor(Math.random() * 10) + 5);
    }, 1000);

    return () => {
      clearInterval(globalEnergyGenerator);
    };
  }, []);

  return { userEnergy, globalEnergy, handleFlowClick };
};
