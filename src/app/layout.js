import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Prompt",
  description: "Bedarfe erkennen, Maßnahmen entwickeln und Lernen unterstützen.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>
        <header className="app-header">
          <div className="header-inner">
            <Link href="/" className="brand">
              PROMPT
            </Link>

            <nav className="main-nav">
              <Link href="/melden">Melden</Link>
              <Link href="/">Verstehen</Link>
              <Link href="/handeln">Handeln</Link>
              <Link href="/lernen">Lernen</Link>
            </nav>

            <Link href="/ueber-prompt" className="about-link">
              Über Prompt
            </Link>


            <Link
    href="/datenschutz"
    className="privacy-link"
    aria-label="Datenschutz"
    title="Datenschutz"
  >
    ⓘ
  </Link>
          </div>
        </header>

        <div className="app-content">{children}</div>
      </body>
    </html>
  );
}