import { Target, Eye, Heart, Lightbulb } from "lucide-react";

export function Sobre() {
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-foreground to-primary text-primary-foreground py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Sobre o Deep Scan
          </h1>
          <p className="text-lg lg:text-xl text-muted max-w-3xl mx-auto">
            Salvando vidas através da prevenção de desastres naturais
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Nossa História
            </h2>
            <div className="space-y-4 text-secondary text-lg leading-relaxed">
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
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-center mb-12">
            Nossos Valores
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                Icon: Target,
                title: "Missão",
                desc: "Salvar vidas através da prevenção antecipada de desastres naturais oceânicos",
              },
              {
                Icon: Eye,
                title: "Visão",
                desc: "Um mundo onde IA preditiva elimina mortes por desastres naturais oceânicos",
              },
              {
                Icon: Heart,
                title: "Paixão",
                desc: "Comprometimento genuíno com a conservação dos oceanos",
              },
              {
                Icon: Lightbulb,
                title: "Inovação",
                desc: "IA de ponta aplicada à previsão de fenômenos naturais e acessível para o público",
              },
            ].map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="bg-background p-8 rounded-2xl shadow-lg text-center"
              >
                <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Icon size={32} className="text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {title}
                </h3>
                <p className="text-secondary">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8 text-center">
              Nosso Impacto
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  value: "50M+",
                  title: "Imagens Processadas",
                  desc: "Base de dados massiva de imagens de satélite dos oceanos",
                },
                {
                  value: "72h",
                  title: "Antecedência Média",
                  desc: "Previsão de desastres naturais com até 3 dias de antecedência",
                },
                {
                  value: "5000+",
                  title: "Espécies Catalogadas",
                  desc: "Animais marinhos identificados e monitorados pela IA",
                },
                {
                  value: "94%",
                  title: "Precisão Preditiva",
                  desc: "Taxa de acurácia em previsões de desastres naturais",
                },
              ].map(({ value, title, desc }) => (
                <div
                  key={title}
                  className="bg-gradient-to-br from-muted to-background p-8 rounded-2xl"
                >
                  <div className="text-4xl font-bold text-primary mb-2">
                    {value}
                  </div>
                  <p className="text-foreground font-semibold mb-2">{title}</p>
                  <p className="text-secondary text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
