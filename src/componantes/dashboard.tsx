import { useState } from "react";

const mockReservations = [
  { id: "RES-001", guest: "Amadou Diallo", room: "Suite Royale 401", checkIn: "2025-03-20", checkOut: "2025-03-25", status: "En cours", amount: 875000, avatar: "AD" },
  { id: "RES-002", guest: "Fatou Ndiaye", room: "Chambre Deluxe 210", checkIn: "2025-03-22", checkOut: "2025-03-24", status: "En cours", amount: 180000, avatar: "FN" },
  { id: "RES-003", guest: "Moussa Traoré", room: "Junior Suite 305", checkIn: "2025-03-18", checkOut: "2025-03-21", status: "Terminée", amount: 315000, avatar: "MT" },
  { id: "RES-004", guest: "Aïssatou Bah", room: "Chambre Standard 108", checkIn: "2025-03-25", checkOut: "2025-03-28", status: "Confirmée", amount: 135000, avatar: "AB" },
  { id: "RES-005", guest: "Ibrahima Sow", room: "Suite Présidentielle 501", checkIn: "2025-03-10", checkOut: "2025-03-15", status: "Terminée", amount: 1250000, avatar: "IS" },
  { id: "RES-006", guest: "Mariama Kouyaté", room: "Chambre Deluxe 215", checkIn: "2025-03-28", checkOut: "2025-04-02", status: "Confirmée", amount: 300000, avatar: "MK" },
];

