import { Montserrat, Cormorant_Garamond, Nunito_Sans } from "next/font/google";

export const montserrat = Montserrat({
  weight: ["200", "400", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant",
});

export const nunito = Nunito_Sans({
  weight: ["200", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-nunito",
});