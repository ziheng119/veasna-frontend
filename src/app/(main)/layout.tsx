import TopNav from "@/components/TopNav";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body> 
        <TopNav />
        <main className="mx-10 my-6">
          {children}
        </main>
      </body>
    </html>
  );
}
