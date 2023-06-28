import "./globals.css";
import { Inter } from "next/font/google";
import PageHeader from "@/components/page-header";

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
        <div className="flex flex-col w-screen min-h-screen">
          <PageHeader />
          <div className="h-full flex-grow pt-[6rem]">{children}</div>
          <footer className="flex justify-center items-center p-4 bg-base-300 text-base-content flex-shrink mt-8">
            <div>
              <p>Copyright © 2023 - All right reserved by TabooProject</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
