const offers = [
  {
    badge: '-30%',
    title: 'Escapade Week-end',
    desc: 'Profitez de nos tarifs préférentiels pour tout séjour du vendredi au dimanche dans nos hôtels partenaires.',
    img: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
    expires: '30 Mars 2025',
    color: 'from-navy to-navy/80',
  },
  {
    badge: 'Petit-déjeuner offert',
    title: 'Séjour Romantique',
    desc: 'Pour les couples, un petit-déjeuner en chambre offert + bouteille de champagne à l\'arrivée.',
    img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
    expires: '15 Avril 2025',
    color: 'from-[#7B4F2E] to-[#4A2F1A]',
  },
  {
    badge: 'Nuit offerte',
    title: 'Long Séjour',
    desc: 'Réservez 6 nuits et la 7ème est offerte. Applicable dans tous nos hôtels 5 étoiles.',
    img: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&q=80',
    expires: '31 Mai 2025',
    color: 'from-[#1A3A4A] to-[#0D2233]',
  },
]

export default function Offers() {
  return (
    <section id="offres" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-gold text-xs tracking-[0.3em] uppercase font-semibold">Promotions exclusives</span>
          <h2 className="font-display text-4xl md:text-5xl text-navy mt-2">
            Offres <span className="italic text-gold">Spéciales</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">
            Des offres limitées dans le temps, réservées à nos membres. Inscrivez-vous pour ne rien manquer.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div key={offer.title} className="relative rounded-2xl overflow-hidden group cursor-pointer h-80">
              {/* BG image */}
              <img
                src={offer.img}
                alt={offer.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${offer.color} opacity-80`} />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-6">
                {/* Badge */}
                <div className="self-start bg-gold text-navy text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                  {offer.badge}
                </div>

                <div>
                  <h3 className="font-display text-white text-2xl mb-2">{offer.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">{offer.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/50 text-xs">Expire le {offer.expires}</span>
                    <button className="text-gold border border-gold text-xs uppercase tracking-wider px-4 py-1.5 rounded-full hover:bg-gold hover:text-navy transition-colors">
                      En profiter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom banner */}
        <div className="mt-10 bg-navy rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-1">Newsletter exclusive</p>
            <h3 className="font-display text-white text-2xl">Recevez nos offres en avant-première</h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <input
              type="email"
              placeholder="votre@email.com"
              className="bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm px-5 py-3 rounded-xl outline-none flex-1 md:w-64"
            />
            <button className="bg-gold text-navy font-bold text-sm uppercase tracking-wider px-6 py-3 rounded-xl hover:bg-gold/90 transition-colors whitespace-nowrap">
              S'inscrire
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
