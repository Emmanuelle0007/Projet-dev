import { useState } from 'react'

const LOGO_SRC = '/assets/logo.png'
const LOGO_FALLBACK = 'LuxeStay'
const HERO_IMAGE = '/assets/lulu.jpg'

const hotels = [
  {
    id: 1,
    name: 'Le Grand Palais',
    location: 'Paris, France',
    price: 195000,
    rating: 4.9,
    reviews: 1284,
    category: 'Suite Royale',
    img: '/assets/paris-p.jpg',
    hoverImages: ['/assets/paris1.jpg', '/assets/paris2.jpg', '/assets/paris3.jpg'],
    tags: ['Spa', 'Piscine', 'Vue panoramique'],
  },
  {
    id: 2,
    name: 'Radisson Blu Dakar',
    location: 'Dakar, Sénégal',
    price: 112000,
    rating: 4.7,
    reviews: 842,
    category: 'Chambre Prestige',
    img: '/assets/dakar-p.jpg',
    hoverImages: ['/assets/dakar1.jpg', '/assets/dakar2.jpg', '/assets/dakar3.jpg'],
    tags: ['Plage privée', 'Restaurant', 'Bar'],
  },
  {
    id: 3,
    name: 'Burj Al Arab',
    location: 'Dubai, EAU',
    price: 750000,
    rating: 5.0,
    reviews: 3021,
    category: 'Suite Royale',
    img: '/assets/dubai-p.jpg',
    hoverImages: ['/assets/dubai1.jpg', '/assets/dubai2.jpg', '/assets/dubai3.jpg'],
    tags: ['Butler privé', 'Hélipad', 'Plage'],
  },
  {
    id: 4,
    name: 'Les Tours Jumelles',
    location: 'Brazzaville, Congo',
    price: 145000,
    rating: 4.8,
    reviews: 567,
    category: 'Villa Exclusive',
    img: '/assets/congo-p.jpg',
    hoverImages: ['/assets/Congo1.jpg', '/assets/Congo2.jpg', '/assets/Congo3.jpg'],
    tags: ['Jardin', 'Hammam', 'Vue mer'],
  },
  {
    id: 5,
    name: 'Park Hyatt',
    location: 'Tokyo, Japon',
    price: 945000,
    rating: 4.8,
    reviews: 967,
    category: 'Hotel Luxueux',
    img: '/assets/Tokyo-p.jpg',
    hoverImages: ['/assets/Tokyo1.jpg', '/assets/Tokyo2.jpg', '/assets/Tokyo3.jpg'],
    tags: ['Jardin', 'Piscine'],
  },
]

const offers = [
  {
    badge: '-30%',
    title: 'Escapade Week-end',
    desc: 'Tarifs préférentiels pour tout séjour du vendredi au dimanche dans nos hôtels partenaires.',
    img: '/assets/week.jpg',
    expires: '30 Mars 2026',
  },
  {
    badge: 'Petit-déjeuner offert',
    title: 'Séjour Romantique',
    desc: "Pour les couples : petit-déjeuner en chambre offert et bouteille de champagne à l'arrivée.",
    img: '/assets/Amureux.jpg',
    expires: '15 Avril 2026',
  },
  {
    badge: 'Nuit offerte',
    title: 'Long Séjour',
    desc: 'Réservez 6 nuits et la 7ème est offerte dans tous nos hôtels 5 étoiles.',
    img: '/assets/luvv.jpg',
    expires: '31 Mai 2027',
  },
]

