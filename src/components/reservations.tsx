import { useState } from 'react';
import { Plus, X, Users, Calendar, Bed, CreditCard, Phone, Mail } from 'lucide-react';

interface Reservations {
  id: string;
  guest: string;
  email: string;
  phone: string;
  room: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  adults: number;
  children: number;
  status: string;
  amount: number;
  pricePerNight: number;
  avatar: string;
}

interface ReservationsProps {
  reservations: Reservations[];
  onAddReservation: (reservation: any) => void;
}

const statusConfig = {
  "En cours": { bg: "bg-blue-100", text: "text-blue-800", dot: "bg-blue-500" },
  "Terminée": { bg: "bg-gray-100", text: "text-gray-600", dot: "bg-gray-400" },
  "Confirmée": { bg: "bg-emerald-100", text: "text-emerald-800", dot: "bg-emerald-500" },
};

const avatarColors = [
  "bg-purple-100 text-purple-700",
  "bg-teal-100 text-teal-700",
  "bg-rose-100 text-rose-700",
  "bg-amber-100 text-amber-700",
];

const rooms = [
  { name: "Suite Royale 401", type: "Suite", capacity: 4, price: 875000 },
  { name: "Chambre Deluxe 210", type: "Deluxe", capacity: 2, price: 180000 },
  { name: "Junior Suite 305", type: "Suite", capacity: 3, price: 315000 },
  { name: "Chambre Standard 108", type: "Standard", capacity: 2, price: 135000 },
  { name: "Suite Présidentielle 501", type: "Suite", capacity: 6, price: 1250000 },
  { name: "Chambre Standard 102", type: "Standard", capacity: 2, price: 125000 },
  { name: "Chambre Deluxe 220", type: "Deluxe", capacity: 2, price: 190000 },
  { name: "Junior Suite 310", type: "Suite", capacity: 3, price: 320000 }
];

