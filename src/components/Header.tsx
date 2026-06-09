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
    { path: "/analise-ia", label: "Análise IA" },
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
          <Link
            to="/"
            className="flex items-center gap-3 relative z-50 transition-opacity hover:opacity-80"
          >
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
                className={`relative py-1 transition-colors hover:text-[#7fcdff] group ${
                  isActive(link.path) ? "text-[#7fcdff]" : ""
                }`}
              >
                {link.path === "/analise-ia" ? (
                  <span className="flex items-center gap-1.5">
                    <span
                      className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors ${
                        isActive(link.path)
                          ? "bg-[#7fcdff]"
                          : "bg-[#1da2d8] group-hover:bg-[#7fcdff]"
                      }`}
                    />
                    {link.label}
                  </span>
                ) : (
                  link.label
                )}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-[#7fcdff] transition-all duration-300 ${
                    isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden z-50 p-2 transition-transform duration-200 hover:scale-110"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden fixed top-16 lg:top-20 left-0 right-0 bg-[#064273] border-t border-[#1da2d8] shadow-lg z-40 transition-all duration-300 ${
            mobileMenuOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <nav className="flex flex-col px-4 py-4 gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-4 rounded transition-colors hover:bg-[#1da2d8] flex items-center gap-2 ${
                  isActive(link.path) ? "bg-[#1da2d8] text-white" : ""
                }`}
              >
                {link.path === "/analise-ia" && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7fcdff] flex-shrink-0" />
                )}
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
