import { ArrowDownIcon } from "lucide-react";   // Importa o ícone de seta para baixo da biblioteca lucide-react

export const HeroSection = () => {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex flex-col items-center justify-center px-4"
        >
            <div className="container max-w-4xl mx-auto text-center z-10">
                <div className="space-y-6">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        <span className="opacity-0 animate-fade-in">Bem-Vindo à</span>
                        <span className="text-primary opacity-0 animate-fade-in-delay-1">
                            {" "}
                            BeMove
                        </span>
                    </h1>
                    <p className="text-ld md:tex-lx text-muted-forreground max-w-3xl mx-auto opacity-0 animate-fade-in-delay-2">

                        A Be Move Fisioterapia é um espago aonde quero
                        estimular a promogdo em saulde através da Pratica
                        de Movimento.

                        Através de estimulos de movimento, quero
                        encorajar meus pacientes e clientes a retomarem
                        as suas atividades de vida diaria.
                    </p>
                    <div className="pt-4 opacity-0 animate-fade-in-delay-4">
                        <a href="#contact" className="cosmic-button">
                            Contato
                        </a>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
                <span className="text-sm text-muted-foreground mb-2">
                    Scroll
                </span>
                <ArrowDownIcon className="h-5 w-5 text-primary" />
            </div>
        </section>
    );
};