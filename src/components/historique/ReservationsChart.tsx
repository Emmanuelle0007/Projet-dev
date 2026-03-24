import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const data = [
  { mois: "Jan", cetteAnnee: 4, anneePassee: 2 },
  { mois: "Fév", cetteAnnee: 7, anneePassee: 4 },
  { mois: "Mar", cetteAnnee: 5, anneePassee: 6 },
  { mois: "Avr", cetteAnnee: 9, anneePassee: 5 },
  { mois: "Mai", cetteAnnee: 6, anneePassee: 7 },
  { mois: "Jun", cetteAnnee: 11, anneePassee: 8 },
  { mois: "Jul", cetteAnnee: 8, anneePassee: 6 },
  { mois: "Aoû", cetteAnnee: 13, anneePassee: 9 },
  { mois: "Sep", cetteAnnee: 7, anneePassee: 8 },
  { mois: "Oct", cetteAnnee: 10, anneePassee: 7 },
  { mois: "Nov", cetteAnnee: 9, anneePassee: 6 },
  { mois: "Déc", cetteAnnee: 15, anneePassee: 10 },
]

const ReservationsChart = () => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="mois"
          tick={{ fontSize: 11 }}
          interval={0}
          angle={-45}
          textAnchor="end"
          height={50}
        />
        <YAxis tick={{ fontSize: 11 }} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="cetteAnnee"
          stroke="#3B82F6"
          strokeWidth={2}
          dot={false}
          name="Cette année"
        />
        <Line
          type="monotone"
          dataKey="anneePassee"
          stroke="#D1D5DB"
          strokeWidth={2}
          dot={false}
          strokeDasharray="5 5"
          name="Année dernière"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default ReservationsChart