import AuthContext from "@/context/AuthContext";
import "./globals.css";
import { Inter, Open_Sans } from "next/font/google";
import QueryProvierContext from "@/context/QueryProvider";
import Header from "@/components/Header";

export const metadata = {
  title: {
    default: "GF",
    template: "GF | %s",
  },
  description: "GF",
  icons: {
    icon: "/favicon.ico",
  },
};

const sans = Open_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ scrollbarGutter: "stable", overflowY: "scroll" }}>
      <body className={`${sans.className}`}>
        <AuthContext>
          <QueryProvierContext>
            <Header />
            {children}
          </QueryProvierContext>
        </AuthContext>
        <div id="portal" />
      </body>
    </html>
  );
}
