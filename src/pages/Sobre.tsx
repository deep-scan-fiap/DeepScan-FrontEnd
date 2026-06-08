import { Target, Eye, Heart, Lightbulb } from "lucide-react";

export function Sobre() {
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-[#064273] to-[#1da2d8] text-white py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 animate-fade-in-up">
            Sobre o Deep Scan
          </h1>
          <p className="text-lg lg:text-xl text-[#def3f6] max-w-3xl mx-auto animate-fade-in-up animate-delay-100">
            Salvando vidas através da prevenção de desastres naturais
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#064273] mb-6 animate-fade-in-left">
              Nossa História
            </h2>
            <div className="space-y-4 text-[#76b6c4] text-lg leading-relaxed">
              <p className="animate-fade-in-up animate-delay-100">
                O Deep Scan nasceu da necessidade urgente de prever desastres
                naturais com maior antecedência e precisão. Em um mundo onde
                eventos climáticos extremos se tornam cada vez mais frequentes,
                desenvolvemos uma solução revolucionária baseada em inteligência
                artificial.
              </p>
              <p className="animate-fade-in-up animate-delay-200">
                Através do processamento de milhões de imagens de satélite,
                criamos uma base de dados massiva que alimenta nosso sistema de
                IA preditiva. Nossa tecnologia é capaz de identificar padrões
                oceânicos sutis que precedem tsunamis, furacões e outros
                fenômenos naturais, permitindo alertas antecipados que salvam
                vidas.
              </p>
              <p className="animate-fade-in-up animate-delay-300">
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
          <h2 className="text-3xl lg:text-4xl font-bold text-[#064273] text-center mb-12 animate-fade-in-up">
            Nossos Valores
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                Icon: Target,
                title: "Missão",
                text: "Salvar vidas através da prevenção antecipada de desastres naturais oceânicos",
                delay: "animate-delay-100",
              },
              {
                Icon: Eye,
                title: "Visão",
                text: "Um mundo onde IA preditiva elimina mortes por desastres naturais oceânicos",
                delay: "animate-delay-200",
              },
              {
                Icon: Heart,
                title: "Paixão",
                text: "Comprometimento genuíno com a conservação dos oceanos",
                delay: "animate-delay-300",
              },
              {
                Icon: Lightbulb,
                title: "Inovação",
                text: "IA de ponta aplicada à previsão de fenômenos naturais e acessível para o público comum",
                delay: "animate-delay-400",
              },
            ].map(({ Icon, title, text, delay }) => (
              <div
                key={title}
                className={`bg-white p-8 rounded-2xl shadow-lg text-center group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-scale-in ${delay}`}
              >
                <div className="w-16 h-16 bg-[#1da2d8] rounded-xl flex items-center justify-center mb-4 mx-auto transition-all duration-300 group-hover:bg-[#064273] group-hover:rotate-6">
                  <Icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#064273] mb-3">
                  {title}
                </h3>
                <p className="text-[#76b6c4]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#064273] mb-8 text-center animate-fade-in-up">
              Nosso Impacto
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  value: "50M+",
                  label: "Imagens Processadas",
                  desc: "Base de dados massiva de imagens de satélite dos oceanos",
                  delay: "animate-delay-100",
                },
                {
                  value: "72h",
                  label: "Antecedência Média",
                  desc: "Previsão de desastres naturais com até 3 dias de antecedência",
                  delay: "animate-delay-200",
                },
                {
                  value: "5000+",
                  label: "Espécies Catalogadas",
                  desc: "Animais marinhos identificados e monitorados pela IA",
                  delay: "animate-delay-300",
                },
                {
                  value: "94%",
                  label: "Precisão Preditiva",
                  desc: "Taxa de acurácia em previsões de desastres naturais",
                  delay: "animate-delay-400",
                },
              ].map(({ value, label, desc, delay }) => (
                <div
                  key={label}
                  className={`bg-gradient-to-br from-[#def3f6] to-white p-8 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-scale-in ${delay}`}
                >
                  <div className="text-4xl font-bold text-[#1da2d8] mb-2">
                    {value}
                  </div>
                  <p className="text-[#064273] font-semibold mb-2">{label}</p>
                  <p className="text-[#76b6c4] text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
