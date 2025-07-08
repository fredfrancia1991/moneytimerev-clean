import '../globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto p-4 mt-6">{children}</main>
      <Footer />
    </>
  )
}
