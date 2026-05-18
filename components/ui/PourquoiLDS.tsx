const items = [
  { ico: '💰', titre: 'Tarifs fixes sans surprise', desc: 'Devis gratuit avant toute intervention. Le prix annoncé est le prix payé.' },
  { ico: '🤝', titre: 'Interlocuteur dédié', desc: 'Un accompagnement 100% personnalisé. Ludovic répond directement.' },
  { ico: '💳', titre: 'Paiement en plusieurs fois', desc: 'Dès 100€ par carte bancaire, sans frais cachés.' },
  { ico: '🛡️', titre: "Jusqu'à 3 ans de garantie", desc: 'Sur les pièces et la main d\'œuvre pour tous vos achats et réparations.' },
]

export default function PourquoiLDS() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="section-tag">Pourquoi nous choisir</span>
          <h2 className="section-title">LDS INFORMATIK,<br />c'est différent</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(item => (
            <div key={item.titre} className="text-center p-6 rounded-2xl border border-gray-100 hover:border-[#004AAD]/20 hover:shadow-md transition-all">
              <div className="text-4xl mb-4">{item.ico}</div>
              <h3 className="font-bold text-gray-900 mb-2">{item.titre}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
