import Header from '../components/Header'
import Footer from '../components/Footer'

export default function MentionsLegales() {
  return (
    <>
      <Header />
      <main style={{
        maxWidth: 720,
        margin: '48px auto 32px auto',
        padding: '0 16px',
        fontFamily: "'Nunito', Arial, sans-serif",
        color: '#363945',
      }}>
        <h1 style={{
          color: '#26436E',
          fontWeight: 900,
          fontSize: '2em',
          marginBottom: 30,
          textAlign: 'center',
        }}>
          Mentions légales
        </h1>
        <section style={{
          background: '#fff',
          borderRadius: 12,
          padding: 24,
          boxShadow: '0 2px 12px rgba(38,67,110,0.07)',
          fontSize: '1.04em',
          lineHeight: 1.7,
        }}>
          <strong>Éditeur du site</strong><br />
          MoneyTime Rev’<br />
          Responsable de la publication : Frédéric Francia<br />
          Contact : contact@moneytimerev.fr
          <br /><br />
          <strong>Hébergement</strong><br />
          Google Cloud Platform<br />
          8 rue de Londres, 75009 Paris, France
          <br /><br />
          <strong>Propriété intellectuelle</strong><br />
          L’ensemble de ce site relève de la législation française et internationale sur le droit d’auteur et la propriété intellectuelle. Toute reproduction totale ou partielle est interdite sans autorisation expresse.
          <br /><br />
          <strong>Protection des données personnelles</strong><br />
          Les informations recueillies via les formulaires sont réservées à l’usage exclusif de MoneyTime Rev’. Conformément à la loi “Informatique et Libertés”, vous disposez d’un droit d’accès, de rectification et de suppression de vos données.
        </section>
      </main>
      <Footer />
    </>
  )
}