const testimonials = [
  {
    name: 'Sophie Martin',
    country: 'France',
    hotel: 'Le Grand Palais, Paris',
    text: 'Une expérience absolument inoubliable. Le service était irréprochable et la chambre magnifique.',
    rating: 5,
  },
  {
    name: 'Amed Diallo',
    country: 'Sénégal',
    hotel: 'Radisson Blu, Dakar',
    text: 'Hôtel exceptionnel, personnel aux petits soins. Le restaurant propose une cuisine de grande qualité.',
    rating: 5,
  },
  {
    name: 'Lena Hoffmann',
    country: 'Allemagne',
    hotel: 'Les Tours Jumelles, Brazzaville',
    text: 'La villa est un véritable havre de paix. Le jardin, le hammam, la vue — tout était parfait.',
    rating: 5,
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
            <svg key={s} className={`w-3.5 h-3.5 ${s <= Math.floor(rating) ? 'text-gold' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ))}
      </div>
  )
}

function HotelCard({ hotel }: { hotel: typeof hotels[0] }) {
  const [currentImg, setCurrentImg] = useState(hotel.img)
  const [hoverIndex, setHoverIndex] = useState(-1)
  const allImages = [hotel.img, ...hotel.hoverImages]

  return (
      <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
        <div className="relative overflow-hidden h-48">
          <img
              src={currentImg}
              alt={hotel.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80' }}
          />
          {/* Barre de navigation images au survol */}
          <div className="absolute bottom-0 left-0 right-0 flex gap-1 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/50 to-transparent">
            {allImages.map((img, i) => (
                <button
                    key={i}
                    onMouseEnter={() => { setCurrentImg(img); setHoverIndex(i) }}
                    onMouseLeave={() => { setCurrentImg(hotel.img); setHoverIndex(-1) }}
                    className={`flex-1 h-1.5 rounded-full transition-all ${hoverIndex === i ? 'bg-gold' : 'bg-white/60'}`}
                />
            ))}
          </div>
          <div className="absolute top-3 left-3 bg-navy/80 text-white text-xs px-2 py-1 rounded-full tracking-wider uppercase">
            {hotel.category}
          </div>
          <button className="absolute top-3 right-3 bg-white/90 p-1.5 rounded-full text-gray-400 hover:text-red-400 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-display text-navy text-base leading-tight mb-0.5">{hotel.name}</h3>
          <p className="text-gray-400 text-xs mb-2 flex items-center gap-1">
            <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {hotel.location}
          </p>
          <div className="flex items-center gap-2 mb-2">
            <StarRating rating={hotel.rating} />
            <span className="text-xs text-gray-400">({hotel.reviews})</span>
          </div>
          <div className="flex flex-wrap gap-1 mb-3">
            {hotel.tags.map((tag) => (
                <span key={tag} className="text-xs bg-[#F8F6F1] text-gray-500 px-2 py-0.5 rounded-full">{tag}</span>
            ))}
          </div>
          <div className="flex items-center justify-between mt-auto">
            <div>
              <span className="font-display text-navy text-base">{hotel.price.toLocaleString('fr-FR')}</span>
              <span className="text-gray-400 text-xs"> FCFA/nuit</span>
            </div>
            <a href="/register" className="bg-gold text-navy text-xs font-bold uppercase tracking-wider px-3 py-2 rounded-xl hover:bg-gold/80 transition-colors">
              Réserver
            </a>
          </div>
        </div>
      </div>
  )
}

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [destination, setDestination] = useState('')
  const [checkin, setCheckin] = useState('')
  const [checkout, setCheckout] = useState('')
  const [guests, setGuests] = useState('2 voyageurs')
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  const handleSearch = () => {
    if (!destination) { alert('Veuillez entrer une destination'); return }
    if (!checkin || !checkout) { alert('Veuillez choisir vos dates'); return }
    window.location.href = `/register?dest=${encodeURIComponent(destination)}&in=${checkin}&out=${checkout}&guests=${encodeURIComponent(guests)}`
  }

  const handleNewsletter = () => {
    if (!email || !email.includes('@')) { alert('Veuillez entrer une adresse email valide'); return }
    setEmailSent(true)
    setEmail('')
    setTimeout(() => setEmailSent(false), 4000)
  }

  return (
      <>
        {/* ====== NAVBAR ====== */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-gold/20">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <img src={LOGO_SRC} alt="Logo" className="h-8 w-auto"
                   onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
              <span className="text-white font-display text-xl tracking-widest uppercase">{LOGO_FALLBACK}</span>
            </a>

            <ul className="hidden md:flex items-center gap-8 text-sm text-white/70 tracking-wider uppercase">
              <li><a href="#hotels" className="hover:text-gold transition-colors">Hotels</a></li>
              <li><a href="#offres" className="hover:text-gold transition-colors">Offres</a></li>
              <li><a href="#avis" className="hover:text-gold transition-colors">Avis</a></li>
            </ul>

            <div className="hidden md:flex items-center gap-3">
              <a href="/login" className="text-white/70 text-sm hover:text-gold transition-colors tracking-wider uppercase">Connexion</a>
              <a href="/register" className="bg-gold text-navy text-sm font-bold px-5 py-2 rounded-full hover:bg-gold/80 transition-colors tracking-wider uppercase">Réserver</a>
            </div>

            <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>

          {menuOpen && (
              <div className="md:hidden bg-navy border-t border-gold/20 px-6 py-4 flex flex-col gap-4 text-sm text-white/80 uppercase tracking-wider">
                <a href="#hotels" className="hover:text-gold" onClick={() => setMenuOpen(false)}>Hotels</a>
                <a href="#offres" className="hover:text-gold" onClick={() => setMenuOpen(false)}>Offres</a>
                <a href="#avis" className="hover:text-gold" onClick={() => setMenuOpen(false)}>Avis</a>
                <a href="/login" className="hover:text-gold">Connexion</a>
                <a href="/register" className="bg-gold text-navy font-bold px-4 py-2 rounded-full text-center">Réserver</a>
              </div>
          )}
        </nav>

        {/* ====== HERO ====== */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={HERO_IMAGE} alt="Hero hotel" className="w-full h-full object-cover"
                 onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80' }} />
            <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/60 to-navy/90" />
          </div>

          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 border border-gold/40 text-gold text-xs tracking-[0.3em] uppercase px-4 py-2 rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              Collection Prestige 2025
            </div>

            <h1 className="font-display text-5xl md:text-7xl text-white leading-tight mb-6">
              L'Excellence au <br />
              <span className="text-gold italic">Coeur de chaque</span> <br />
              Sejour
            </h1>

            <p className="text-white/60 text-lg max-w-xl mx-auto mb-12 leading-relaxed">
              Découvrez nos hôtels de luxe soigneusement sélectionnés. Une expérience unique vous attend à chaque destination.
            </p>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 md:p-2 max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row gap-3 md:gap-0">
                <div className="flex-1 md:border-r border-white/20 px-4 py-2">
                  <label className="block text-gold text-xs tracking-widest uppercase mb-1">Destination</label>
                  <input type="text" placeholder="Paris, Dakar, Dubai..."
                         value={destination} onChange={(e) => setDestination(e.target.value)}
                         onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                         className="bg-transparent text-white placeholder-white/40 text-sm w-full outline-none" />
                </div>
                <div className="flex-1 md:border-r border-white/20 px-4 py-2">
                  <label className="block text-gold text-xs tracking-widest uppercase mb-1">Arrivée</label>
                  <input type="date" value={checkin} onChange={(e) => setCheckin(e.target.value)}
                         className="bg-transparent text-white/80 text-sm w-full outline-none" />
                </div>
                <div className="flex-1 md:border-r border-white/20 px-4 py-2">
                  <label className="block text-gold text-xs tracking-widest uppercase mb-1">Départ</label>
                  <input type="date" value={checkout} onChange={(e) => setCheckout(e.target.value)}
                         className="bg-transparent text-white/80 text-sm w-full outline-none" />
                </div>
                <div className="flex-1 px-4 py-2">
                  <label className="block text-gold text-xs tracking-widest uppercase mb-1">Voyageurs</label>
                  <select value={guests} onChange={(e) => setGuests(e.target.value)}
                          className="bg-transparent text-white/80 text-sm w-full outline-none">
                    <option className="text-navy">1 voyageur</option>
                    <option className="text-navy">2 voyageurs</option>
                    <option className="text-navy">3 voyageurs</option>
                    <option className="text-navy">4+ voyageurs</option>
                  </select>
                </div>
                <button onClick={handleSearch}
                        className="md:ml-2 bg-gold text-navy font-bold text-sm uppercase tracking-wider px-8 py-3 rounded-xl hover:bg-gold/80 transition-colors cursor-pointer whitespace-nowrap">
                  Rechercher
                </button>
              </div>
            </div>

            <div className="flex justify-center gap-12 mt-16">
              {[{ val: '500+', label: 'Hôtels' }, { val: '80+', label: 'Pays' }, { val: '50k+', label: 'Clients satisfaits' }].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-gold font-display text-3xl">{s.val}</p>
                    <p className="text-white/50 text-xs uppercase tracking-widest mt-1">{s.label}</p>
                  </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
            <span className="text-xs tracking-widest uppercase">Découvrir</span>
            <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
          </div>
        </section>

        {/* ====== HOTELS ====== */}
        <section id="hotels" className="py-24 bg-[#F8F6F1]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
              <div>
                <span className="text-gold text-xs tracking-[0.3em] uppercase font-semibold">Notre sélection</span>
                <h2 className="font-display text-4xl md:text-5xl text-navy mt-2">
                  Hôtels <span className="italic text-gold">Disponibles</span>
                </h2>
                <p className="text-gray-500 mt-3 max-w-md">Des établissements d'exception choisis pour leur excellence et leur service irréprochable.</p>
              </div>
              <a href="/register"
                 className="mt-6 md:mt-0 text-navy border border-navy/30 text-sm uppercase tracking-widest px-6 py-2 rounded-full hover:bg-navy hover:text-white transition-colors">
                Voir tout
              </a>
            </div>

            {/* 5 hotels : 1 col mobile, 2 tablette, 3 md, 5 desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
              {hotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)}
            </div>
          </div>
        </section>

        {/* ====== OFFRES ====== */}
        <section id="offres" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <span className="text-gold text-xs tracking-[0.3em] uppercase font-semibold">Promotions exclusives</span>
              <h2 className="font-display text-4xl md:text-5xl text-navy mt-2">
                Offres <span className="italic text-gold">Spéciales</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {offers.map((offer) => (
                  <div key={offer.title} className="relative rounded-2xl overflow-hidden group cursor-pointer h-80">
                    <img src={offer.img} alt={offer.title}
                         className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                         onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80' }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/90 to-navy/30" />
                    <div className="relative z-10 h-full flex flex-col justify-between p-6">
                      <div className="self-start bg-gold text-navy text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                        {offer.badge}
                      </div>
                      <div>
                        <h3 className="font-display text-white text-2xl mb-2">{offer.title}</h3>
                        <p className="text-white/70 text-sm leading-relaxed mb-4">{offer.desc}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-white/50 text-xs">Expire le {offer.expires}</span>
                          <a href="/register"
                             className="text-gold border border-gold text-xs uppercase tracking-wider px-4 py-1.5 rounded-full hover:bg-gold hover:text-navy transition-colors">
                            En profiter
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
              ))}
            </div>

            {/* Newsletter */}
            <div className="mt-10 bg-navy rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-gold text-xs tracking-[0.3em] uppercase mb-1">Newsletter exclusive</p>
                <h3 className="font-display text-white text-2xl">Recevez nos offres en avant-première</h3>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <input type="email" placeholder="votre@email.com"
                       value={email} onChange={(e) => setEmail(e.target.value)}
                       onKeyDown={(e) => e.key === 'Enter' && handleNewsletter()}
                       className="bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm px-5 py-3 rounded-xl outline-none flex-1 md:w-64" />
                <button onClick={handleNewsletter}
                        className="bg-gold text-navy font-bold text-sm uppercase tracking-wider px-6 py-3 rounded-xl hover:bg-gold/80 transition-colors cursor-pointer whitespace-nowrap">
                  {emailSent ? 'Inscrit !' : "S'inscrire"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ====== AVIS ====== */}
        <section id="avis" className="py-24 bg-[#F8F6F1]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <span className="text-gold text-xs tracking-[0.3em] uppercase font-semibold">Témoignages</span>
              <h2 className="font-display text-4xl md:text-5xl text-navy mt-2">
                Ce que disent nos <span className="italic text-gold">Clients</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                  <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex gap-1 mb-4">
                      {[...Array(t.rating)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                    <div className="flex items-center gap-3">
                      <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover bg-gray-200"
                           onError={(e) => { (e.target as HTMLImageElement).src = `https://i.pravatar.cc/100?u=${t.name}` }} />
                      <div>
                        <p className="font-semibold text-navy text-sm">{t.name}</p>
                        <p className="text-gray-400 text-xs">{t.country} · {t.hotel}</p>
                      </div>
                    </div>
                  </div>
              ))}
            </div>

            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-gray-200 pt-12">
              {[
                { icon: 'M', label: 'Meilleur prix garanti' },
                { icon: 'S', label: 'Paiement 100% sécurisé' },
                { icon: '24', label: 'Support 24h/24 7j/7' },
                { icon: 'A', label: 'Annulation gratuite' },
              ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-xs font-bold shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-navy text-sm font-medium">{item.label}</span>
                  </div>
              ))}
            </div>
          </div>
        </section>
      </>
  )
}
