const hotels = [
  {
    id: 1,
    name: 'Le Grand Palais',
    location: 'Paris, France',
    price: 320,
    rating: 4.9,
    reviews: 1284,
    category: 'Suite Royale',
    img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80',
    tags: ['Spa', 'Piscine', 'Vue Tour Eiffel'],
  },
  {
    id: 2,
    name: 'Radisson Blu Dakar',
    location: 'Dakar, Sénégal',
    price: 185,
    rating: 4.7,
    reviews: 842,
    category: 'Chambre Prestige',
    img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80',
    tags: ['Plage privée', 'Restaurant', 'Bar'],
  },
  {
    id: 3,
    name: 'Burj Al Arab',
    location: 'Dubai, EAU',
    price: 1200,
    rating: 5.0,
    reviews: 3021,
    category: 'Suite Royale',
    img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80',
    tags: ['Butler privé', 'Hélipad', 'Plage'],
  },
  {
    id: 4,
    name: 'Villa Mabrouka',
    location: 'Tanger, Maroc',
    price: 240,
    rating: 4.8,
    reviews: 567,
    category: 'Villa Exclusive',
    img: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80',
    tags: ['Jardin', 'Hammam', 'Vue mer'],
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`w-3.5 h-3.5 ${s <= Math.floor(rating) ? 'text-gold' : 'text-gray-300'}`}
          fill="currentColor" viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Hotels() {
  return (
    <section id="hotels" className="py-24 bg-[#F8F6F1]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <span className="text-gold text-xs tracking-[0.3em] uppercase font-semibold">Notre sélection</span>
            <h2 className="font-display text-4xl md:text-5xl text-navy mt-2">
              Hôtels <span className="italic text-gold">Disponibles</span>
            </h2>
            <p className="text-gray-500 mt-3 max-w-md">
              Des établissements d'exception choisis pour leur excellence et leur service irréprochable.
            </p>
          </div>
          <button className="mt-6 md:mt-0 text-navy border border-navy/30 text-sm uppercase tracking-widest px-6 py-2 rounded-full hover:bg-navy hover:text-white transition-colors">
            Voir tout
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
              {/* Image */}
              <div className="relative overflow-hidden h-52">
                <img
                  src={hotel.img}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-navy/80 text-white text-xs px-3 py-1 rounded-full tracking-wider uppercase">
                  {hotel.category}
                </div>
                <button className="absolute top-3 right-3 bg-white/90 p-1.5 rounded-full text-gray-400 hover:text-red-500 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-display text-navy text-lg leading-tight">{hotel.name}</h3>
                </div>
                <p className="text-gray-400 text-xs mb-2 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {hotel.location}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <StarRating rating={hotel.rating} />
                  <span className="text-xs text-gray-400">({hotel.reviews})</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {hotel.tags.map(tag => (
                    <span key={tag} className="text-xs bg-[#F8F6F1] text-gray-500 px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-display text-navy text-xl">${hotel.price}</span>
                    <span className="text-gray-400 text-xs"> / nuit</span>
                  </div>
                  <button className="bg-gold text-navy text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl hover:bg-gold/90 transition-colors">
                    Réserver
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
