// src/app/(main)/layout.tsx

import TopNav from "@/components/shared/TopNav";
import AuthWrapper from "../wrappers/AuthWrapper";
import Footer from "@/components/shared/Footer";
import { getLocations } from "@/lib/api/location/getLocations";
import { Location } from "@/lib/types/location";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const locations: Location[] = await getLocations();

  return (
    <>
      <AuthWrapper>
        <TopNav locations={locations}/>
          <main className="flex-1">
            {children}
          </main>
        <Footer />
      </AuthWrapper>
    </>
  );
}
