import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import logoImage from "@/assets/logo.png";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Início" },
    { path: "/monitoramento", label: "Monitoramento" },
    { path: "/integrantes", label: "Integrantes" },
    { path: "/sobre", label: "Sobre" },
    { path: "/faq", label: "FAQ" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-[#064273] text-white fixed top-0 left-0 right-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 relative z-50">
            <img
              src={logoImage}
              alt="Deep Scan"
              className="w-32 h-10 lg:w-40 lg:h-12 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors hover:text-[#7fcdff] ${
                  isActive(link.path) ? "text-[#7fcdff]" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Login Button */}
          <Link
            to="/login"
            className="hidden md:block bg-[#1da2d8] hover:bg-[#7fcdff] px-6 py-2 rounded-lg transition-colors"
          >
            Acessar Plataforma
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden z-50 p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed top-16 lg:top-20 left-0 right-0 bg-[#064273] border-t border-[#1da2d8] shadow-lg z-40">
            <nav className="flex flex-col px-4 py-4 gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 px-4 rounded transition-colors hover:bg-[#1da2d8] ${
                    isActive(link.path) ? "bg-[#1da2d8] text-white" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-[#1da2d8] hover:bg-[#7fcdff] py-2 px-4 rounded text-center transition-colors"
              >
                Acessar Plataforma
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
