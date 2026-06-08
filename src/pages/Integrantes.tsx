import { Github, Linkedin } from "lucide-react";

export function Integrantes() {
  const team = [
    {
      name: "Hugo Souza",
      role: "Desenvolvedor Frontend",
      bio: "Especialista em React e TypeScript, responsável pela interface da plataforma.",
      linkedin: "https://linkedin.com/in/hugo-souza-34482222a/",
      github: "https://github.com/hgsouz",
    },
    {
      name: "Lucas Pompeu",
      role: "Desenvolvedor Java",
      bio: "Engenheiro de backend focado em arquitetura escalável e microserviços.",
      linkedin: "https://linkedin.com/in/lucaspompeu/",
      github: "https://github.com/PompeuDev",
    },
    {
      name: "Lucas Campanhã",
      role: "Desenvolvedor Python",
      bio: "Especialista em processamento de dados e integração com APIs de satélite.",
      linkedin: "https://linkedin.com/in/lucas-campanhã-342707193/",
      github: "https://github.com/Labs-LCS",
    },
    {
      name: "Gustavo Souza",
      role: "Especialista em Banco de Dados",
      bio: "Arquiteto de dados responsável pela gestão de grandes volumes de imagens de satélite.",
      linkedin: "https://linkedin.com/in/gustavo-souza-nascimento-698a81305/",
      github: "https://github.com/GustavoSouNascimento",
    },
    {
      name: "Enzo Yukio",
      role: "Especialista em Inteligência Artificial",
      bio: "Cientista de IA focado em modelos preditivos para desastres naturais.",
      linkedin: "https://linkedin.com/in/enzooyadomari/",
      github: "https://github.com/EnzoYukio",
    },
  ];

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("");

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-foreground to-primary text-primary-foreground py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Nossa Equipe</h1>
          <p className="text-lg lg:text-xl text-muted max-w-3xl mx-auto">
            Conheça os especialistas dedicados a revolucionar a prevenção de
            desastres naturais
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-gradient-to-br from-muted to-background p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group"
              >
                {/* Avatar */}
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-primary-foreground text-3xl font-bold mb-4 mx-auto group-hover:scale-105 transition-transform">
                  {getInitials(member.name)}
                </div>

                {/* Info */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-secondary text-sm">{member.bio}</p>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-3 pt-4 border-t border-primary/20">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-primary hover:bg-foreground rounded-lg flex items-center justify-center text-primary-foreground transition-colors"
                    aria-label={`LinkedIn de ${member.name}`}
                  >
                    <Linkedin size={18} />
                  </a>
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-primary hover:bg-foreground rounded-lg flex items-center justify-center text-primary-foreground transition-colors"
                    aria-label={`GitHub de ${member.name}`}
                  >
                    <Github size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
