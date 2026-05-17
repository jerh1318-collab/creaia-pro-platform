import "../styles.css";

export const metadata = {
  title: "CreaIA Pro",
  description: "Plataforma automática de documentos, CVs y dashboards",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
