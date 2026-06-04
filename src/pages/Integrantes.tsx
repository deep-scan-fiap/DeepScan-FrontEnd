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

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-[#064273] to-[#1da2d8] text-white py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Nossa Equipe</h1>
          <p className="text-lg lg:text-xl text-[#def3f6] max-w-3xl mx-auto">
            Conheça os especialistas dedicados a revolucionar a prevenção de
            desastres naturais
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#def3f6] to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                {/* Avatar */}
                <div className="w-24 h-24 bg-gradient-to-br from-[#1da2d8] to-[#7fcdff] rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4 mx-auto">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>

                {/* Info */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-semibold text-[#064273] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[#1da2d8] font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-[#76b6c4] text-sm">{member.bio}</p>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-3 pt-4 border-t border-[#1da2d8]/20">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#1da2d8] hover:bg-[#064273] rounded-lg flex items-center justify-center text-white transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#1da2d8] hover:bg-[#064273] rounded-lg flex items-center justify-center text-white transition-colors"
                    aria-label="GitHub"
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
