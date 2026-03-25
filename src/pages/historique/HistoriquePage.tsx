import { useState } from "react"
import ReservationCard from "../../components/historique/ReservationCard"

const reservations = [
  {
    id: 1,
    hotel: "Plaza Athénée",
    ville: "Paris, France",
    chambre: "Suite Présidentielle",
    dateArrivee: "15/12/2024",
    dateDepart: "20/12/2024",
    montant: 4250,
    statut: "Terminé" as const,
    note: 5,
  },
  {
    id: 2,
    hotel: "Le Ritz Londres",
    ville: "Londres, Royaume-Uni",
    chambre: "Suite de luxe",
    dateArrivee: "10/11/2024",
    dateDepart: "15/11/2024",
    montant: 3850,
    statut: "Terminé" as const,
    note: 5,
  },
  {
    id: 3,
    hotel: "Burj Al Arab",
    ville: "Dubaï, Émirats arabes unis",
    chambre: "Suite royale",
    dateArrivee: "05/10/2024",
    dateDepart: "10/10/2024",
    montant: 8900,
    statut: "Terminé" as const,
    note: 5,
  },
  {
    id: 4,
    hotel: "Quatre Saisons",
    ville: "Bora Bora",
    chambre: "Bungalow sur pilotis",
    dateArrivee: "20/09/2024",
    dateDepart: "25/09/2024",
    montant: 5600,
    statut: "Terminé" as const,
    note: 4,
  },
  {
    id: 5,
    hotel: "Le Savoy",
    ville: "Londres, Royaume-Uni",
    chambre: "Chambre supérieure",
    dateArrivee: "15/08/2024",
    dateDepart: "18/08/2024",
    montant: 2100,
    statut: "Annulé" as const,
  },
]

const HistoriquePage = () => {
  const [search, setSearch] = useState("")

  const filtered = reservations.filter(r =>
    r.hotel.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Historique des réservations
        </h2>
        <input
          type="text"
          placeholder="Rechercher un hôtel..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-200 rounded-lg px-4 py-2 text-sm w-64 focus:outline-none focus:border-blue-300"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-400 text-sm text-center mt-10">
          Aucune réservation trouvée pour "{search}"
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((r) => (
            <ReservationCard key={r.id} {...r} />
          ))}
        </div>
      )}
    </div>
  )
}

export default HistoriquePage