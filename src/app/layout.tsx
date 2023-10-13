import AuthContext from "@/context/AuthContext";
import "./globals.css";
import { Inter, Open_Sans } from "next/font/google";
import QueryProvierContext from "@/context/QueryProvider";
import Header from "@/components/Header";
import RecoilContext from "@/context/RecoilContext";

export const metadata = {
  title: {
    default: "PLANT",
    template: "PLANT | %s",
  },
  description: "PLANT",
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
            <RecoilContext>
              <Header />
              {children}
            </RecoilContext>
          </QueryProvierContext>
        </AuthContext>
        <div id="portal" />
      </body>
    </html>
  );
}
