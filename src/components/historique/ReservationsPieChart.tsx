import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { name: "Terminé", value: 18 },
  { name: "Confirmé", value: 4 },
  { name: "Annulé", value: 2 },
]

const COLORS = ["#3B82F6", "#10B981", "#EF4444"]

const ReservationsPieChart = () => {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default ReservationsPieChart