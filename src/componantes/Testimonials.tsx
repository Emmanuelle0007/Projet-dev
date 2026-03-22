const testimonials = [
  {
    name: 'Sophie Martin',
    country: 'France',
    avatar: 'https://i.pravatar.cc/100?img=47',
    hotel: 'Le Grand Palais, Paris',
    text: 'Une expérience absolument inoubliable. Le service était irréprochable, la chambre magnifique et la vue sur la Tour Eiffel à couper le souffle.',
    rating: 5,
  },
  {
    name: 'Ahmed Diallo',
    country: 'Sénégal',
    avatar: 'https://i.pravatar.cc/100?img=12',
    hotel: 'Radisson Blu, Dakar',
    text: 'Hôtel exceptionnel, personnel aux petits soins. Le restaurant propose une cuisine locale et internationale de grande qualité. Je recommande vivement.',
    rating: 5,
  },
  {
    name: 'Lena Hoffmann',
    country: 'Allemagne',
    avatar: 'https://i.pravatar.cc/100?img=25',
    hotel: 'Villa Mabrouka, Tanger',
    text: 'La villa est un véritable havre de paix. Le jardin, le hammam, la vue sur la mer... Tout était parfait. Un séjour dont je me souviendrai longtemps.',
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section id="avis" className="py-24 bg-[#F8F6F1]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-gold text-xs tracking-[0.3em] uppercase font-semibold">Témoignages</span>
          <h2 className="font-display text-4xl md:text-5xl text-navy mt-2">
            Ce que disent nos <span className="italic text-gold">Clients</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              {/* Quote */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
              {/* Author */}
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-navy text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.country} · {t.hotel}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-gray-200 pt-12">
          {[
            { icon: '🏅', label: 'Meilleur prix garanti' },
            { icon: '🔒', label: 'Paiement 100% sécurisé' },
            { icon: '📞', label: 'Support 24h/24 7j/7' },
            { icon: '✈️', label: 'Annulation gratuite' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="text-2xl">{item.icon}</span>
              <span className="text-navy text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