export default function Reservations({ reservations, onAddReservation }: ReservationsProps) {
  const [filterStatus, setFilterStatus] = useState("Tous");
  const [showModal, setShowModal] = useState(false);
  
  // État du formulaire avec tous les champs
  const [formData, setFormData] = useState({
    guest: '',
    email: '',
    phone: '',
    room: '',
    roomType: '',
    checkIn: '',
    checkOut: '',
    adults: 1,
    children: 0,
    pricePerNight: '',
    status: 'Confirmée',
    specialRequests: ''
  });

  const filtered = filterStatus === "Tous"
    ? reservations
    : reservations.filter((r) => r.status === filterStatus);

  // Calculer le nombre de nuits
  const calculateNights = () => {
    if (formData.checkIn && formData.checkOut) {
      const start = new Date(formData.checkIn);
      const end = new Date(formData.checkOut);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  // Mettre à jour le prix et le type automatiquement quand on change la chambre
  const handleRoomChange = (roomName: string) => {
    const selectedRoom = rooms.find(r => r.name === roomName);
    if (selectedRoom) {
      setFormData({
        ...formData,
        room: roomName,
        roomType: selectedRoom.type,
        pricePerNight: selectedRoom.price.toString()
      });
    }
  };

  const nights = calculateNights();
  const pricePerNightNum = parseInt(formData.pricePerNight) || 0;
  const totalPrice = pricePerNightNum * nights;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newReservation: Reservations = {
      id: `RES-${Math.floor(Math.random() * 1000)}`,
      guest: formData.guest,
      email: formData.email,
      phone: formData.phone,
      room: formData.room,
      roomType: formData.roomType,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      nights: nights,
      adults: formData.adults,
      children: formData.children,
      status: formData.status,
      amount: totalPrice,
      pricePerNight: pricePerNightNum,
      avatar: formData.guest.split(' ').map(n => n[0]).join('').toUpperCase()
    };
    
    onAddReservation(newReservation);
    setShowModal(false);
    // Réinitialiser le formulaire
    setFormData({
      guest: '',
      email: '',
      phone: '',
      room: '',
      roomType: '',
      checkIn: '',
      checkOut: '',
      adults: 1,
      children: 0,
      pricePerNight: '',
      status: 'Confirmée',
      specialRequests: ''
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Réservations</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nouvelle réservation
        </button>
      </div>

      {/* Filtres */}
      <div className="flex gap-2 flex-wrap">
        {["Tous", "En cours", "Confirmée", "Terminée"].map((f) => (
          <button
            key={f}
            onClick={() => setFilterStatus(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filterStatus === f ? "bg-amber-400 text-white" : "bg-white text-gray-500 border border-gray-200 hover:border-amber-300"
            }`}
          >
            {f}
          </button>
        ))}
        <span className="ml-auto text-sm text-gray-400">
          {filtered.length} résultat{filtered.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* Tableau des réservations */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase">Client</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-400 uppercase">Contact</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-400 uppercase">Chambre</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-400 uppercase">Arrivée</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-400 uppercase">Départ</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-400 uppercase">Nuits</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-400 uppercase">Personnes</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-400 uppercase">Montant</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-400 uppercase">Statut</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((res, i) => (
                <tr key={res.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${avatarColors[i % avatarColors.length]}`}>
                        {res.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{res.guest}</p>
                        <p className="text-xs text-gray-400">{res.id}</p>
                      </div>
                    </div>
                   </td>
                  <td className="px-4 py-3.5">
                    <div className="text-xs">
                      <p className="text-gray-600 flex items-center gap-1"><Mail className="w-3 h-3" /> {res.email || "-"}</p>
                      <p className="text-gray-500 flex items-center gap-1 mt-1"><Phone className="w-3 h-3" /> {res.phone || "-"}</p>
                    </div>
                   </td>
                  <td className="px-4 py-3.5">
                    <div>
                      <p className="text-gray-800">{res.room}</p>
                      <p className="text-xs text-gray-400">{res.roomType}</p>
                    </div>
                   </td>
                  <td className="px-4 py-3.5 text-gray-600">{res.checkIn}</td>
                  <td className="px-4 py-3.5 text-gray-600">{res.checkOut}</td>
                  <td className="px-4 py-3.5 text-gray-600">{res.nights || 1} nuit(s)</td>
                  <td className="px-4 py-3.5 text-gray-600">{res.adults + (res.children || 0)} pers</td>
                  <td className="px-4 py-3.5 font-semibold text-gray-800">{res.amount.toLocaleString()} F</td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[res.status].bg} ${statusConfig[res.status].text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[res.status].dot}`}></span>
                      {res.status}
                    </span>
                   </td>
                 </tr>
              ))}
            </tbody>
           </table>
        </div>
      </div>

      {/* Modal d'ajout de réservation */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Nouvelle réservation</h2>
              <button 
                onClick={() => setShowModal(false)} 
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Informations client */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-amber-500" />
                  Informations client
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                      value={formData.guest}
                      onChange={(e) => setFormData({...formData, guest: e.target.value})}
                      placeholder="Amadou Diallo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="client@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="77 123 45 67"
                    />
                  </div>
                </div>
              </div>

              {/* Dates du séjour */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-500" />
                  Dates du séjour
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date d'arrivée *
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                      value={formData.checkIn}
                      onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date de départ *
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                      value={formData.checkOut}
                      onChange={(e) => setFormData({...formData, checkOut: e.target.value})}
                    />
                  </div>
                </div>
                {formData.checkIn && formData.checkOut && nights > 0 && (
                  <div className="mt-2 text-sm text-gray-600">
                    📅 {nights} nuit{nights > 1 ? 's' : ''}
                  </div>
                )}
              </div>

              {/* Hébergement */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Bed className="w-5 h-5 text-amber-500" />
                  Hébergement
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Chambre *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                      value={formData.room}
                      onChange={(e) => handleRoomChange(e.target.value)}
                    >
                      <option value="">Sélectionner une chambre</option>
                      {rooms.map(room => (
                        <option key={room.name} value={room.name}>
                          {room.name} - {room.type} ({room.capacity} pers) - {room.price.toLocaleString()} FCFA/nuit
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type de chambre
                    </label>
                    <input
                      type="text"
                      disabled
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50"
                      value={formData.roomType}
                      placeholder="Auto-rempli"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Adultes *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                      value={formData.adults}
                      onChange={(e) => setFormData({...formData, adults: parseInt(e.target.value)})}
                    >
                      {[1,2,3,4,5,6].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Enfants
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                      value={formData.children}
                      onChange={(e) => setFormData({...formData, children: parseInt(e.target.value)})}
                    >
                      {[0,1,2,3,4].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Paiement */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-amber-500" />
                  Paiement
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prix par nuit (FCFA) *
                    </label>
                    <input
                      type="number"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                      value={formData.pricePerNight}
                      onChange={(e) => setFormData({...formData, pricePerNight: e.target.value})}
                      placeholder="150000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Statut
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                    >
                      <option value="Confirmée">Confirmée</option>
                      <option value="En cours">En cours</option>
                      <option value="Terminée">Terminée</option>
                    </select>
                  </div>
                </div>
                
                {formData.checkIn && formData.checkOut && formData.pricePerNight && nights > 0 && (
                  <div className="mt-3 p-3 bg-amber-50 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span>Total pour {nights} nuit{nights > 1 ? 's' : ''} :</span>
                      <span className="font-bold text-amber-600 text-lg">{totalPrice.toLocaleString()} FCFA</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Demandes spéciales */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Demandes spéciales
                </label>
                <textarea
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                  placeholder="Lit bébé, repas spécifique, vue sur mer, etc..."
                />
              </div>

              {/* Boutons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-amber-500 text-white py-2 rounded-lg font-semibold hover:bg-amber-600"
                >
                  Confirmer la réservation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}