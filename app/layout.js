import "./globals.css";

const SITE_URL = "https://top-sunglass-catalogo.vercel.app";
const DESCRIPTION =
  "Catálogo TOP Sunglass — modelos em acetato premium e metal, do clássico ao esportivo. Preços e pedidos direto no WhatsApp.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "TOP Sunglass — Catálogo",
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "TOP Sunglass",
    title: "TOP Sunglass — Catálogo",
    description: DESCRIPTION,
    images: ["/images/p9_performance.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "TOP Sunglass — Catálogo",
    description: DESCRIPTION,
    images: ["/images/p9_performance.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,500&family=Manrope:wght@400;500;600;700;800&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
