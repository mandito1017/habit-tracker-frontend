import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "./components/ReduxProvider";;

export const metadata: Metadata = {
  title: "HabitFlow — Seguimiento de Hábitos",
  description: "Forma hábitos poderosos en 66 días.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
