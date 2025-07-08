import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Confidentialite() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto p-4 mt-6 text-[#363945]">
        <h1 className="text-2xl font-bold text-center text-[#26436E] mb-6">Politique de confidentialité</h1>
        <p className="mb-4">Les informations recueillies sont destinées uniquement à MoneyTime Rev’ pour le suivi des demandes.</p>
        <p className="mb-4">Vous disposez d’un droit d’accès, de rectification et de suppression de vos données en nous contactant à l’adresse indiquée.</p>
        <p>Ces données ne sont en aucun cas cédées ou vendues à des tiers.</p>
      </main>
      <Footer />
    </>
  );
}
