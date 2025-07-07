// Exemple propre pour intégrer une Google Font :
import { Nunito } from 'next/font/google';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-nunito',
});

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${nunito.variable}`}>
      <body>{children}</body>
    </html>
  );
}
