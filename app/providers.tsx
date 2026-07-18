"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ToastContainer position="bottom-right" theme="dark" />
    </QueryClientProvider>
  );
}
