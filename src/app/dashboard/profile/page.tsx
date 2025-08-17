import { UserProfile } from '@/components/dashboard/UserProfile'; // Assuming this component exists

export default function UserProfilePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Perfil del Usuario</h1>
        <p className="text-gray-600">Visualiza y edita tu perfil</p>
      </div>

      {/* Placeholder for UserProfile component - replace with actual implementation */}
      {/* <UserProfile /> */}
       <div className="border rounded-lg p-4"><h3 className="text-xl font-bold mb-4">User Profile</h3><p>User profile component goes here</p></div>
    </div>
  );
}
