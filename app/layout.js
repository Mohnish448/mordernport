import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mohnish // Python Developer & AI Enthusiast | Kinetic 3D Portfolio",
  description: "Python developer and AI enthusiast passionate about building intelligent applications, Generative AI, and Agentic AI.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#020408",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-black text-white overflow-x-hidden w-full selection:bg-sky-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}