const statusConfig = {
  "En cours": { bg: "bg-blue-100", text: "text-blue-800", dot: "bg-blue-500" },
  "Terminée": { bg: "bg-gray-100", text: "text-gray-600", dot: "bg-gray-400" },
  "Confirmée": { bg: "bg-emerald-100", text: "text-emerald-800", dot: "bg-emerald-500" },
  "Annulée": { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-400" },
};

const rooms = [
  { name: "Suite Royale 401", type: "Suite", status: "Occupée", floor: 4 },
  { name: "Chambre Deluxe 210", type: "Deluxe", status: "Occupée", floor: 2 },
  { name: "Junior Suite 305", type: "Suite", status: "Libre", floor: 3 },
  { name: "Chambre Standard 108", type: "Standard", status: "Réservée", floor: 1 },
  { name: "Suite Présidentielle 501", type: "Suite", status: "Libre", floor: 5 },
  { name: "Chambre Standard 102", type: "Standard", status: "Libre", floor: 1 },
  { name: "Chambre Deluxe 220", type: "Deluxe", status: "Maintenance", floor: 2 },
  { name: "Junior Suite 310", type: "Suite", status: "Réservée", floor: 3 },
];

const roomStatusConfig = {
  "Occupée": { bg: "bg-blue-100", text: "text-blue-800" },
  "Libre": { bg: "bg-emerald-100", text: "text-emerald-800" },
  "Réservée": { bg: "bg-amber-100", text: "text-amber-800" },
  "Maintenance": { bg: "bg-red-100", text: "text-red-700" },
};

const avatarColors = [
  "bg-purple-100 text-purple-700",
  "bg-teal-100 text-teal-700",
  "bg-rose-100 text-rose-700",
  "bg-amber-100 text-amber-700",
  "bg-blue-100 text-blue-700",
  "bg-emerald-100 text-emerald-700",
];

export default function HotelDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [filterStatus, setFilterStatus] = useState("Tous");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const filtered = filterStatus === "Tous"
    ? mockReservations
    : mockReservations.filter((r) => r.status === filterStatus);

  const totalRevenu = mockReservations.reduce((s, r) => s + r.amount, 0);
  const enCours = mockReservations.filter((r) => r.status === "En cours").length;
  const confirmées = mockReservations.filter((r) => r.status === "Confirmée").length;
  const libres = rooms.filter((r) => r.status === "Libre").length;

  const navItems = [
    { id: "overview", icon: "⊞", label: "Vue d'ensemble" },
    { id: "reservations", icon: "📋", label: "Réservations" },
    { id: "rooms", icon: "🛏", label: "Chambres" },
  ];

  return (
  <div className="flex-1 overflow-y-auto p-6">
    {/* === OVERVIEW === */}
    {activeTab === "overview" && (
      <div className="space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Revenu total", value: `${(totalRevenu / 1000000).toFixed(2)}M FCFA`, sub: "Ce mois", color: "text-amber-600", bg: "bg-amber-50" },
            { label: "Séjours en cours", value: enCours, sub: "Clients présents", color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Confirmées", value: confirmées, sub: "À venir", color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Chambres libres", value: libres, sub: `sur ${rooms.length} chambres`, color: "text-purple-600", bg: "bg-purple-50" },
          ].map((kpi, i) => (
            <div key={i} className={`${kpi.bg} rounded-2xl p-5`}>
              <p className="text-xs text-gray-500 mb-2">{kpi.label}</p>
              <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
              <p className="text-xs text-gray-400 mt-1">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Navigation tabs */}
        <div className="flex gap-2">
          {[
            { id: "overview", label: "Vue d'ensemble" },
            { id: "reservations", label: "Réservations" },
            { id: "rooms", label: "Chambres" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeTab === tab.id ? "bg-amber-400 text-white" : "bg-white text-gray-500 border border-gray-200 hover:border-amber-300"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Recent reservations */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-700">Réservations récentes</p>
            <button onClick={() => setActiveTab("reservations")} className="text-xs text-amber-600 hover:text-amber-700 font-medium">Voir tout →</button>
          </div>
          <div className="divide-y divide-gray-50">
            {mockReservations.slice(0, 4).map((res, i) => (
              <div key={res.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${avatarColors[i % avatarColors.length]}`}>{res.avatar}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{res.guest}</p>
                  <p className="text-xs text-gray-400 truncate">{res.room}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-gray-700">{res.amount.toLocaleString()} F</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusConfig[res.status as keyof typeof statusConfig].bg} ${statusConfig[res.status as keyof typeof statusConfig].text}`}>{res.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Room status */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-sm font-semibold text-gray-700 mb-4">État des chambres</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Occupées", count: rooms.filter(r => r.status === "Occupée").length, color: "bg-blue-400" },
              { label: "Libres", count: rooms.filter(r => r.status === "Libre").length, color: "bg-emerald-400" },
              { label: "Réservées", count: rooms.filter(r => r.status === "Réservée").length, color: "bg-amber-400" },
              { label: "Maintenance", count: rooms.filter(r => r.status === "Maintenance").length, color: "bg-red-300" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                <div className={`w-2.5 h-2.5 rounded-full ${item.color} shrink-0`}></div>
                <div>
                  <p className="text-xl font-bold text-gray-800">{item.count}</p>
                  <p className="text-xs text-gray-400">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}

    {/* === RESERVATIONS === */}
    {activeTab === "reservations" && (
      <div className="space-y-5">
        <div className="flex gap-2 flex-wrap">
          {["Tous", "En cours", "Confirmée", "Terminée", "Annulée"].map((f) => (
            <button
              key={f}
              onClick={() => setFilterStatus(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filterStatus === f ? "bg-amber-400 text-white" : "bg-white text-gray-500 border border-gray-200"}`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
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
                <tr key={res.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${avatarColors[i % avatarColors.length]}`}>{res.avatar}</div>
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
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[res.status as keyof typeof statusConfig].bg} ${statusConfig[res.status as keyof typeof statusConfig].text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[res.status as keyof typeof statusConfig].dot}`}></span>
                      {res.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}

    {/* === ROOMS === */}
    {activeTab === "rooms" && (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {rooms.map((room) => (
          <div key={room.name} className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-lg">🛏</div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${roomStatusConfig[room.status as keyof typeof roomStatusConfig].bg} ${roomStatusConfig[room.status as keyof typeof roomStatusConfig].text}`}>{room.status}</span>
            </div>
            <p className="font-semibold text-gray-800 text-sm mb-1">{room.name}</p>
            <p className="text-xs text-gray-400">{room.type} · Étage {room.floor}</p>
          </div>
        ))}
      </div>
    )}
  </div>
)
}