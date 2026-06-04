import { Link } from "react-router";
import { Mail, MapPin, Phone, Github } from "lucide-react";
import logoImage from "../assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-[#064273] text-white mt-auto">
      <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Sobre */}
          <div>
            <div className="mb-4">
              <img
                src={logoImage}
                alt="Deep Scan"
                className="w-32 h-8 object-contain"
              />
            </div>
            <p className="text-[#def3f6] text-sm leading-relaxed">
              IA preditiva para prevenção de desastres naturais e monitoramento
              de vida marinha através de análise avançada de imagens de
              satélite.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="font-semibold mb-4 text-[#7fcdff]">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              {[
                { to: "/", label: "Início" },
                { to: "/monitoramento", label: "Monitoramento" },
                { to: "/integrantes", label: "Integrantes" },
                { to: "/sobre", label: "Sobre" },
                { to: "/faq", label: "FAQ" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-[#def3f6] hover:text-[#7fcdff] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-semibold mb-4 text-[#7fcdff]">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-[#def3f6]">
                <Mail size={16} className="text-[#1da2d8]" />
                deepscan.fiap@gmail.com
              </li>
              <li className="flex items-center gap-2 text-[#def3f6]">
                <Phone size={16} className="text-[#1da2d8]" />
                +55 (11) 9999-9999
              </li>
              <li className="flex items-center gap-2 text-[#def3f6]">
                <MapPin size={16} className="text-[#1da2d8]" />
                São Paulo, Brasil
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="font-semibold mb-4 text-[#7fcdff]">Redes Sociais</h3>
            <div className="flex gap-4">
              {[
                {
                  href: "https://github.com/deep-scan-fiap",
                  Icon: Github,
                  label: "GitHub",
                },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#1da2d8] hover:bg-[#7fcdff] rounded-lg flex items-center justify-center transition-colors"
                  aria-label={label}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#1da2d8] mt-8 pt-6 text-center text-sm text-[#def3f6]">
          <p>
            &copy; {new Date().getFullYear()} Deep Scan. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
