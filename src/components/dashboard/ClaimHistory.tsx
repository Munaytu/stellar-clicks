import { Card } from '@/components/ui/card'; // Assuming you have a Card component
// import { useUserStats } from '@/hooks/useUserStats'; // Assuming you have a user stats hook

export const ClaimHistory = () => {
  // const { claimHistory } = useUserStats(); // Assuming claim history is part of user stats or a separate hook
  const claimHistory = [ // Placeholder data
    { id: 1, amount: 100, date: '2023-10-26', status: 'completed' },
    { id: 2, amount: 150, date: '2023-10-20', status: 'completed' },
    { id: 3, amount: 50, date: '2023-10-15', status: 'pending' },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-4">📜 Historial de Reclamos</h3>
      <div className="space-y-4">
        {claimHistory.map(claim => (
          <div key={claim.id} className="flex justify-between items-center border-b pb-2">
            <div>
              <p className="font-semibold">{claim.amount} $FLOW</p>
              <p className="text-sm text-gray-500">{claim.date}</p>
            </div>
            <span className={
              `px-2 py-1 rounded-full text-xs font-semibold ${claim.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`
            }>
              {claim.status}
            </span>
          </div>
        ))}
      </div>
       {claimHistory.length === 0 && (
          <p className="text-center text-gray-500">No hay historial de reclamos.</p>
       )}
    </Card>
  );
};