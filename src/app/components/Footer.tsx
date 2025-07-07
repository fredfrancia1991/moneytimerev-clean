export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#e6e6e6] shadow-inner text-[#888] text-sm mt-16 py-6">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-2">
        <div className="flex gap-3 text-[#187072] font-semibold">
          <a href="/mentions-legales" className="hover:bg-[#f3f7fd] px-3 py-1 rounded">Mentions légales</a>
          <a href="/politique-confidentialite" className="hover:bg-[#f3f7fd] px-3 py-1 rounded">Confidentialité</a>
        </div>
        <div className="text-[#b3b3b3] text-center">
          &copy; 2025 MoneyTime Rev’ — Tous droits réservés.
        </div>
      </div>
    </footer>
  )
}
