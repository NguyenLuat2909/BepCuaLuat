import React from "react";
import Nav from "./Nav";

interface LayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
}

export default function Layout({ children, hideNav = false }: LayoutProps) {
  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#FAF4F1" }}>
      {!hideNav ? <Nav /> : null}
      <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 md:py-10">
        {children}
      </main>
      <footer className="mx-auto w-full max-w-7xl px-4 py-8 text-center text-xs text-[#9F6C3E]/70 md:px-6">
        <p className="font-playfair-display text-sm italic">
          Bếp của Luật — Nấu ăn là yêu thương ✿
        </p>
      </footer>
    </div>
  );
}
