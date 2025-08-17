import Link from 'next/link';
// import { useWallet } from '@/hooks/useWallet'; // Assuming you have a wallet hook
import { useUserStats } from '@/hooks/useUserStats'; // Assuming you have a user stats hook
// import { WalletConnect } from '@/components/wallet/WalletConnect'; // Assuming you have a WalletConnect component

// Placeholder for useWallet hook and related properties
const useWallet = () => ({
    address: '0x123...', // Dummy address
    isConnected: true,
});

// Placeholder for WalletConnect component
const WalletConnect = () => (
    <button className="bg-blue-500 text-white px-4 py-2 rounded">Connect Wallet</button>
);

export const Navbar = () => {
  const { address, isConnected } = useWallet();
  const { userStats } = useUserStats();

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-xl font-bold">
            Sonic Flow
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
              Dashboard
            </Link>
            <Link href="/dashboard/rankings" className="text-gray-600 hover:text-gray-900">
              Rankings
            </Link>
            <Link href="/dashboard/countries" className="text-gray-600 hover:text-gray-900">
              Países
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {isConnected && userStats && ( // Check if userStats is available
            <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
              <span className="text-sm font-medium">
                {userStats.pendingTokens} $FLOW
              </span>
            </div>
          )}

          <WalletConnect />
        </div>
      </div>
    </nav>
  );
};