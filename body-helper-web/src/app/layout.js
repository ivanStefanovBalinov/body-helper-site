import { Inter } from "next/font/google";
import "./globals.scss";
import Header from "../components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "@/components/Footer";
import SessionProvider from "../components/SessionProvider.jsx";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Body Helper",
  description: "Transform Your Life: Join Our Fitness Revolution",
};

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Header />
          <main>{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
