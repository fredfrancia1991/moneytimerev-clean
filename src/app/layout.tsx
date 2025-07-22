import './globals.css'
import { Nunito } from 'next/font/google'
import CookieBanner from '@/components/CookieBanner'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-nunito',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={nunito.variable}>
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
