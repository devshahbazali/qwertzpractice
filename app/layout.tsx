import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "qwertz-practice",
  description: "app to practice typing on qwertz keyboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
