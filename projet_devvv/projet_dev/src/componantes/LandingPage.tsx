import { useState, useEffect } from 'react'

const LOGO_SRC = '/src/assets/logo.png'
const LOGO_FALLBACK = 'IRMA'
const HERO_IMAGE = '/src/assets/lulu.jpg'

const hotels = [
  {
    id: 1,
    name: 'Le Grand Palais',
    location: 'Paris, France',
    price: 195000,
    rating: 4.9,
    reviews: 1284,
    category: 'Suite Royale',
    img: '/src/assets/paris-p.jpg',
    hoverImages: ['/src/assets/paris1.jpg', '/src/assets/paris2.jpg', '/src/assets/paris3.jpg'],
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
    img: '/src/assets/dakar-p.jpg',
    hoverImages: ['/src/assets/dakar1.jpg', '/src/assets/dakar2.jpg', '/src/assets/dakar3.jpg'],
    tags: ['Plage privée', 'Restaurant', 'Bar'],
  },
  {
    id: 3,
    name: 'Burj Al Arab',
    location: 'Dubai, EAU',
    price: 750000,
    rating: 5.0,
    reviews: 3021,
    category: 'Chambre Royale',
    img: '/src/assets/dubai-p.jpg',
    hoverImages: ['/src/assets/dubai1.jpg', '/src/assets/dubai2.jpg', '/src/assets/dubai3.jpg'],
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
    img: '/src/assets/congo-p.jpg',
    hoverImages: ['/src/assets/Congo1.jpg', '/src/assets/Congo2.jpg', '/src/assets/Congo3.jpg'],
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
    img: '/src/assets/Tokyo-p.jpg',
    hoverImages: ['/src/assets/Tokyo1.jpg', '/src/assets/Tokyo2.jpg', '/src/assets/Tokyo3.jpg'],
    tags: ['Jardin', 'Piscine'],
  },
]

