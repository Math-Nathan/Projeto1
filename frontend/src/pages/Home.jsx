import { Navbar } from "../components/Navbar";
import { ThemeToggle } from "../components/ThemeToggle";
import { HeroSection } from "../components/HeroSection";
import { AbouteSection } from "../components/AbouteSection";
import { MetodosSection } from "../components/MetodosSection";
import { ServicosSection } from "../components/ServicosSection";
//import { StarBackground } from "@/components/StarBackground";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";

export const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Botão para alternar entre tema claro/escuro */}
      <ThemeToggle />
      {/* Fundo estrelado (comentado por enquanto) */}
      {/* <StarBackground /> */}

      {/* Menu de navegação */}
      <Navbar />

      {/* Main Content */}
      {/* Aqui vai o conteúdo específico da Home */}
      <main>
        <HeroSection />  
        <AbouteSection />
        <MetodosSection />
        <ServicosSection />
        <ContactSection />
        <Footer />
      </main> 
    </div>
  );
};