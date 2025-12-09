import React from 'react';
import { Navbar } from "../components/Navbar";
import { AgendamentoSection } from '../components/AgendamentoSection';
import { Footer } from '../components/Footer';

export const Agendamento = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden flex flex-col">
      <Navbar />
      <div className="pt-20 flex-1">
        <main className="min-h-[calc(100vh-80px)]">
          <AgendamentoSection />
        </main>
      </div>
      <Footer />
    </div>
  );
};