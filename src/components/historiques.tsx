import { useState } from 'react';

interface Reservation {
  id: string;
  guest: string;
  room: string;
  checkIn: string;
  checkOut: string;
  status: string;
  amount: number;
  avatar: string;
}

interface HistoriqueProps {
  reservations: Reservation[];
}

const statusConfig = {
  "Terminée": { bg: "bg-gray-100", text: "text-gray-600", dot: "bg-gray-400" },
};

const avatarColors = [
  "bg-purple-100 text-purple-700",
  "bg-teal-100 text-teal-700",
  "bg-rose-100 text-rose-700",
  "bg-amber-100 text-amber-700",
];

export default function Historique({ reservations }: HistoriqueProps) {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filtrer uniquement les réservations terminées
  const historiqueReservations = reservations.filter(r => r.status === "Terminée");
  
  // Filtrer par recherche
  const filtered = historiqueReservations.filter(r => 
    r.guest.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculer le total
  const totalRevenu = historiqueReservations.reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Historique des réservations</h2>
          <p className="text-sm text-gray-500 mt-1">
            {historiqueReservations.length} réservations terminées
          </p>
        </div>
        <div className="bg-white rounded-xl px-4 py-2 border">
          <p className="text-xs text-gray-500">Revenu total</p>
          <p className="text-lg font-bold text-amber-600">{totalRevenu.toLocaleString()} FCFA</p>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="relative">
        <input
          type="text"
          placeholder="Rechercher par nom ou ID..."
          className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg
          className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Tableau de l'historique */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase">Client</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-400 uppercase">Chambre</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-400 uppercase">Arrivée</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-400 uppercase">Départ</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-400 uppercase">Montant</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-400 uppercase">Statut</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((res, i) => (
                <tr key={res.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${avatarColors[i % avatarColors.length]}`}>
                        {res.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{res.guest}</p>
                        <p className="text-xs text-gray-400">{res.id}</p>
                      </div>
                    </div>
                   </td>
                  <td className="px-4 py-3.5 text-gray-600">{res.room}</td>
                  <td className="px-4 py-3.5 text-gray-600">{res.checkIn}</td>
                  <td className="px-4 py-3.5 text-gray-600">{res.checkOut}</td>
                  <td className="px-4 py-3.5 font-semibold text-gray-800">{res.amount.toLocaleString()} F</td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig["Terminée"].bg} ${statusConfig["Terminée"].text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusConfig["Terminée"].dot}`}></span>
                      Terminée
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400 text-sm">
              Aucune réservation terminée trouvée
            </div>
          )}
        </div>
      </div>
    </div>
  );
}