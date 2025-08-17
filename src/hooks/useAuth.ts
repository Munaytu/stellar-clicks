"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";

export const useAuth = () => {
  const { address, isConnected, status } = useAccount();
  const connect = useConnect();
  const { disconnect } = useDisconnect();

  return {
    address,
    isConnected,
    status,
    connect,
    disconnect,
  };
};
