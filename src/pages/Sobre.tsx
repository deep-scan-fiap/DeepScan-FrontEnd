import { Target, Eye, Heart, Lightbulb } from "lucide-react";

export function Sobre() {
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-[#064273] to-[#1da2d8] text-white py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Sobre o Deep Scan
          </h1>
          <p className="text-lg lg:text-xl text-[#def3f6] max-w-3xl mx-auto">
            Salvando vidas através da prevenção de desastres naturais
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#064273] mb-6">
              Nossa História
            </h2>
            <div className="space-y-4 text-[#76b6c4] text-lg leading-relaxed">
              <p>
                O Deep Scan nasceu da necessidade urgente de prever desastres
                naturais com maior antecedência e precisão. Em um mundo onde
                eventos climáticos extremos se tornam cada vez mais frequentes,
                desenvolvemos uma solução revolucionária baseada em inteligência
                artificial.
              </p>
              <p>
                Através do processamento de milhões de imagens de satélite,
                criamos uma base de dados massiva que alimenta nosso sistema de
                IA preditiva. Nossa tecnologia é capaz de identificar padrões
                oceânicos sutis que precedem tsunamis, furacões e outros
                fenômenos naturais, permitindo alertas antecipados que salvam
                vidas.
              </p>
              <p>
                Além da prevenção de desastres, nossa plataforma também cataloga
                e monitora a biodiversidade marinha dos oceanos mundiais. Com
                dados sobre espécies, rotas migratórias e mudanças no
                ecossistema, contribuímos para a conservação marinha e o
                desenvolvimento sustentável.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-[#def3f6]">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#064273] text-center mb-12">
            Nossos Valores
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Value 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-[#1da2d8] rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Target size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#064273] mb-3">
                Missão
              </h3>
              <p className="text-[#76b6c4]">
                Salvar vidas através da prevenção antecipada de desastres
                naturais oceânicos
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-[#1da2d8] rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Eye size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#064273] mb-3">
                Visão
              </h3>
              <p className="text-[#76b6c4]">
                Um mundo onde IA preditiva elimina mortes por desastres naturais
                oceânicos
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-[#1da2d8] rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Heart size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#064273] mb-3">
                Paixão
              </h3>
              <p className="text-[#76b6c4]">
                Comprometimento genuíno com a conservação dos oceanos
              </p>
            </div>

            {/* Value 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-[#1da2d8] rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Lightbulb size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#064273] mb-3">
                Inovação
              </h3>
              <p className="text-[#76b6c4]">
                IA de ponta aplicada à previsão de fenômenos naturais e
                acessível para o público comum
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#064273] mb-8 text-center">
              Nosso Impacto
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-[#def3f6] to-white p-8 rounded-2xl">
                <div className="text-4xl font-bold text-[#1da2d8] mb-2">
                  50M+
                </div>
                <p className="text-[#064273] font-semibold mb-2">
                  Imagens Processadas
                </p>
                <p className="text-[#76b6c4] text-sm">
                  Base de dados massiva de imagens de satélite dos oceanos
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#def3f6] to-white p-8 rounded-2xl">
                <div className="text-4xl font-bold text-[#1da2d8] mb-2">
                  72h
                </div>
                <p className="text-[#064273] font-semibold mb-2">
                  Antecedência Média
                </p>
                <p className="text-[#76b6c4] text-sm">
                  Previsão de desastres naturais com até 3 dias de antecedência
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#def3f6] to-white p-8 rounded-2xl">
                <div className="text-4xl font-bold text-[#1da2d8] mb-2">
                  5000+
                </div>
                <p className="text-[#064273] font-semibold mb-2">
                  Espécies Catalogadas
                </p>
                <p className="text-[#76b6c4] text-sm">
                  Animais marinhos identificados e monitorados pela IA
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#def3f6] to-white p-8 rounded-2xl">
                <div className="text-4xl font-bold text-[#1da2d8] mb-2">
                  94%
                </div>
                <p className="text-[#064273] font-semibold mb-2">
                  Precisão Preditiva
                </p>
                <p className="text-[#76b6c4] text-sm">
                  Taxa de acurácia em previsões de desastres naturais
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
