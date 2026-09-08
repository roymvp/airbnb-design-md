import { Inter, Noto_Sans_SC } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
// CJK-capable system fonts take precedence; segmented self-hosted fonts cover Linux without CJK fonts.
const chinese = Noto_Sans_SC({
  variable: "--font-cjk",
  display: "swap",
  preload: false,
});

export const designFontVariables = `${inter.variable} ${chinese.variable}`;
