export default function Dashboard() {
  return (
    <div className="min-h-screen flex">

      <div className="w-64 bg-gray-800 text-white p-5">
        <h2 className="text-xl mb-4">Dashboard</h2>

        <ul>
          <li className="mb-2">Réservations</li>
          <li>Historique</li>
        </ul>
      </div>

      <div className="flex-1 p-6">
        <h1 className="text-3xl">Bienvenue 👋</h1>
      </div>

    </div>
  );
}