import { useState } from 'react'

export default function Hero() {
  const [destination, setDestination] = useState('')
  const [checkin, setCheckin] = useState('')
  const [checkout, setCheckout] = useState('')
  const [guests, setGuests] = useState('2 voyageurs')

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image via Unsplash */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80"
          alt="Hotel luxury"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/60 to-navy/90" />
      </div>

      {/* Decorative gold line */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-40 bg-gradient-to-b from-transparent via-gold to-transparent" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-gold/40 text-gold text-xs tracking-[0.3em] uppercase px-4 py-2 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          Collection Prestige 2025
        </div>

        {/* Title */}
        <h1 className="font-display text-5xl md:text-7xl text-white leading-tight mb-6">
          L'Excellence au <br />
          <span className="text-gold italic">Cœur de chaque</span> <br />
          Séjour
        </h1>

        <p className="text-white/60 text-lg max-w-xl mx-auto mb-12 leading-relaxed">
          Découvrez nos hôtels de luxe soigneusement sélectionnés. Une expérience unique vous attend à chaque destination.
        </p>

        {/* Search bar */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 md:p-2 max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row gap-3 md:gap-0">
            {/* Destination */}
            <div className="flex-1 md:border-r border-white/20 px-4 py-2">
              <label className="block text-gold text-xs tracking-widest uppercase mb-1">Destination</label>
              <input
                type="text"
                placeholder="Paris, Dakar, Dubai..."
                value={destination}
                onChange={e => setDestination(e.target.value)}
                className="bg-transparent text-white placeholder-white/40 text-sm w-full outline-none"
              />
            </div>
            {/* Check-in */}
            <div className="flex-1 md:border-r border-white/20 px-4 py-2">
              <label className="block text-gold text-xs tracking-widest uppercase mb-1">Arrivée</label>
              <input
                type="date"
                value={checkin}
                onChange={e => setCheckin(e.target.value)}
                className="bg-transparent text-white/80 text-sm w-full outline-none"
              />
            </div>
            {/* Check-out */}
            <div className="flex-1 md:border-r border-white/20 px-4 py-2">
              <label className="block text-gold text-xs tracking-widest uppercase mb-1">Départ</label>
              <input
                type="date"
                value={checkout}
                onChange={e => setCheckout(e.target.value)}
                className="bg-transparent text-white/80 text-sm w-full outline-none"
              />
            </div>
            {/* Guests */}
            <div className="flex-1 px-4 py-2">
              <label className="block text-gold text-xs tracking-widest uppercase mb-1">Voyageurs</label>
              <select
                value={guests}
                onChange={e => setGuests(e.target.value)}
                className="bg-transparent text-white/80 text-sm w-full outline-none"
              >
                <option className="text-navy">1 voyageur</option>
                <option className="text-navy">2 voyageurs</option>
                <option className="text-navy">3 voyageurs</option>
                <option className="text-navy">4+ voyageurs</option>
              </select>
            </div>
            {/* Button */}
            <button className="md:ml-2 bg-gold text-navy font-bold text-sm uppercase tracking-wider px-8 py-3 rounded-xl hover:bg-gold/90 transition-colors whitespace-nowrap">
              Rechercher
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-12 mt-16">
          {[
            { val: '500+', label: 'Hôtels' },
            { val: '80+', label: 'Pays' },
            { val: '50k+', label: 'Clients satisfaits' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-gold font-display text-3xl">{s.val}</p>
              <p className="text-white/50 text-xs uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="text-xs tracking-widest uppercase">Découvrir</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
