import type { Metadata, Viewport } from "next";
import { designFontVariables } from "@/lib/design-fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "airbnb 风格 · 设计系统验收",
  description:
    "单一 DESIGN.md 来源的设计系统：设计 tokens、可复用组件与 Next.js starter。待验收，尚未保存为 skill。",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className={`bg-background ${designFontVariables}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
