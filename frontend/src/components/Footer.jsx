import { Link } from "react-router-dom";

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-card border-t border-border py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Logo e direitos autorais */}
                    <div className="flex items-center space-x-4 mb-4 md:mb-0">
                        <div className="bg-white dark:bg-gray-100 rounded-lg px-3 py-2 shadow-md">
                            <img 
                                src="/images/logo.png" 
                                alt="BeMove Fisioterapia" 
                                className="h-12 w-auto object-contain"
                            />
                        </div>
                        <div className="h-6 w-px bg-border"></div>
                        <div className="text-sm text-muted-foreground">
                            &copy; {currentYear} BeMove Fisioterapia. Todos os direitos reservados.
                        </div>
                    </div>

                    {/* Desenvolvedores */}
                    <div className="text-center md:text-right">
                        <span className="text-sm text-muted-foreground">
                            Desenvolvido por 
                            <span className="text-primary font-medium ml-1">
                                @DiegoA1962
                            </span>
                            <span className="text-primary font-medium ml-1">
                                @felipe6061
                            </span>
                            <span className="text-primary font-medium ml-1">
                                @Math-Nathan
                            </span>
                        </span>
                        <div className="text-xs text-muted-foreground mt-1">
                            Transformando ideias em realidade
                        </div>
                    </div>
                </div>

                {/* Linha divisória */}
                <div className="border-t border-border mt-6 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        {/* Links rápidos */}
                        <div className="flex space-x-6">
                            <Link 
                                to="/" 
                                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                Home
                            </Link>
                            <a 
                                href="#about" 
                                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                Sobre
                            </a>
                            <a 
                                href="#contact" 
                                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                Contato
                            </a>
                        </div>

                        {/* Versão */}
                        <div className="text-xs text-muted-foreground">
                            v1.0.0
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};