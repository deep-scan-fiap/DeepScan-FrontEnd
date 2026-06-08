import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "O que é o Deep Scan?",
      answer:
        "O Deep Scan é uma plataforma de IA preditiva que analisa milhões de imagens de satélite para prever desastres naturais oceânicos com maior antecedência e precisão. Além disso, catalogamos e monitoramos a biodiversidade marinha dos oceanos mundiais, criando uma base de dados completa sobre espécies e ecossistemas marinhos.",
    },
    {
      question: "Como funciona a previsão de desastres naturais?",
      answer:
        "Nossa IA processa continuamente imagens de satélite em alta resolução, identificando padrões sutis na temperatura oceânica, correntes marinhas, pressão atmosférica e outros indicadores. Através de machine learning e uma base de dados histórica massiva, conseguimos detectar anomalias que precedem tsunamis, furacões e outros fenômenos naturais, gerando alertas com até 72 horas de antecedência.",
    },
    {
      question: "Quem pode usar a plataforma Deep Scan?",
      answer:
        "Nossa plataforma é essencial para centros de defesa civil, agências governamentais de prevenção de desastres, institutos de pesquisa oceânica, organizações de conservação marinha e universidades.",
    },
    {
      question: "Com que frequência as imagens são atualizadas?",
      answer:
        "As imagens de satélite são atualizadas diariamente, dependendo da cobertura de nuvens e da órbita dos satélites. Para áreas de interesse específico, é possível configurar alertas e receber notificações quando novas imagens estiverem disponíveis.",
    },
    {
      question: "Qual é a precisão das previsões?",
      answer:
        "Nossa plataforma possui uma taxa de precisão de 94% em previsões de desastres naturais oceânicos. Utilizamos validação cruzada com dados históricos e eventos reais para aprimorar constantemente nossos modelos de IA.",
    },
    {
      question: "Como funciona a catalogação de animais marinhos?",
      answer:
        "Nossa IA identifica e classifica espécies marinhas através do processamento de imagens de satélite e dados oceânicos. Já catalogamos mais de 5000 espécies, monitorando suas populações, rotas migratórias e habitats.",
    },
    {
      question: "Quais tipos de desastres podem ser previstos?",
      answer:
        "Nosso sistema é capaz de prever tsunamis, furacões, tufões, ciclones tropicais, ondas gigantes, mudanças bruscas de temperatura oceânica e outros fenômenos naturais relacionados aos oceanos.",
    },
    {
      question: "Como é o processo de cadastro e acesso?",
      answer:
        "O processo é simples: basta clicar em 'Acessar Plataforma', criar uma conta com seu email institucional ou pessoal, e escolher o plano mais adequado às suas necessidades. Oferecemos um período de teste gratuito de 30 dias.",
    },
    {
      question: "Existe suporte técnico disponível?",
      answer:
        "Sim, oferecemos suporte técnico completo via email, chat e telefone. Nossa equipe de especialistas está disponível para auxiliar com questões técnicas, interpretação de dados e otimização do uso da plataforma.",
    },
    {
      question: "Os dados podem ser utilizados em publicações científicas?",
      answer:
        "Absolutamente! Todos os dados e previsões fornecidos pelo Deep Scan podem ser citados em publicações científicas. Fornecemos metadados completos, metodologia detalhada da IA e DOIs quando aplicável.",
    },
  ];

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-foreground to-primary text-primary-foreground py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Perguntas Frequentes
          </h1>
          <p className="text-lg lg:text-xl text-muted max-w-3xl mx-auto">
            Encontre respostas para as dúvidas mais comuns sobre o Deep Scan
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-muted to-background rounded-xl shadow-md overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  aria-expanded={openIndex === index}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-accent/20 transition-colors"
                >
                  <span className="font-semibold text-foreground text-lg pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={24}
                    className={`text-primary flex-shrink-0 transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all ${
                    openIndex === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-6 pb-5 text-secondary leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-12 p-8 bg-gradient-to-br from-primary to-accent rounded-2xl text-primary-foreground text-center">
            <h3 className="text-2xl font-bold mb-3">Ainda tem dúvidas?</h3>
            <p className="mb-6 text-muted">
              Nossa equipe está pronta para ajudar você
            </p>
            <a
              href="mailto:deepscan.fiap@gmail.com"
              className="inline-block bg-background text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-muted transition-colors"
            >
              Entre em Contato
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
