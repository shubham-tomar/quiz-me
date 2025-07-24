"use client";

import { Sidebar } from "@/components/layout/sidebar";
// import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { ProtectedRoute } from "@/components/auth/protected-route";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col md:flex-row">
        <Sidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="border-b bg-background/95 backdrop-blur">
            <div className="container flex h-16 items-center justify-between">
              {/* <MobileSidebar /> */}
              <div className="flex-1"></div>
            </div>
          </header>
          
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
