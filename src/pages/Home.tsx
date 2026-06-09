import { ArrowRight, Waves, AlertTriangle, Database } from "lucide-react";
import { Link } from "react-router";
import whaleImage from "@/assets/whale.png";

export function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#064273] via-[#1da2d8] to-[#7fcdff] text-white overflow-hidden min-h-[600px] lg:min-h-[700px]">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        {/* Whale Background - Behind Everything */}
        <div className="absolute inset-0 flex items-center justify-end pr-0 lg:pr-12">
          <img
            src={whaleImage}
            alt="Baleia"
            className="w-full max-w-md lg:max-w-2xl h-auto opacity-80 animate-float"
            style={{
              filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))",
            }}
          />
        </div>

        {/* Content Layer - On Top */}
        <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-20 relative z-10">
          <div className="max-w-3xl">
            {/* Text Content */}
            <div className="space-y-6 lg:space-y-8">
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm animate-fade-in-left animate-delay-100">
                Prevenção de Desastres Naturais com IA
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in-up animate-delay-200">
                A Nova Era do Monitoramento dos Oceanos
              </h1>

              <p className="text-lg lg:text-xl text-[#def3f6] leading-relaxed animate-fade-in-up animate-delay-300">
                Através de imagens de satélite, criamos uma IA preditiva capaz
                de prever desastres naturais com maior precisão e antecedência,
                além de monitorar a biodiversidade marinha mundial.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animate-delay-400">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#064273] px-8 py-4 rounded-lg font-semibold hover:bg-[#def3f6] transition-all duration-300 hover:scale-105 hover:shadow-lg animate-pulse-glow"
                >
                  Começar Agora
                  <ArrowRight size={20} />
                </Link>
                <Link
                  to="/sobre"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  Saiba Mais
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <div className="relative h-16">
            <div
              className="absolute bottom-0 animate-wave"
              style={{ width: "200%", left: 0 }}
            >
              <svg
                viewBox="0 0 1440 64"
                xmlns="http://www.w3.org/2000/svg"
                className="w-1/2 inline-block"
                preserveAspectRatio="none"
                style={{ height: 64 }}
              >
                <path
                  d="M0,32 C180,64 360,0 540,32 C720,64 900,0 1080,32 C1260,64 1440,0 1440,0 L1440,64 L0,64 Z"
                  fill="white"
                />
              </svg>
              <svg
                viewBox="0 0 1440 64"
                xmlns="http://www.w3.org/2000/svg"
                className="w-1/2 inline-block"
                preserveAspectRatio="none"
                style={{ height: 64 }}
              >
                <path
                  d="M0,32 C180,64 360,0 540,32 C720,64 900,0 1080,32 C1260,64 1440,0 1440,0 L1440,64 L0,64 Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12 lg:mb-16 animate-fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#064273] mb-4">
              Por que escolher o Deep Scan?
            </h2>
            <p className="text-lg text-[#76b6c4] max-w-2xl mx-auto">
              Tecnologia de ponta para prevenção de desastres e conservação
              marinha
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-[#def3f6] to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-scale-in animate-delay-100">
              <div className="w-14 h-14 bg-[#1da2d8] rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 hover:rotate-6">
                <AlertTriangle size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#064273] mb-3">
                Previsão de Desastres Naturais
              </h3>
              <p className="text-[#76b6c4]">
                IA preditiva que antecipa tsunamis, furacões e outros fenômenos
                oceânicos com maior precisão e antecedência.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-[#def3f6] to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-scale-in animate-delay-200">
              <div className="w-14 h-14 bg-[#1da2d8] rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 hover:rotate-6">
                <Database size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#064273] mb-3">
                Base de Dados Global
              </h3>
              <p className="text-[#76b6c4]">
                Milhões de imagens de satélite processadas para criar a maior
                base de dados oceânicos do mundo.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-[#def3f6] to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-scale-in animate-delay-300">
              <div className="w-14 h-14 bg-[#1da2d8] rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 hover:rotate-6">
                <Waves size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#064273] mb-3">
                Análise de Biodiversidade
              </h3>
              <p className="text-[#76b6c4]">
                Catalogação e monitoramento de espécies marinhas dos oceanos
                mundiais através de IA avançada.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-[#064273] to-[#1da2d8] text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center animate-scale-in animate-delay-100 group">
              <div className="text-4xl lg:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                50M+
              </div>
              <div className="text-[#def3f6]">Imagens Processadas</div>
            </div>
            <div className="text-center animate-scale-in animate-delay-200 group">
              <div className="text-4xl lg:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                72h
              </div>
              <div className="text-[#def3f6]">Antecedência Média</div>
            </div>
            <div className="text-center animate-scale-in animate-delay-300 group">
              <div className="text-4xl lg:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                5000+
              </div>
              <div className="text-[#def3f6]">Espécies Catalogadas</div>
            </div>
            <div className="text-center animate-scale-in animate-delay-400 group">
              <div className="text-4xl lg:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                94%
              </div>
              <div className="text-[#def3f6]">Precisão Preditiva</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#064273] mb-6 animate-fade-in-up">
            Pronto para prevenir desastres e proteger os oceanos?
          </h2>
          <p className="text-lg text-[#76b6c4] mb-8 max-w-2xl mx-auto animate-fade-in-up animate-delay-100">
            Junte-se a centros de pesquisa e organizações que confiam no Deep
            Scan para salvar vidas
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 bg-[#1da2d8] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#064273] transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in-up animate-delay-200"
          >
            Acessar Plataforma
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