const offers = [
  {
    badge: '-30%',
    title: 'Escapade Week-end',
    desc: 'Tarifs préférentiels pour tout séjour du vendredi au dimanche dans nos hôtels partenaires.',
    img: '/src/assets/week.jpg',
    expires: '30 Mars 2026',
  },
  {
    badge: 'Petit-déjeuner offert',
    title: 'Séjour Romantique',
    desc: "Pour les couples : petit-déjeuner en chambre offert et bouteille de champagne à l'arrivée.",
    img: '/src/assets/Amureux.jpg',
    expires: '15 Avril 2026',
  },
  {
    badge: 'Nuit offerte',
    title: 'Long Séjour',
    desc: 'Réservez 6 nuits et la 7ème est offerte dans tous nos hôtels 5 étoiles.',
    img: '/src/assets/luvv.jpg',
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

// ─── Types ───────────────────────────────────────────────────────────────────
type Hotel = typeof hotels[0]

// ─── HotelCard ───────────────────────────────────────────────────────────────
function HotelCard({ hotel }: { hotel: Hotel }) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0)
  const [isFav, setIsFav] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [bookingData, setBookingData] = useState({ checkin: '', checkout: '', guests: '2' })
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [userBookings, setUserBookings] = useState<Array<{ hotelName: string; checkin: string; checkout: string; guests: string; date: string }>>([])

  const allImages = [hotel.img, ...hotel.hoverImages]

  useEffect(() => {
    const savedBookings = localStorage.getItem('userBookings')
    if (savedBookings) {
      setUserBookings(JSON.parse(savedBookings))
    }
  }, [])

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault()
    if (!bookingData.checkin || !bookingData.checkout) return

    const newBooking = {
      hotelName: hotel.name,
      checkin: bookingData.checkin,
      checkout: bookingData.checkout,
      guests: bookingData.guests,
      date: new Date().toLocaleDateString('fr-FR')
    }

    const updatedBookings = [...userBookings, newBooking]
    setUserBookings(updatedBookings)
    localStorage.setItem('userBookings', JSON.stringify(updatedBookings))

    setBookingSuccess(true)
    setTimeout(() => {
      setBookingSuccess(false)
      setShowModal(false)
      setBookingData({ checkin: '', checkout: '', guests: '2' })
    }, 3000)
  }

  return (
      <>
        <div
            className="group relative bg-white overflow-hidden cursor-pointer"
            style={{
              borderRadius: '2px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.12)'
              e.currentTarget.style.transform = 'translateY(-4px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
        >
          {/* IMAGE */}
          <div className="relative overflow-hidden" style={{ height: '320px' }}>
            <img
                src={allImages[currentImgIndex]}
                alt={hotel.name}
                className="w-full h-full object-cover pointer-events-none"
                style={{ transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80'
                }}
            />

            {/* Dots de navigation - ENCORE PLUS GRANDS */}
            <div
                className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                  padding: '32px 20px 24px',
                  display: 'flex',
                  gap: '12px',
                  justifyContent: 'center',
                  zIndex: 20,
                }}
            >
              {allImages.map((_, i) => (
                  <button
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation()
                        setCurrentImgIndex(i)
                      }}
                      style={{
                        width: '40px',
                        height: '5px',
                        borderRadius: '4px',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        background: currentImgIndex === i ? '#D4A853' : 'rgba(255,255,255,0.6)',
                      }}
                      aria-label={`Image ${i + 1}`}
                  />
              ))}
            </div>

            {/* Flèche gauche - PLUS GRANDE */}
            <button
                className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
                style={{
                  width: '44px', height: '44px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.95)', border: 'none', cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)', zIndex: 15,
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentImgIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
                }}
            >
              <svg className="w-5 h-5 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Flèche droite - PLUS GRANDE */}
            <button
                className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
                style={{
                  width: '44px', height: '44px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.95)', border: 'none', cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)', zIndex: 15,
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentImgIndex((prev) => (prev + 1) % allImages.length)
                }}
            >
              <svg className="w-5 h-5 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Badge catégorie */}
            <div
                className="absolute top-4 left-4 text-white uppercase px-3 py-1.5"
                style={{
                  background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(8px)',
                  borderRadius: '2px', fontSize: '11px', letterSpacing: '0.12em', fontWeight: '500', zIndex: 10,
                }}
            >
              {hotel.category}
            </div>

            {/* Bouton Favori */}
            <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsFav((prev) => !prev)
                }}
                className="absolute top-4 right-4 flex items-center justify-center"
                style={{
                  width: '40px', height: '40px',
                  background: isFav ? '#FEE2E2' : 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(8px)', borderRadius: '50%', border: 'none', cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)', zIndex: 10,
                }}
                aria-label="Ajouter aux favoris"
            >
              <svg
                  className="w-5 h-5"
                  fill={isFav ? '#EF4444' : 'none'}
                  stroke={isFav ? '#EF4444' : '#9CA3AF'}
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  style={{ transition: 'all 0.25s' }}
              >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>

          {/* CONTENT */}
          <div className="p-6">
            <h3
                className="text-stone-900 font-semibold leading-snug mb-1.5"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '18px' }}
            >
              {hotel.name}
            </h3>

            <p className="flex items-center gap-1.5 text-stone-400 mb-3" style={{ fontSize: '12px' }}>
              <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {hotel.location}
            </p>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                    <svg
                        key={s}
                        className={`w-3.5 h-3.5 ${s <= Math.floor(hotel.rating) ? 'text-amber-400' : 'text-stone-200'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
              </div>
              <span className="text-stone-400" style={{ fontSize: '12px' }}>
              {hotel.rating} ({hotel.reviews.toLocaleString()})
            </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {hotel.tags.map((tag) => (
                  <span
                      key={tag}
                      className="text-stone-500"
                      style={{ fontSize: '11px', letterSpacing: '0.08em', background: '#F5F2ED', padding: '4px 10px', borderRadius: '2px' }}
                  >
                {tag}
              </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid #F0EDE8' }}>
              <div>
              <span
                  className="text-stone-900 font-semibold"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '20px' }}
              >
                {hotel.price.toLocaleString('fr-FR')}
              </span>
                <span className="text-stone-400 ml-1" style={{ fontSize: '12px' }}>FCFA / nuit</span>
              </div>
              <button
                  onClick={() => setShowModal(true)}
                  className="text-white font-medium uppercase transition-all duration-200 hover:opacity-90 active:scale-95"
                  style={{
                    background: '#0F172A', fontSize: '11px', letterSpacing: '0.12em',
                    padding: '10px 20px', borderRadius: '2px', border: 'none', cursor: 'pointer',
                  }}
              >
                Réserver
              </button>
            </div>
          </div>
        </div>

        {/* MODAL DE RESERVATION */}
        {showModal && (
            <div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)' }}
                onClick={() => !bookingSuccess && setShowModal(false)}
            >
              <div
                  className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto"
                  style={{ borderRadius: '4px' }}
                  onClick={(e) => e.stopPropagation()}
              >
                <div style={{ borderBottom: '1px solid #F0EDE8', padding: '24px 28px' }}>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-amber-600 uppercase mb-0.5" style={{ fontSize: '10px', letterSpacing: '0.2em' }}>
                        Réservation
                      </p>
                      <h3
                          className="text-stone-900"
                          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '20px', fontWeight: '600' }}
                      >
                        {hotel.name}
                      </h3>
                    </div>
                    {!bookingSuccess && (
                        <button
                            onClick={() => setShowModal(false)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                            className="text-stone-400 hover:text-stone-600"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                    )}
                  </div>
                </div>

                <div style={{ padding: '28px' }}>
                  {bookingSuccess ? (
                      <div className="text-center py-10">
                        <div
                            className="mx-auto mb-4 flex items-center justify-center"
                            style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#F0FDF4' }}
                        >
                          <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p
                            className="text-stone-900 font-semibold mb-1"
                            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '18px' }}
                        >
                          Réservation confirmée
                        </p>
                        <p className="text-stone-400 text-sm">Un email de confirmation vous a été envoyé.</p>
                      </div>
                  ) : (
                      <form onSubmit={handleBooking} className="space-y-5">
                        {[
                          { label: "Date d'arrivée", key: 'checkin' },
                          { label: 'Date de départ', key: 'checkout' },
                        ].map(({ label, key }) => (
                            <div key={key}>
                              <label
                                  className="block text-stone-500 uppercase mb-2"
                                  style={{ fontSize: '10px', letterSpacing: '0.15em' }}
                              >
                                {label}
                              </label>
                              <input
                                  type="date"
                                  value={bookingData[key as 'checkin' | 'checkout']}
                                  onChange={(e) => setBookingData({ ...bookingData, [key]: e.target.value })}
                                  className="w-full text-stone-700 text-sm outline-none"
                                  style={{ border: '1px solid #E7E3DC', padding: '10px 14px', borderRadius: '2px', background: '#FAFAF8' }}
                                  required
                              />
                            </div>
                        ))}

                        <div>
                          <label className="block text-stone-500 uppercase mb-2" style={{ fontSize: '10px', letterSpacing: '0.15em' }}>
                            Voyageurs
                          </label>
                          <select
                              value={bookingData.guests}
                              onChange={(e) => setBookingData({ ...bookingData, guests: e.target.value })}
                              className="w-full text-stone-700 text-sm outline-none"
                              style={{ border: '1px solid #E7E3DC', padding: '10px 14px', borderRadius: '2px', background: '#FAFAF8' }}
                          >
                            {['1', '2', '3', '4', '5', '6+'].map((n) => (
                                <option key={n} value={n}>{n} {n === '1' ? 'voyageur' : 'voyageurs'}</option>
                            ))}
                          </select>
                        </div>

                        <div style={{ background: '#FAFAF8', border: '1px solid #F0EDE8', padding: '16px', borderRadius: '2px' }}>
                          <p className="text-stone-500 text-sm mb-1">{hotel.name} · {hotel.category}</p>
                          <div style={{ borderTop: '1px solid #E7E3DC', paddingTop: '12px', marginTop: '8px' }}>
                            <p className="text-stone-500 uppercase mb-1" style={{ fontSize: '9px' }}>Prix par nuit</p>
                            <p
                                className="text-stone-900 font-semibold"
                                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '22px' }}
                            >
                              {hotel.price.toLocaleString('fr-FR')}{' '}
                              <span className="text-sm font-normal text-stone-400">FCFA</span>
                            </p>
                          </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full text-white font-medium uppercase transition-all duration-200 hover:opacity-90"
                            style={{
                              background: '#0F172A', padding: '14px', fontSize: '11px',
                              letterSpacing: '0.15em', borderRadius: '2px', border: 'none', cursor: 'pointer',
                            }}
                        >
                          Confirmer la réservation
                        </button>
                      </form>
                  )}
                </div>
              </div>
            </div>
        )}
      </>
  )
}

// ─── LandingPage ─────────────────────────────────────────────────────────────
export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [showAllHotels, setShowAllHotels] = useState(false)
  const [userBookings, setUserBookings] = useState<Array<{ hotelName: string; checkin: string; checkout: string; guests: string; date: string }>>([])
  const [showBookingsModal, setShowBookingsModal] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)

    const savedBookings = localStorage.getItem('userBookings')
    if (savedBookings) {
      setUserBookings(JSON.parse(savedBookings))
    }

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNewsletter = () => {
    if (!email || !email.includes('@')) return
    setEmailSent(true)
    setEmail('')
    setTimeout(() => setEmailSent(false), 4000)
  }

  const displayedHotels = showAllHotels ? hotels : hotels.slice(0, 3)

  const updateBookings = () => {
    const savedBookings = localStorage.getItem('userBookings')
    if (savedBookings) {
      setUserBookings(JSON.parse(savedBookings))
    }
  }

  useEffect(() => {
    const handleStorageChange = () => {
      updateBookings()
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return (
      <>
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@300;400;500&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Jost', sans-serif; margin: 0; padding: 0; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: opacity(0.4); cursor: pointer; }
        ::selection { background: #D4A853; color: white; }
        .fade-up { opacity: 0; transform: translateY(24px); animation: fadeUp 0.7s cubic-bezier(0.25,0.46,0.45,0.94) forwards; }
        @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
      `}</style>

        {/* ====== NAVBAR ====== */}
        <nav
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
            style={{
              background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
              backdropFilter: scrolled ? 'blur(20px)' : 'none',
              borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
              padding: scrolled ? '14px 0' : '22px 0',
            }}
        >
          <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
            <a href="/" className="flex items-center gap-3">
              <img
                  src={LOGO_SRC}
                  alt="Logo"
                  className="h-7 w-auto"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
              <span
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '22px', fontWeight: '500', letterSpacing: '0.25em',
                    color: scrolled ? '#0F172A' : '#FFFFFF', transition: 'color 0.3s',
                  }}
              >
              {LOGO_FALLBACK}
            </span>
            </a>

            <ul className="hidden md:flex items-center gap-10">
              {[['#hotels', 'Hôtels'], ['#offres', 'Offres'], ['#avis', 'Témoignages']].map(([href, label]) => (
                  <li key={href}>
                    <a
                        href={href}
                        style={{
                          color: scrolled ? '#57534E' : 'rgba(255,255,255,0.7)',
                          fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase',
                          transition: 'color 0.2s', fontWeight: '400',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = scrolled ? '#0F172A' : '#D4A853' }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = scrolled ? '#57534E' : 'rgba(255,255,255,0.7)' }}
                    >
                      {label}
                    </a>
                  </li>
              ))}
            </ul>

            <div className="hidden md:flex items-center gap-5">
              <button
                  onClick={() => setShowBookingsModal(true)}
                  style={{
                    color: scrolled ? '#57534E' : 'rgba(255,255,255,0.7)',
                    fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', transition: 'color 0.2s',
                    background: 'none', border: 'none', cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#D4A853' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = scrolled ? '#57534E' : 'rgba(255,255,255,0.7)' }}
              >
                Mes Réservations {userBookings.length > 0 && `(${userBookings.length})`}
              </button>
              <a
                  href="/register"
                  className="transition-all duration-200 hover:opacity-90"
                  style={{
                    background: '#D4A853', color: '#0F172A', fontSize: '10px', fontWeight: '500',
                    letterSpacing: '0.18em', textTransform: 'uppercase', padding: '10px 22px', borderRadius: '2px',
                  }}
              >
                Réserver
              </a>
            </div>

            <button
                className="md:hidden"
                style={{ color: scrolled ? '#0F172A' : '#FFFFFF', background: 'none', border: 'none', cursor: 'pointer' }}
                onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>

          {menuOpen && (
              <div className="md:hidden bg-white border-t px-8 py-6 flex flex-col gap-5" style={{ borderColor: '#F0EDE8' }}>
                {[['#hotels', 'Hôtels'], ['#offres', 'Offres'], ['#avis', 'Témoignages']].map(([href, label]) => (
                    <a
                        key={href}
                        href={href}
                        className="text-stone-500 hover:text-stone-900 transition-colors"
                        style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase' }}
                        onClick={() => setMenuOpen(false)}
                    >
                      {label}
                    </a>
                ))}
                <button
                    onClick={() => {
                      setShowBookingsModal(true)
                      setMenuOpen(false)
                    }}
                    className="text-stone-500 hover:text-stone-900 transition-colors text-left"
                    style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase' }}
                >
                  Mes Réservations {userBookings.length > 0 && `(${userBookings.length})`}
                </button>
                <a
                    href="/register"
                    className="text-center"
                    style={{
                      background: '#0F172A', color: 'white', fontSize: '11px',
                      letterSpacing: '0.15em', textTransform: 'uppercase', padding: '12px', borderRadius: '2px',
                    }}
                >
                  Réserver
                </a>
              </div>
          )}
        </nav>

        {/* ====== HERO ====== */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
                src={HERO_IMAGE}
                alt="Hero"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80'
                }}
            />
            <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to bottom, rgba(15,23,42,0.55) 0%, rgba(15,23,42,0.4) 50%, rgba(15,23,42,0.75) 100%)' }}
            />
          </div>

          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-3 mb-10 fade-up" style={{ animationDelay: '0.1s' }}>
              <div style={{ width: '32px', height: '1px', background: '#D4A853' }} />
              <span className="text-white/60 uppercase" style={{ fontSize: '10px', letterSpacing: '0.3em' }}>
              Collection Prestige 2025
            </span>
              <div style={{ width: '32px', height: '1px', background: '#D4A853' }} />
            </div>

            <h1
                className="text-white mb-6 fade-up"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(42px, 8vw, 88px)',
                  fontWeight: '300', lineHeight: '1.05', animationDelay: '0.2s',
                }}
            >
              L'Excellence au<br />
              <em style={{ color: '#D4A853' }}>Cœur de chaque</em><br />
              Séjour
            </h1>

            <p
                className="text-white/55 max-w-lg mx-auto mb-14 fade-up"
                style={{ fontSize: '15px', lineHeight: '1.8', fontWeight: '300', animationDelay: '0.35s' }}
            >
              Des hôtels d'exception soigneusement sélectionnés pour leur excellence.
              Une expérience unique vous attend à chaque destination.
            </p>

            <div className="flex justify-center gap-16 mt-16 fade-up" style={{ animationDelay: '0.55s' }}>
              {[{ val: '500+', label: 'Hôtels' }, { val: '80+', label: 'Pays' }, { val: '50k+', label: 'Clients' }].map((s) => (
                  <div key={s.label} className="text-center">
                    <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '30px', fontWeight: '300', color: '#D4A853' }}>
                      {s.val}
                    </p>
                    <p className="text-white/40 uppercase mt-0.5" style={{ fontSize: '9px', letterSpacing: '0.25em' }}>{s.label}</p>
                  </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-white/30 uppercase" style={{ fontSize: '9px', letterSpacing: '0.3em' }}>Défiler</span>
            <div
                className="animate-pulse"
                style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, rgba(212,168,83,0.6), transparent)' }}
            />
          </div>
        </section>

        {/* ====== STRIP ====== */}
        <section style={{ background: '#0F172A', padding: '20px 0' }}>
          <div className="max-w-7xl mx-auto px-8 flex items-center justify-center gap-8 flex-wrap">
            {['Meilleur prix garanti', 'Paiement 100% sécurisé', 'Support 24h/24', 'Annulation gratuite'].map((item, i) => (
                <div key={item} className="flex items-center gap-2.5">
                  {i > 0 && <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.1)' }} />}
                  <span className="text-white/50 uppercase" style={{ fontSize: '10px', letterSpacing: '0.18em' }}>{item}</span>
                </div>
            ))}
          </div>
        </section>

        {/* ====== HOTELS ====== */}
        <section id="hotels" style={{ background: '#FAFAF8', padding: '100px 0' }}>
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div style={{ width: '24px', height: '1px', background: '#D4A853' }} />
                  <span className="text-amber-600 uppercase" style={{ fontSize: '10px', letterSpacing: '0.22em' }}>Notre sélection</span>
                </div>
                <h2
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: '300', color: '#0F172A', lineHeight: '1.1',
                    }}
                >
                  Hôtels <em style={{ color: '#D4A853' }}>Disponibles</em>
                </h2>
                <p className="text-stone-400 mt-3 max-w-md" style={{ fontSize: '14px', lineHeight: '1.7' }}>
                  Des établissements d'exception choisis pour leur excellence et leur service irréprochable.
                </p>
              </div>
              <button
                  onClick={() => setShowAllHotels(!showAllHotels)}
                  className="mt-6 md:mt-0 transition-all duration-200 hover:bg-stone-900 hover:text-white"
                  style={{
                    color: '#0F172A', border: '1px solid #0F172A', fontSize: '10px', letterSpacing: '0.18em',
                    textTransform: 'uppercase', padding: '10px 24px', borderRadius: '2px', display: 'inline-block',
                    background: 'none', cursor: 'pointer',
                  }}
              >
                {showAllHotels ? 'Voir moins' : 'Voir tout'}
              </button>
            </div>

            {/* Grille modifiée : 3 colonnes par défaut (ratio 3:2) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedHotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          </div>
        </section>

        {/* ====== OFFRES ====== */}
        <section id="offres" style={{ background: '#FFFFFF', padding: '100px 0' }}>
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div style={{ width: '24px', height: '1px', background: '#D4A853' }} />
                <span className="text-amber-600 uppercase" style={{ fontSize: '10px', letterSpacing: '0.22em' }}>Promotions exclusives</span>
                <div style={{ width: '24px', height: '1px', background: '#D4A853' }} />
              </div>
              <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: '300', color: '#0F172A',
                  }}
              >
                Offres <em style={{ color: '#D4A853' }}>Spéciales</em>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {offers.map((offer) => (
                  <div
                      key={offer.title}
                      className="relative overflow-hidden cursor-pointer group"
                      style={{ height: '440px', borderRadius: '4px' }}
                  >
                    <img
                        src={offer.img}
                        alt={offer.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80'
                        }}
                    />
                    <div
                        className="absolute inset-0"
                        style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.2) 60%, transparent 100%)' }}
                    />
                    <div className="absolute inset-0 flex flex-col justify-between p-8">
                      <div
                          className="self-start"
                          style={{
                            background: '#D4A853', color: '#0F172A', fontSize: '10px', fontWeight: '600',
                            letterSpacing: '0.15em', textTransform: 'uppercase', padding: '5px 12px', borderRadius: '2px',
                          }}
                      >
                        {offer.badge}
                      </div>
                      <div>
                        <h3
                            className="text-white mb-2"
                            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '26px', fontWeight: '400' }}
                        >
                          {offer.title}
                        </h3>
                        <p className="text-white/60 mb-5" style={{ fontSize: '13px', lineHeight: '1.6' }}>{offer.desc}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-white/40" style={{ fontSize: '11px' }}>Expire le {offer.expires}</span>
                          <button
                              onClick={() => {
                                document.getElementById('hotels')?.scrollIntoView({ behavior: 'smooth' })
                              }}
                              style={{
                                color: '#D4A853', border: '1px solid #D4A853', fontSize: '10px',
                                letterSpacing: '0.15em', textTransform: 'uppercase', padding: '8px 18px',
                                borderRadius: '2px', transition: 'all 0.2s', background: 'transparent', cursor: 'pointer',
                              }}
                              onMouseEnter={(e) => { e.currentTarget.style.background = '#D4A853'; e.currentTarget.style.color = '#0F172A' }}
                              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#D4A853' }}
                          >
                            En profiter
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
              ))}
            </div>

            {/* Newsletter */}
            <div
                className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8 px-10 py-10"
                style={{ background: '#0F172A', borderRadius: '4px' }}
            >
              <div>
                <p className="text-amber-500/80 uppercase mb-1" style={{ fontSize: '9px', letterSpacing: '0.25em' }}>Newsletter exclusive</p>
                <h3
                    className="text-white"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '24px', fontWeight: '300' }}
                >
                  Recevez nos offres en avant-première
                </h3>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <input
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleNewsletter()}
                    className="text-white placeholder-white/30 outline-none"
                    style={{
                      background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                      padding: '12px 18px', borderRadius: '2px', fontSize: '14px', minWidth: '260px',
                    }}
                />
                <button
                    onClick={handleNewsletter}
                    className="transition-all duration-200 hover:opacity-90 whitespace-nowrap"
                    style={{
                      background: '#D4A853', color: '#0F172A', fontSize: '11px', fontWeight: '500',
                      letterSpacing: '0.15em', textTransform: 'uppercase', padding: '12px 24px',
                      borderRadius: '2px', border: 'none', cursor: 'pointer',
                    }}
                >
                  {emailSent ? '✓ Inscrit !' : "S'inscrire"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ====== AVIS ====== */}
        <section id="avis" style={{ background: '#FAFAF8', padding: '100px 0' }}>
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div style={{ width: '24px', height: '1px', background: '#D4A853' }} />
                <span className="text-amber-600 uppercase" style={{ fontSize: '10px', letterSpacing: '0.22em' }}>Témoignages</span>
                <div style={{ width: '24px', height: '1px', background: '#D4A853' }} />
              </div>
              <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: '300', color: '#0F172A',
                  }}
              >
                Ce que disent nos <em style={{ color: '#D4A853' }}>Clients</em>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                  <div
                      key={t.name}
                      className="bg-white p-8 transition-all duration-300"
                      style={{ borderRadius: '4px', border: '1px solid #F0EDE8' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.07)'
                        e.currentTarget.style.transform = 'translateY(-2px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = 'none'
                        e.currentTarget.style.transform = 'translateY(0)'
                      }}
                  >
                    <div className="flex gap-0.5 mb-5">
                      {[...Array(t.rating)].map((_, i) => (
                          <svg key={i} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                      ))}
                    </div>
                    <div
                        style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                          fontSize: '64px', color: '#D4A853', lineHeight: '0.5', marginBottom: '16px', opacity: 0.4,
                        }}
                    >
                      "
                    </div>
                    <p className="text-stone-500 mb-7" style={{ fontSize: '14px', lineHeight: '1.75' }}>{t.text}</p>
                    <div className="flex items-center gap-3 pt-5" style={{ borderTop: '1px solid #F0EDE8' }}>
                      <div
                          className="flex items-center justify-center text-amber-700 font-semibold shrink-0"
                          style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#FEF3C7', fontSize: '14px' }}
                      >
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-stone-900 font-medium" style={{ fontSize: '13px' }}>{t.name}</p>
                        <p className="text-stone-400" style={{ fontSize: '11px' }}>{t.country} · {t.hotel}</p>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== FOOTER ====== */}
        <footer style={{ background: '#0F172A', padding: '60px 0 30px' }}>
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row justify-between gap-10 mb-12">
              <div>
              <span
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '24px', fontWeight: '400', letterSpacing: '0.2em', color: 'white',
                  }}
              >
                {LOGO_FALLBACK}
              </span>
                <p className="text-white/30 mt-3 max-w-xs" style={{ fontSize: '13px', lineHeight: '1.7' }}>
                  Des expériences hôtelières d'exception, soigneusement sélectionnées pour les voyageurs exigeants.
                </p>
              </div>
              <div className="flex gap-16">
                {[
                  { title: 'Navigation', links: ['Hôtels', 'Offres', 'Témoignages'] },
                  { title: 'Compte', links: ['Connexion', 'Réserver', 'Support'] },
                ].map(({ title, links }) => (
                    <div key={title}>
                      <p className="text-white/40 uppercase mb-4" style={{ fontSize: '9px', letterSpacing: '0.2em' }}>{title}</p>
                      <ul className="space-y-2.5">
                        {links.map((l) => (
                            <li key={l}>
                              <a href="#" className="text-white/50 hover:text-white/90 transition-colors" style={{ fontSize: '13px' }}>{l}</a>
                            </li>
                        ))}
                      </ul>
                    </div>
                ))}
              </div>
            </div>
            <div
                className="flex flex-col md:flex-row justify-between items-center gap-4"
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px' }}
            >
              <p className="text-white/25" style={{ fontSize: '11px' }}>© 2025 IRMA. Tous droits réservés.</p>
              <div className="flex gap-6">
                {['Confidentialité', 'Mentions légales', 'CGU'].map((l) => (
                    <a key={l} href="#" className="text-white/25 hover:text-white/50 transition-colors" style={{ fontSize: '11px' }}>{l}</a>
                ))}
              </div>
            </div>
          </div>
        </footer>

        {/* MODAL DES RESERVATIONS */}
        {showBookingsModal && (
            <div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)' }}
                onClick={() => setShowBookingsModal(false)}
            >
              <div
                  className="bg-white w-full max-w-2xl max-h-[80vh] overflow-y-auto"
                  style={{ borderRadius: '4px' }}
                  onClick={(e) => e.stopPropagation()}
              >
                <div style={{ borderBottom: '1px solid #F0EDE8', padding: '24px 28px' }}>
                  <div className="flex justify-between items-center">
                    <h3
                        className="text-stone-900"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '24px', fontWeight: '600' }}
                    >
                      Mes Réservations
                    </h3>
                    <button
                        onClick={() => setShowBookingsModal(false)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                        className="text-stone-400 hover:text-stone-600"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div style={{ padding: '28px' }}>
                  {userBookings.length === 0 ? (
                      <div className="text-center py-10">
                        <p className="text-stone-400">Aucune réservation pour le moment.</p>
                        <button
                            onClick={() => {
                              setShowBookingsModal(false)
                              document.getElementById('hotels')?.scrollIntoView({ behavior: 'smooth' })
                            }}
                            className="mt-4 text-amber-600 hover:text-amber-700"
                            style={{ fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                          Réserver maintenant →
                        </button>
                      </div>
                  ) : (
                      <div className="space-y-4">
                        {userBookings.map((booking, index) => (
                            <div
                                key={index}
                                style={{
                                  border: '1px solid #F0EDE8',
                                  borderRadius: '4px',
                                  padding: '16px',
                                  background: '#FAFAF8'
                                }}
                            >
                              <h4 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                                {booking.hotelName}
                              </h4>
                              <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                  <p className="text-stone-400" style={{ fontSize: '11px' }}>Arrivée</p>
                                  <p className="text-stone-700">{new Date(booking.checkin).toLocaleDateString('fr-FR')}</p>
                                </div>
                                <div>
                                  <p className="text-stone-400" style={{ fontSize: '11px' }}>Départ</p>
                                  <p className="text-stone-700">{new Date(booking.checkout).toLocaleDateString('fr-FR')}</p>
                                </div>
                                <div>
                                  <p className="text-stone-400" style={{ fontSize: '11px' }}>Voyageurs</p>
                                  <p className="text-stone-700">{booking.guests}</p>
                                </div>
                                <div>
                                  <p className="text-stone-400" style={{ fontSize: '11px' }}>Réservé le</p>
                                  <p className="text-stone-700">{booking.date}</p>
                                </div>
                              </div>
                            </div>
                        ))}
                      </div>
                  )}
                </div>
              </div>
            </div>
        )}
      </>
  )
}