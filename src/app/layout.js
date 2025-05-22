import { Roboto } from "next/font/google";
import "./globals.css";

const font = Roboto({
  variable: "--font",
  subsets: ["latin"],
});

export const metadata = {
  title: "Atividade Avaliativa",
  description: "Prova de front end",
  icons: {
    icon: "/icons/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${font.variable} `}>
        {children}
      </body>
    </html>
  );
}
