
import "./globals.css";
import { Roboto_Slab, Rancho } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import NavbarLayout from "@/components/NavbarLayout";

const fontRobotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto-slab",
});

const fontRancho = Rancho({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-rancho",
});

export const metadata = {
  title: "KC Boots",
  description: "Autenticas botas vaqueras hechas a mano",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${fontRobotoSlab.className} ${fontRancho.variable}`}>
        <AuthProvider>
          <NavbarLayout>{children}</NavbarLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
