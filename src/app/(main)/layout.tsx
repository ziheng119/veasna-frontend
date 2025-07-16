import TopNav from "@/components/shared/TopNav";
import AuthWrapper from "../wrappers/AuthWrapper";
import Footer from "@/components/shared/Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthWrapper>
        <TopNav />
          <main className="mx-10 my-6">
            {children}
          </main>
        <Footer />
      </AuthWrapper>
    </>
  );
}
