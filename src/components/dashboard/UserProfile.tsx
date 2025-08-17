// import { useAuth } from '@/hooks/useAuth'; // Assuming you have an auth hook
// import { useUserStats } from '@/hooks/useUserStats'; // Assuming you have a user stats hook
import { Card } from '@/components/ui/card'; // Assuming you have a Card component
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Assuming you have avatar components
import { Badge } from '@/components/ui/badge'; // Assuming you have a Badge component

// Placeholder for useAuth hook
const useAuth = () => ({
    user: { id: 'user-123', username: 'TestUser', wallet_address: '0x123...', country_code: 'US' },
    isLoading: false,
});

// Placeholder for useUserStats hook
const useUserStats = () => ({
    userStats: { joinDate: new Date(), totalClicks: 10000, globalRank: 50, countryRank: 5, lastActive: new Date() }, // Added lastActive
    isLoading: false,
});

// Placeholder for formatNumber utility
const formatNumber = (num: number): string => {
  // Implement number formatting logic
  return num.toLocaleString();
};

// Placeholder for getCountryFlag utility
const getCountryFlag = (countryCode?: string | null): string => {
  if (!countryCode || countryCode === 'XX') return '❓';
  // Implement logic to get country flag emoji
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127359 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};


export const UserProfile = () => {
  const { user, isLoading: isLoadingAuth } = useAuth();
  const { userStats, isLoading: isLoadingStats } = useUserStats();

  const isLoading = isLoadingAuth || isLoadingStats;

  if (isLoading) {
    return <Card className="p-6">Cargando perfil...</Card>;
  }

  if (!user) {
    return <Card className="p-6">Inicia sesión para ver tu perfil.</Card>;
  }

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-6 mb-6">
        <Avatar className="w-20 h-20">
          <AvatarImage src={(user as any).avatar_url || undefined} alt={`${user.username}'s avatar`} /> {/* Assuming avatar_url exists on user object, added as any for now */}
          <AvatarFallback>{user.username?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-2xl font-bold">{user.username || 'Usuario Anónimo'}</h3>
          <p className="text-gray-600 text-sm">{user.wallet_address}</p>
          <Badge variant="secondary" className="mt-1">
            {getCountryFlag(user.country_code)} {user.country_code}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-600">Fecha de registro:</p>
          <p className="font-semibold">{userStats?.joinDate ? new Date(userStats.joinDate).toLocaleDateString() : 'N/A'}</p> {/* Use optional chaining */}
        </div>
         <div>
          <p className="text-gray-600">Última actividad:</p>
          <p className="font-semibold">{userStats?.lastActive ? new Date(userStats.lastActive).toLocaleString() : 'N/A'}</p> {/* Use optional chaining */}
        </div>
        <div>
          <p className="text-gray-600">Total Clicks:</p>
          <p className="font-semibold">{formatNumber(userStats?.totalClicks || 0)}</p> {/* Use optional chaining and default value */}
        </div>
        <div>
          <p className="text-gray-600">Ranking Global:</p>
          <p className="font-semibold">#{userStats?.globalRank || 'N/A'}</p> {/* Use optional chaining */}
        </div>
        <div>
          <p className="text-gray-600">Ranking País:</p>
          <p className="font-semibold">#{userStats?.countryRank || 'N/A'}</p> {/* Use optional chaining */}
        </div>
      </div>
    </Card>
  );
};