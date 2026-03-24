import { Calendar, History, BarChart3 } from "lucide-react";

interface SidebarProps {
  activePage?: 'reservations' | 'historique' | 'statistiques';
  onPageChange?: (page: 'reservations' | 'historique' | 'statistiques') => void;
}

export default function Sidebar({ activePage = 'reservations', onPageChange }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3 border-b border-gray-100">
        <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">H</span>
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
          LuxHôtel
        </span>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        <button
          onClick={() => onPageChange?.('reservations')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            activePage === 'reservations'
              ? 'bg-amber-50 text-amber-600 font-medium shadow-sm'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span>Réservations</span>
        </button>
        
        <button
          onClick={() => onPageChange?.('statistiques')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            activePage === 'statistiques'
              ? 'bg-amber-50 text-amber-600 font-medium shadow-sm'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <BarChart3 className="w-5 h-5" />
          <span>Statistiques</span>
        </button>
        
        <button
          onClick={() => onPageChange?.('historique')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            activePage === 'historique'
              ? 'bg-amber-50 text-amber-600 font-medium shadow-sm'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <History className="w-5 h-5" />
          <span>Historique</span>
        </button>
      </nav>
    </div>
  );
}