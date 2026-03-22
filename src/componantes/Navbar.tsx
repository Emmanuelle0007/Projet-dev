import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
            <span className="text-navy font-bold text-sm">L</span>
          </div>
          <span className="text-white font-display text-xl tracking-widest uppercase">LuxeStay</span>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8 text-sm text-white/70 tracking-wider uppercase">
          <li><a href="#hotels" className="hover:text-gold transition-colors">Hôtels</a></li>
          <li><a href="#offres" className="hover:text-gold transition-colors">Offres</a></li>
          <li><a href="#avis" className="hover:text-gold transition-colors">Avis</a></li>
          <li><a href="#contact" className="hover:text-gold transition-colors">Contact</a></li>
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="/login" className="text-white/70 text-sm hover:text-gold transition-colors tracking-wider uppercase">Connexion</a>
          <a href="/register" className="bg-gold text-navy text-sm font-semibold px-5 py-2 rounded-full hover:bg-gold/90 transition-colors tracking-wider uppercase">
            Réserver
          </a>
        </div>

        {/* Mobile burger */}
        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-navy border-t border-gold/20 px-6 py-4 flex flex-col gap-4 text-sm text-white/80 uppercase tracking-wider">
          <a href="#hotels" className="hover:text-gold">Hôtels</a>
          <a href="#offres" className="hover:text-gold">Offres</a>
          <a href="#avis" className="hover:text-gold">Avis</a>
          <a href="#contact" className="hover:text-gold">Contact</a>
          <a href="/login" className="hover:text-gold">Connexion</a>
          <a href="/register" className="bg-gold text-navy font-bold px-4 py-2 rounded-full text-center">Réserver</a>
        </div>
      )}
    </nav>
  )
}
