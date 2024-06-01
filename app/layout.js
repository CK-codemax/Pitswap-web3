import { Inter } from "next/font/google";
import "./globals.css";
import { cookieToInitialState } from 'wagmi'
import { config } from "./contexts/wagmi";
import Web3ModalProvider from "./contexts/WagmiContext";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pitbull",
  description: "This is the pitbull site for transfers of crypto currencies",
};

export default function RootLayout({ children }) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))
  return (
    <html lang="en">
      <body className={inter.className}>
      <Web3ModalProvider initialState={initialState}>{children}</Web3ModalProvider>
      </body>
    </html>
  );
}
