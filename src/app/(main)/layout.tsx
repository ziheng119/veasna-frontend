import TopNav from "@/components/shared/TopNav";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopNav />
      <main className="mx-10 my-6">
        {children}
      </main>
    </>
  );
}
