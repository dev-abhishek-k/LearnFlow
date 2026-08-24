import "./globals.css";
import QueryProvider from "@/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          {children}
          <Toaster
           position="top-right"
            richColors
            closeButton
            duration={3000}
              toastOptions={{
    classNames: {
      toast: "bg-slate-900! text-white! border-slate-700!",
    },
  }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}