import LOGO_SRC from '../assets/logo.png'


const LOGO_FALLBACK = 'LuxeStay'

export default function Footer() {
  return (
    <footer id="contact" className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <a href="/" className="flex items-center gap-2 mb-4">
              <img
                src={LOGO_SRC}
                alt="Logo"
                className="h-8 w-auto"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
              <span className="font-display text-xl tracking-widest uppercase">{LOGO_FALLBACK}</span>
            </a>
            <p className="text-white/50 text-sm leading-relaxed">
              L'excellence au coeur de chaque séjour. Réservez vos hôtels de luxe en toute sérénité.
            </p>
            <div className="flex gap-3 mt-6">
              {[
                { label: 'Facebook', href: 'https://facebook.com' },
                { label: 'Instagram', href: 'https://instagram.com' },
                { label: 'Twitter', href: 'https://twitter.com' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-xs text-white/60 hover:bg-gold hover:text-navy transition-colors font-bold"
                >
                  {s.label[0]}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-gold text-xs tracking-[0.3em] uppercase mb-4">Destinations</h4>
            <ul className="space-y-2 text-white/50 text-sm">
              {['Paris', 'Dakar', 'Dubai', 'Marrakech', 'New York'].map(d => (
                <li key={d}>
                  <a href="#hotels" className="hover:text-gold transition-colors">{d}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gold text-xs tracking-[0.3em] uppercase mb-4">Services</h4>
            <ul className="space-y-2 text-white/50 text-sm">
              {[
                { label: 'Réservation', href: '/register' },
                { label: 'Offres spéciales', href: '#offres' },
                { label: 'Conciergerie', href: '#contact' },
                { label: 'Transfert', href: '#contact' },
                { label: 'Assurance', href: '#contact' },
              ].map(s => (
                <li key={s.label}>
                  <a href={s.href} className="hover:text-gold transition-colors">{s.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gold text-xs tracking-[0.3em] uppercase mb-4">Contact</h4>
            <ul className="space-y-3 text-white/50 text-sm">
              <li>123 Avenue de l'Excellence, Paris, France</li>
              <li>
                <a href="tel:+33123456789" className="hover:text-gold transition-colors">+33 1 23 45 67 89</a>
              </li>
              <li>
                <a href="mailto:contact@luxestay.com" className="hover:text-gold transition-colors">contact@luxestay.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-xs">
          <span>© 2025 LuxeStay. Tous droits réservés.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-gold transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-gold transition-colors">CGV</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
