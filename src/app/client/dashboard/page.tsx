"use client"
export const dynamic = "force-dynamic"

import Tabs, { Tab } from '@/components/Tabs'

export default function ClientDashboard() {
  const tabs: Tab[] = [
    { label: 'Vue globale', content: <p>&lt;courbes d\'évolution&gt;</p> },
    { label: 'Mon mois', content: <p>&lt;analyse du mois en euros&gt;</p> },
    { label: 'Mon relevé', content: <p>&lt;liste des opérations&gt;</p> },
    { label: 'Mes comptes', content: <p>&lt;gestion des comptes&gt;</p> },
    { label: 'Suivi coaching', content: <p>&lt;progression coaching&gt;</p> },
  ]

  return <Tabs tabs={tabs} />
}
