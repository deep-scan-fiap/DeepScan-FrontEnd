import { Link } from "react-router";
import { Home, ArrowLeft } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#064273] via-[#1da2d8] to-[#7fcdff] flex items-center justify-center px-4">
      <div className="text-center text-white">
        <div className="mb-8">
          <h1 className="text-9xl font-bold mb-4">404</h1>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Página não encontrada</h2>
          <p className="text-lg lg:text-xl text-[#def3f6] max-w-md mx-auto">
            Ops! Parece que você navegou para profundezas desconhecidas.
            A página que você procura não existe.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#064273] px-8 py-4 rounded-lg font-semibold hover:bg-[#def3f6] transition-colors"
          >
            <Home size={20} />
            Ir para a Página Inicial
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-colors"
          >
            <ArrowLeft size={20} />
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
