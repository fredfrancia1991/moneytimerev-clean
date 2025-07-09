// app/admin/utilisateurs/[uid]/page.tsx
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'

type Props = {
  params: {
    uid: string
  }
}

export default function AdminUserDetail({ params }: Props) {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto p-4 mt-6">
        <h1 className="text-2xl font-bold text-[#26436E] mb-4">
          Fiche utilisateur : {params.uid}
        </h1>
        <p>Détails du client à venir...</p>
      </main>
      <Footer />
    </>
  )
}