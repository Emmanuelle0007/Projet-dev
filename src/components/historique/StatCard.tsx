interface StatCardProps {
  title: string
  value: string | number
  icon: string
  color: string
  trend: string
}

const StatCard = ({ title, value, icon, color, trend }: StatCardProps) => {
  const isPositive = trend.startsWith("+")
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gray-500 font-medium">{title}</span>
        <span className={`text-xl p-2 rounded-lg ${color}`}>{icon}</span>
      </div>
      <p className="text-2xl font-bold text-gray-800 mb-1">{value}</p>
      <span className={`text-xs font-medium ${isPositive ? "text-green-500" : "text-red-500"}`}>
        {trend}
      </span>
    </div>
  )
}

export default StatCard