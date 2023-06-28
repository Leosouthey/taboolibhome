import "./globals.css";
import { Inter } from "next/font/google";
import TabooHeader from "@/components/taboo-header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TabooLib",
  description: "TODO",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TabooHeader />
        <div className="h-full flex-grow">{children}</div>
        <footer className="footer footer-center p-4 bg-base-300 text-base-content flex-shrink mt-8">
          <div>
            <p>Copyright © 2023 - All right reserved by TabooProject</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
