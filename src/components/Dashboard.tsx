import { useState } from 'react';
import Sidebar from './Sidebar';  
import Reservations from './reservations';
import Statistiques from './statistiques';
import Historique from './historiques';

// Données initiales vides
const initialReservations: any[] = [];

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState<'reservations' | 'historique' | 'statistiques'>('reservations');
  const [reservations, setReservations] = useState(initialReservations);

  // Fonction pour ajouter une réservation
  const handleAddReservation = (newReservation: any) => {
    console.log("Ajout dans Dashboard:", newReservation);
    setReservations([newReservation, ...reservations]);
  };

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <Sidebar activePage={currentPage} onPageChange={setCurrentPage} />
      <main className="flex-1 overflow-y-auto p-6">
        {currentPage === 'reservations' && (
          <Reservations 
            reservations={reservations} 
            onAddReservation={handleAddReservation}
          />
        )}
        {currentPage === 'statistiques' && <Statistiques />}
        {currentPage === 'historique' && (
          <Historique reservations={reservations} />
        )}
      </main>
    </div>
  );
}