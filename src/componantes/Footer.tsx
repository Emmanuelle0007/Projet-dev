export default function Footer() {
  return (
    <footer id="contact" className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                <span className="text-navy font-bold text-sm">L</span>
              </div>
              <span className="font-display text-xl tracking-widest uppercase">LuxeStay</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              L'excellence au cœur de chaque séjour. Réservez vos hôtels de luxe en toute sérénité.
            </p>
            <div className="flex gap-3 mt-6">
              {['Facebook', 'Instagram', 'Twitter'].map(s => (
                <a key={s} href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-xs text-white/60 hover:bg-gold hover:text-navy transition-colors">
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-gold text-xs tracking-[0.3em] uppercase mb-4">Destination</h4>
            <ul className="space-y-2 text-white/50 text-sm">
              {['Paris', 'Dakar', 'Dubai', 'Marrakech', 'New York'].map(d => (
                <li key={d}><a href="#" className="hover:text-gold transition-colors">{d}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gold text-xs tracking-[0.3em] uppercase mb-4">Services</h4>
            <ul className="space-y-2 text-white/50 text-sm">
              {['Réservation', 'Offres spéciales', 'Conciergerie', 'Transfert', 'Assurance'].map(s => (
                <li key={s}><a href="#" className="hover:text-gold transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gold text-xs tracking-[0.3em] uppercase mb-4">Contact</h4>
            <ul className="space-y-3 text-white/50 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-gold mt-0.5">📍</span>
                123 Avenue de l'Excellence, Paris, France
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold">📞</span>
                +33 1 23 45 67 89
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold">✉️</span>
                contact@luxestay.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
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
