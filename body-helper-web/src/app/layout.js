import { Inter } from "next/font/google";
import "./globals.scss";
import Header from "../components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/Footer";
import SessionProvider from "../components/SessionProvider.jsx";
const inter = Inter({ subsets: ["latin"] });
import { ToastContainer, toast } from "react-toastify";
export const metadata = {
  title: "Body Helper",
  description: "Transform Your Life: Join Our Fitness Revolution",
  keywords: [
    "Fitness",
    "Nutrition",
    "Diets",
    "Training",
    "Bodybuilding",
    "Healthy",
    "Calories",
  ],
  creator: "Ivan Balinov",
};

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Header />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <main>{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
