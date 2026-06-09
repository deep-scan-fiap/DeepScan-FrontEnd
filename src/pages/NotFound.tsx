import { Link } from "react-router";
import { Home, ArrowLeft, Fish, Waves } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#064273] via-[#1da2d8] to-[#7fcdff] flex items-center justify-center px-4 overflow-hidden relative">
      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-16 left-10 opacity-20 animate-float"
          style={{ animationDelay: "0s" }}
        >
          <Waves size={64} className="text-white" />
        </div>
        <div
          className="absolute top-32 right-16 opacity-15 animate-float"
          style={{ animationDelay: "1.5s" }}
        >
          <Fish size={48} className="text-white" />
        </div>
        <div
          className="absolute bottom-24 left-20 opacity-20 animate-float"
          style={{ animationDelay: "3s" }}
        >
          <Fish size={36} className="text-white scale-x-[-1]" />
        </div>
        <div
          className="absolute bottom-16 right-12 opacity-15 animate-float"
          style={{ animationDelay: "0.8s" }}
        >
          <Waves size={52} className="text-white" />
        </div>
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="text-center text-white relative z-10">
        <div className="mb-8 animate-fade-in-up">
          {/* Glowing 404 */}
          <div className="relative inline-block mb-6">
            <h1
              className="text-[10rem] lg:text-[14rem] font-bold leading-none select-none"
              style={{
                textShadow:
                  "0 0 60px rgba(127, 205, 255, 0.5), 0 0 120px rgba(29, 162, 216, 0.3)",
              }}
            >
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span
                className="text-6xl animate-float"
                style={{ animationDelay: "2s" }}
              >
                🐋
              </span>
            </div>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold mb-4 animate-fade-in-up animate-delay-100">
            Página não encontrada
          </h2>
          <p className="text-lg lg:text-xl text-[#def3f6] max-w-md mx-auto leading-relaxed animate-fade-in-up animate-delay-200">
            Ops! Parece que você navegou para profundezas desconhecidas. A
            página que você procura não existe.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-300">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#064273] px-8 py-4 rounded-lg font-semibold hover:bg-[#def3f6] transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <Home size={20} />
            Ir para a Página Inicial
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft size={20} />
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
