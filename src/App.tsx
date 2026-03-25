import { useState } from "react"
import HistoriquePage from "./pages/historique/HistoriquePage"
import StatsPage from "./pages/historique/StatsPage"

const App = () => {
  const [page, setPage] = useState<"historique" | "stats">("stats")

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Sidebar */}
      <div className="w-60 bg-white border-r border-gray-100 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-lg font-bold text-blue-600">🏨 HotelBook</h1>
          <p className="text-xs text-gray-400 mt-1">Dashboard</p>
        </div>
        <nav className="p-4 flex flex-col gap-1">
          <p className="text-xs text-gray-400 uppercase tracking-wider px-3 mb-2">Dashboards</p>
          <button
            onClick={() => setPage("stats")}
            className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-3 transition-colors ${
              page === "stats" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <span>📊</span> Vue générale
          </button>
          <button
            onClick={() => setPage("historique")}
            className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-3 transition-colors ${
              page === "historique" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <span>📋</span> Historique
          </button>
          <p className="text-xs text-gray-400 uppercase tracking-wider px-3 mt-4 mb-2">Pages</p>
          <button className="text-left px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:bg-gray-50 flex items-center gap-3">
            <span>👤</span> Profil
          </button>
          <button className="text-left px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:bg-gray-50 flex items-center gap-3">
            <span>⚙️</span> Paramètres
          </button>
        </nav>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Dashboards</span>
            <span>/</span>
            <span className="text-gray-800 font-medium">
              {page === "stats" ? "Vue générale" : "Historique"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-medium">
              M4
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          {page === "stats" ? <StatsPage /> : <HistoriquePage />}
        </div>
      </div>

    </div>
  )
}

export default App