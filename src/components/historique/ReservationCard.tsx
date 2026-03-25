interface ReservationCardProps {
  hotel: string
  ville: string
  chambre: string
  dateArrivee: string
  dateDepart: string
  montant: number
  statut: "Confirmé" | "Annulé" | "Terminé"
  note?: number
}

const ReservationCard = ({
  hotel,
  ville,
  chambre,
  dateArrivee,
  dateDepart,
  montant,
  statut,
  note,
}: ReservationCardProps) => {
  const statutColor = {
    Confirmé: "bg-green-100 text-green-700",
    Annulé: "bg-red-100 text-red-700",
    Terminé: "bg-green-100 text-green-700",
  }

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="bg-blue-50 p-3 rounded-lg text-2xl">🏨</div>
        <div>
          <p className="font-semibold text-gray-800">{hotel}</p>
          <p className="text-xs text-gray-400">📍 {ville}</p>
          <p className="text-sm text-gray-500 mt-1">{chambre}</p>
          <p className="text-xs text-gray-400 mt-1">{dateArrivee} → {dateDepart}</p>
        </div>
      </div>
      <div className="text-right flex flex-col items-end gap-2">
        <p className="font-bold text-gray-800">{montant.toLocaleString()} €</p>
        <span className={`text-xs font-medium px-3 py-1 rounded-full ${statutColor[statut]}`}>
          {statut}
        </span>
        {note ? (
          <span className="text-amber-400 text-sm">{"⭐".repeat(note)} {note}.0</span>
        ) : (
          <span className="text-gray-300 text-sm">—</span>
        )}
      </div>
    </div>
  )
}

export default ReservationCard