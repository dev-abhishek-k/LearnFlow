import PublicNavbar from "@/components/common/navbar/public/PublicNavbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <PublicNavbar />

      <main>
        {children}
      </main>
    </div>
  );
}