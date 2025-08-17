"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut, Wallet } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function WalletConnect() {
  const { address, isConnected, connect, disconnect } = useAuth();
  const injectedConnector = connect.connectors.find(c => c.id === 'injected');

  if (isConnected && address) {
    const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Avatar className="w-6 h-6 mr-2">
              <AvatarImage src={`https://effigy.im/a/${address}.svg`} />
              <AvatarFallback>{address.slice(0, 2)}</AvatarFallback>
            </Avatar>
            {shortAddress}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Mi Wallet</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => disconnect()}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Desconectar</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button 
        onClick={() => injectedConnector && connect.connect({ connector: injectedConnector })}
        disabled={!injectedConnector}
    >
      <Wallet className="mr-2 h-4 w-4" />
      Conectar Wallet
    </Button>
  );
}
