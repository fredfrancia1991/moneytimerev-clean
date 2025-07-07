import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './offres.module.css';

export default function Offres() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Nos offres d’accompagnement</h1>

        <section className={styles.cards}>
          <article className={styles.card}>
            <h2>Formule 3 mois</h2>
            <ul>
              <li>3 rendez-vous individuels (1h/mois)</li>
              <li>Accès à l’outil pendant 6 mois</li>
              <li>Synthèse écrite après chaque séance</li>
            </ul>
            <div className={styles.price}><strong>49 €/mois</strong></div>
            <div className={styles.badge}>Tarif solidaire disponible</div>
          </article>

          <article className={styles.card}>
            <h2>Formule 6 mois</h2>
            <ul>
              <li>6 rendez-vous individuels (1h/mois)</li>
              <li>Accès à l’outil pendant 12 mois</li>
              <li>Synthèse écrite après chaque séance</li>
            </ul>
            <div className={styles.price}><strong>39 €/mois</strong></div>
            <div className={styles.badge}>Tarif solidaire sur demande</div>
          </article>

          <article className={styles.card}>
            <h2>Cycle collectif « Solutions Budget »</h2>
            <ul>
              <li>1 atelier collectif par semaine</li>
              <li>Partage d’astuces concrètes, motivation</li>
            </ul>
            <div className={styles.price}><strong>19 €/mois</strong></div>
            <div className={styles.badgeLight}>Premier RDV offert</div>
          </article>
        </section>

        <section className={styles.tableSection}>
          <h3 className={styles.tableTitle}>Tableau récapitulatif</h3>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th></th>
                  <th>3 mois</th>
                  <th>6 mois</th>
                  <th>Collectif</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>RDV individuels mensuels</td>
                  <td>✔️</td>
                  <td>✔️</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Synthèse écrite</td>
                  <td>✔️</td>
                  <td>✔️</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Accès à l’outil Google Sheet</td>
                  <td>6 mois</td>
                  <td>12 mois</td>
                  <td>Pendant le cycle</td>
                </tr>
                <tr>
                  <td>Tarif solidaire</td>
                  <td>✔️</td>
                  <td>✔️</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Ateliers collectifs</td>
                  <td></td>
                  <td></td>
                  <td>✔️</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className={styles.note}>
            Premier rendez-vous offert pour choisir la formule adaptée.<br />
            L’outil MoneyTime Rev’ reste accessible après le suivi individuel.<br />
            Le tarif solidaire est réservé aux personnes en difficulté, sur simple demande.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}