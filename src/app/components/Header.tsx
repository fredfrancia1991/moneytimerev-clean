"use client"
import Link from 'next/link'
import styles from '../Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <span className={styles.logo}>MoneyTime <span className={styles.rev}>Rev’</span></span>
        <div>
          <Link className={styles.link} href="/">Accueil</Link>
          <Link className={styles.link} href="/offres">Offres</Link>
          <Link className={styles.link} href="/contact">Contact</Link>
          <Link className={styles.link} href="/mentions-legales">Mentions légales</Link>
        </div>
      </nav>
    </header>
  )
}