import { useState } from "react"
import StatCard from "../../components/historique/StatCard"
import ReservationsChart from "../../components/historique/ReservationsChart"
import ReservationsPieChart from "../../components/historique/ReservationsPieChart"
import ReservationsBarChart from "../../components/historique/ReservationsBarChart"

const periodes = ["Aujourd'hui", "Cette semaine", "Ce mois", "Cette année"]

const statsParPeriode: Record<string, { reservations: number; montant: string; hotels: number; nuits: number }> = {
  "Aujourd'hui": { reservations: 2, montant: "850 €", hotels: 1, nuits: 3 },
  "Cette semaine": { reservations: 8, montant: "2 100 €", hotels: 3, nuits: 12 },
  "Ce mois": { reservations: 15, montant: "5 400 €", hotels: 6, nuits: 28 },
  "Cette année": { reservations: 24, montant: "3 200 €", hotels: 8, nuits: 42 },
}

const StatsPage = () => {
  const [periode, setPeriode] = useState("Cette année")
  const [showMenu, setShowMenu] = useState(false)
  const stats = statsParPeriode[periode]

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Vue générale</h2>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-sm text-gray-500 border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50"
          >
            {periode} ▾
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-1 bg-white border border-gray-100 rounded-lg shadow-md z-10 w-40">
              {periodes.map((p) => (
                <button
                  key={p}
                  onClick={() => { setPeriode(p); setShowMenu(false) }}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                    periode === p ? "text-blue-600 font-medium" : "text-gray-600"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 4 cartes métriques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total réservations" value={stats.reservations} icon="🏨" color="bg-blue-50" trend="+11%" />
        <StatCard title="Montant" value={stats.montant} icon="💰" color="bg-green-50" trend="-0.03%" />
        <StatCard title="Hôtels visités" value={stats.hotels} icon="📍" color="bg-purple-50" trend="+15%" />
        <StatCard title="Nuits réservées" value={stats.nuits} icon="🌙" color="bg-amber-50" trend="+6%" />
      </div>

      {/* Graphique linéaire */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Réservations totales</span>
            <span className="text-sm text-gray-400">Par mois</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <span className="w-3 h-0.5 bg-blue-500 inline-block"></span> Cette année
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-0.5 bg-gray-300 inline-block"></span> Année dernière
            </span>
          </div>
        </div>
        <ReservationsChart />
      </div>

      {/* 2 graphiques en bas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Réservations par type de chambre</h3>
          <ReservationsBarChart />
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Statut des réservations</h3>
          <ReservationsPieChart />
        </div>
      </div>

    </div>
  )
}

export default StatsPage