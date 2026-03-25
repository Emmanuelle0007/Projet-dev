import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { type: "Standard", reservations: 8 },
  { type: "Deluxe", reservations: 6 },
  { type: "Suite", reservations: 5 },
  { type: "Royale", reservations: 3 },
  { type: "Pilotis", reservations: 2 },
]

const ReservationsBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="type" tick={{ fontSize: 11 }} />
        <YAxis tick={{ fontSize: 11 }} />
        <Tooltip />
        <Bar dataKey="reservations" fill="#3B82F6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default ReservationsBarChart