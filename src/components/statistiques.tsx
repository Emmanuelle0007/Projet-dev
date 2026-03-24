import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Données simulées
const monthlyRevenue = [
  { month: 'Jan', revenus: 4250000, reservations: 32 },
  { month: 'Fév', revenus: 4890000, reservations: 38 },
  { month: 'Mar', revenus: 5230000, reservations: 41 },
  { month: 'Avr', revenus: 6120000, reservations: 47 },
  { month: 'Mai', revenus: 5870000, reservations: 45 },
  { month: 'Juin', revenus: 6980000, reservations: 53 },
];

const roomOccupation = [
  { name: 'Suites', valeur: 45, fill: '#f59e0b' },
  { name: 'Deluxe', valeur: 68, fill: '#3b82f6' },
  { name: 'Standard', valeur: 82, fill: '#10b981' },
];

const reservationStatus = [
  { name: 'En cours', value: 12, color: '#3b82f6' },
  { name: 'Confirmées', value: 18, color: '#10b981' },
  { name: 'Terminées', value: 24, color: '#6b7280' },
];

export default function Statistiques() {
  return (
    <div className="space-y-6">
      {/* Cartes KPI */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border">
          <p className="text-sm text-gray-500">Revenus totaux</p>
          <p className="text-2xl font-bold text-gray-800">33,3M FCFA</p>
          <p className="text-xs text-green-600">+12% vs mois dernier</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border">
          <p className="text-sm text-gray-500">Réservations</p>
          <p className="text-2xl font-bold text-gray-800">256</p>
          <p className="text-xs text-green-600">+8% vs mois dernier</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border">
          <p className="text-sm text-gray-500">Taux d'occupation</p>
          <p className="text-2xl font-bold text-gray-800">78%</p>
          <p className="text-xs text-green-600">+5% vs mois dernier</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border">
          <p className="text-sm text-gray-500">Note moyenne</p>
          <p className="text-2xl font-bold text-gray-800">4.8/5</p>
          <p className="text-xs text-green-600">+0.2 vs mois dernier</p>
        </div>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique ligne - Revenus */}
        <div className="bg-white rounded-xl p-5 shadow-sm border">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Évolution des revenus</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `${(value / 1000000).toFixed(1)}M FCFA`} />
              <Legend />
              <Line type="monotone" dataKey="revenus" stroke="#f59e0b" strokeWidth={2} name="Revenus (FCFA)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Graphique barres - Réservations */}
        <div className="bg-white rounded-xl p-5 shadow-sm border">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Réservations par mois</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="reservations" fill="#3b82f6" name="Nombre de réservations" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Graphique circulaire - Statut réservations */}
        <div className="bg-white rounded-xl p-5 shadow-sm border">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Statut des réservations</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={reservationStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {reservationStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}