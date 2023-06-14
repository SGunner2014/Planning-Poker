import { Navbar } from "@/components/Navbar";
import { AppProvider } from "@/context/AppContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <div className="h-screen flex flex-col flex-wrap">
        <Navbar />
        <div className="flex-1">
          <Component {...pageProps} />
        </div>
      </div>
    </AppProvider>
  );
}
