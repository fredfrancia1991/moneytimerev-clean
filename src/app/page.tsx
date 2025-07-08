'use client'
import { useState, useRef } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import styles from './page.module.css'

type FormNumbers = {
  revenus: number
  besoins: number
  loisirs: number
  epargneMensuelle: number
  epargneDisponible: number
}

type BudgetResult = {
  profile: string
  message: string
  essential: number
  leisure: number
  saving: number
  averageComparison: string
}

function getBudgetProfile({ revenus, besoins, loisirs, epargneMensuelle }: FormNumbers): BudgetResult {
  const essential = revenus ? (besoins / revenus) * 100 : 0
  const leisure = revenus ? (loisirs / revenus) * 100 : 0
  const saving = revenus ? (epargneMensuelle / revenus) * 100 : 0
  const total = essential + leisure + saving
  let profile = 'Départ à zéro'
  let message = 'Vous posez les bases. Ce diagnostic est un bon point de départ pour reprendre la main.'

  if (revenus === 0) {
    profile = 'Départ à zéro'
  } else if (total > 110 || total < 70) {
    profile = 'Flou budgétaire'
    message = 'La répartition actuelle est difficile à lire. Un accompagnement peut aider à y voir plus clair.'
  } else if (essential > 70 && saving < 5) {
    profile = 'Déséquilibre important'
    message = 'Vos dépenses vitales dépassent vos moyens. Il est urgent de poser un cadre simple et concret.'
  } else if (essential >= 55 && essential <= 70 && leisure > 30 && saving <= 5) {
    profile = 'Instable mais rattrapable'
    message = 'Le rythme est tendu. Quelques ajustements ciblés peuvent tout changer.'
  } else if (essential > 70 && saving >= 5) {
    profile = 'En phase de transition'
    message = 'Vous bougez les lignes. Il est temps de structurer vos efforts pour retrouver un cap.'
  } else if (saving > 15) {
    profile = 'Bonne base, à optimiser'
    message = 'Votre base est saine. Un regard extérieur peut renforcer votre marge de manœuvre.'
  } else {
    profile = 'Stabilité à renforcer'
    message = 'Vous tenez un bon cap. Consolidez vos habitudes pour plus de confort.'
  }

  return {
    profile,
    message,
    essential,
    leisure,
    saving,
    averageComparison: '40 % des foyers sont dans une situation similaire'
  }
}

export default function Home() {
  const [revenus, setRevenus] = useState('')
  const [besoins, setBesoins] = useState('')
  const [loisirs, setLoisirs] = useState('')
  const [epargneMensuelle, setEpargneMensuelle] = useState('')
  const [epargneDisponible, setEpargneDisponible] = useState('')
  const [result, setResult] = useState<BudgetResult | null>(null)
  const [loading, setLoading] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (result) {
      setResult(null)
      setRevenus('')
      setBesoins('')
      setLoisirs('')
      setEpargneMensuelle('')
      setEpargneDisponible('')
      return
    }
    setLoading(true)
    setTimeout(() => {
      const data: FormNumbers = {
        revenus: parseFloat(revenus) || 0,
        besoins: parseFloat(besoins) || 0,
        loisirs: parseFloat(loisirs) || 0,
        epargneMensuelle: parseFloat(epargneMensuelle) || 0,
        epargneDisponible: parseFloat(epargneDisponible) || 0
      }
      setResult(getBudgetProfile(data))
      setLoading(false)
      resultRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 2000)
  }

  const buttonLabel = result ? 'Refaire le diagnostic' : 'Commencer le diagnostic gratuit'

  return (
    <div className="bg-[#F5F6FA] min-h-screen flex flex-col font-sans text-[#26436E]">
      <Header />
      <main className="flex-1 px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
          <div>
            <label className="font-semibold" htmlFor="revenus">Revenus mensuels</label>
            <input id="revenus" name="revenus" type="number" value={revenus} onChange={e => setRevenus(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" />
          </div>
          <div>
            <label className="font-semibold" htmlFor="besoins">Dépenses essentielles</label>
            <input id="besoins" name="besoins" type="number" value={besoins} onChange={e => setBesoins(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" />
          </div>
          <div>
            <label className="font-semibold" htmlFor="loisirs">Dépenses de confort</label>
            <input id="loisirs" name="loisirs" type="number" value={loisirs} onChange={e => setLoisirs(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" />
          </div>
          <div>
            <label className="font-semibold" htmlFor="epargneMensuelle">Épargne mensuelle</label>
            <input id="epargneMensuelle" name="epargneMensuelle" type="number" value={epargneMensuelle} onChange={e => setEpargneMensuelle(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" />
          </div>
          <div>
            <label className="font-semibold" htmlFor="epargneDisponible">Épargne disponible</label>
            <input id="epargneDisponible" name="epargneDisponible" type="number" value={epargneDisponible} onChange={e => setEpargneDisponible(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" />
          </div>
          <button type="submit" className="w-full bg-[#187072] text-white font-bold py-3 rounded-xl">
            {buttonLabel}
          </button>
        </form>

        {loading && (
          <div ref={resultRef} className="mt-6 text-center">
            <p>Analyse de votre situation en cours…</p>
            <div className="mt-4 flex justify-center">
              <span className={styles.loader}></span>
            </div>
          </div>
        )}

        {result && !loading && (
          <div ref={resultRef} className={`${styles.resultCard} mt-6 max-w-xl mx-auto text-[#363945]`}>
            <h2 className="text-xl font-bold text-[#26436E] mb-2">{result.profile}</h2>
            <p className="mb-2">Essentiel : {result.essential.toFixed(0)} %<br />Loisirs : {result.leisure.toFixed(0)} %<br />Épargne : {result.saving.toFixed(0)} %</p>
            <p className="mb-2">{result.message}</p>
            <p className="mb-2">{result.averageComparison}</p>
            <p className={`${styles.coachingSuggestion} text-base`}>Ce premier bilan vous donne des clés. Pour aller plus loin, un accompagnement personnalisé peut faire la différence.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>  )
}

