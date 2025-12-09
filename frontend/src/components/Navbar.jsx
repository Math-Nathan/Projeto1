import { cn } from "@/lib/utils";
import { Menu, X, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Sobre", href: "#about" },
  { name: "Serviços", href: "#servicos" },
  { name: "Metodos", href: "#metodos" },
  { name: "Contato", href: "#contact" },
  { name: "Agenda", href: "/agenda", requiresPin: true }, // Protegido por PIN
  // Adicione mais itens protegidos se necessário
  // { name: "Admin", href: "/admin", requiresPin: true },
];

const PIN_CORRETO = "123456"; // Defina seu PIN aqui
// Para produção, considere armazenar isso em variáveis de ambiente

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const [targetHref, setTargetHref] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Verificar se já está autenticado (pin salvo em sessionStorage)
  useEffect(() => {
    const authStatus = sessionStorage.getItem('pin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleProtectedClick = (href, e) => {
    e.preventDefault();
    
    // Se já autenticado, permite navegação direta
    if (isAuthenticated) {
      if (href.startsWith('/')) {
        navigate(href);
        setIsMenuOpen(false);
      } else {
        window.location.href = href;
      }
      return;
    }

    // Se não autenticado, mostra modal de PIN
    setTargetHref(href);
    setShowPinModal(true);
    setPinInput("");
    setPinError("");
  };

  const handlePinSubmit = () => {
    if (pinInput === PIN_CORRETO) {
      setIsAuthenticated(true);
      sessionStorage.setItem('pin_authenticated', 'true');
      setShowPinModal(false);
      setPinError("");
      
      // Navega para o destino
      if (targetHref.startsWith('/')) {
        navigate(targetHref);
      } else {
        window.location.href = targetHref;
      }
      
      // Fecha menu mobile se estiver aberto
      setIsMenuOpen(false);
    } else {
      setPinError("PIN incorreto. Tente novamente.");
      setPinInput("");
    }
  };

  const handlePinKeyPress = (e) => {
    if (e.key === 'Enter') {
      handlePinSubmit();
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('pin_authenticated');
  };

  const renderNavItem = (item, isMobile = false) => {
    const commonClasses = isMobile
      ? "text-foreground/80 hover:text-primary transition-colors duration-300"
      : "text-foreground/80 hover:bg-[#609D9F] hover:text-white px-4 py-2 rounded-md transition-all duration-300";

    if (item.requiresPin) {
      return (
        <button
          key={item.name}
          onClick={(e) => handleProtectedClick(item.href, e)}
          className={`${commonClasses} flex items-center gap-2`}
        >
          {item.name}
          <Lock size={14} />
        </button>
      );
    }

    if (item.href.startsWith('/')) {
      return (
        <Link
          key={item.name}
          to={item.href}
          className={commonClasses}
          onClick={() => isMobile && setIsMenuOpen(false)}
        >
          {item.name}
        </Link>
      );
    }

    return (
      <a
        key={item.name}
        href={item.href}
        className={commonClasses}
        onClick={() => isMobile && setIsMenuOpen(false)}
      >
        {item.name}
      </a>
    );
  };

  return (
    <>
      <nav
        className={cn(
          "fixed w-full z-40 transition-all duration-300 bg-[#609D9F]/5",
          isScrolled ? "py-3 bg-[#609D9F]/10 opacity-100 backdrop-blur-md shadow-xs" : "py-5"
        )}
      >
        <div className="container flex items-center justify-between">
          {/* LOGO */}
          <Link
            to="/"
            className="text-xl font-bold text-primary flex items-center"
          >
            <span className="relative z-10">
              <span className="text-glow text-foreground">BeMove Fisioterapia</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => renderNavItem(item, false))}
            
            {/* Botão de logout se autenticado */}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="text-foreground/80 hover:bg-red-500 hover:text-white px-4 py-2 rounded-md transition-all duration-300 text-sm"
              >
                Sair
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="md:hidden p-2 text-foreground z-50"
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile Menu */}
          <div
            className={cn(
              "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
              "transition-all duration-300 md:hidden",
              isMenuOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            )}
          >
            <div className="flex flex-col space-y-8 text-xl">
              {navItems.map((item) => renderNavItem(item, true))}
              
              {/* Botão de logout se autenticado */}
              {isAuthenticated && (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="text-foreground/80 hover:text-red-500 transition-colors duration-300"
                >
                  Sair
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Modal do PIN */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
              Acesso Restrito
            </h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Digite o PIN de acesso:
              </label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                onKeyPress={handlePinKeyPress}
                className="w-full px-4 py-3 text-center text-2xl tracking-widest border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#609D9F] focus:border-transparent dark:bg-gray-700 dark:text-white"
                maxLength={6}
                autoFocus
                placeholder="000000"
              />
              {pinError && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {pinError}
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handlePinSubmit}
                className="flex-1 bg-[#609D9F] hover:bg-[#4d7f80] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300"
              >
                Acessar
              </button>
              <button
                onClick={() => {
                  setShowPinModal(false);
                  setPinError("");
                }}
                className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};