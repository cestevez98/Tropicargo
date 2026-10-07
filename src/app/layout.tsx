import type { ReactNode } from "react";
import "./globals.css";

// El layout real (con <html> y <body>) está en src/app/[locale]/layout.tsx.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
