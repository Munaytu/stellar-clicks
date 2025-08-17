import Link from 'next/link';

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-6 space-y-6">
      <div className="text-2xl font-bold">Dashboard</div>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link href="/dashboard" className="block hover:text-gray-300">
              Resumen
            </Link>
          </li>
          <li>
            <Link href="/dashboard/profile" className="block hover:text-gray-300">
              Perfil
            </Link>
          </li>
          <li>
            <Link href="/dashboard/rankings" className="block hover:text-gray-300">
              Rankings Globales
            </Link>
          </li>
          <li>
            <Link href="/dashboard/countries" className="block hover:text-gray-300">
              Rankings por País
            </Link>
          </li>
          {/* Add more navigation links as needed */}
        </ul>
      </nav>
    </aside>
  );
};