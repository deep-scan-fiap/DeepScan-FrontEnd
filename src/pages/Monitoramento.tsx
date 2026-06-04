import { useState } from "react";
import {
  Waves,
  Fish,
  FileText,
  TrendingUp,
  AlertTriangle,
  Droplet,
  Wind,
  Thermometer,
} from "lucide-react";
import whaleImage from "../assets/whale.png";

type TabType = "oceano" | "vida-marinha" | "relatorios";

export function Monitoramento() {
  const [activeTab, setActiveTab] = useState<TabType>("oceano");

  return (
    <div className="min-h-screen bg-[#def3f6]">
      {/* Header do Painel */}
      <div className="bg-white border-b border-[#1da2d8]/20 py-6">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#064273]">
                Painel de Monitoramento
              </h1>
              <p className="text-[#76b6c4]">Dados oceânicos em tempo real</p>
            </div>

            {/* Menu Flutuante */}
            <div className="flex gap-4 bg-white border-2 border-[#1da2d8] rounded-xl p-1 shadow-lg overflow-x-scroll">
              <button
                onClick={() => setActiveTab("oceano")}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === "oceano"
                    ? "bg-[#1da2d8] text-white"
                    : "text-[#064273] hover:bg-[#def3f6]"
                }`}
              >
                <Waves size={20} />
                Oceano
              </button>
              <button
                onClick={() => setActiveTab("vida-marinha")}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === "vida-marinha"
                    ? "bg-[#1da2d8] text-white"
                    : "text-[#064273] hover:bg-[#def3f6]"
                }`}
              >
                <Fish size={20} />
                Vida Marinha
              </button>
              <button
                onClick={() => setActiveTab("relatorios")}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === "relatorios"
                    ? "bg-[#1da2d8] text-white"
                    : "text-[#064273] hover:bg-[#def3f6]"
                }`}
              >
                <FileText size={20} />
                Relatórios
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* TAB: OCEANO */}
        {activeTab === "oceano" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Área Principal - Modelo 3D */}
            {/* MOCK: Substituir por modelo 3D interativo ou visualização de mapa oceânico */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#064273]">
                  Análise Oceânica Global
                </h2>
                <div className="flex gap-2">
                  {/* MOCK: Botões de controle do modelo 3D */}
                  <button className="w-10 h-10 bg-[#def3f6] hover:bg-[#1da2d8] hover:text-white rounded-lg flex items-center justify-center transition-colors">
                    <TrendingUp size={20} />
                  </button>
                </div>
              </div>

              {/* MOCK: Área do modelo 3D - substituir por componente de visualização real */}
              <div className="relative bg-gradient-to-br from-[#064273] via-[#1da2d8] to-[#7fcdff] rounded-xl p-8 h-96 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                </div>

                {/* MOCK: Imagem temporária - substituir por modelo 3D interativo */}
                <img
                  src={whaleImage}
                  alt="Oceano 3D"
                  className="max-w-3xs md:max-w-md h-auto relative z-10 animate-float"
                  style={{
                    filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))",
                  }}
                />
              </div>

              {/* MOCK: Seletores de visualização */}
              <div className="flex gap-4 mt-6 border-2 border-[#1da2d8] rounded-xl p-1 overflow-x-scroll md:border-none">
                <button className="flex-1 p-4 bg-[#def3f6] hover:bg-[#1da2d8] hover:text-white rounded-xl transition-colors">
                  <Waves size={24} className="mx-auto mb-2" />
                  <p className="text-sm font-semibold">Correntes</p>
                </button>
                <button className="flex-1 p-4 bg-[#def3f6] hover:bg-[#1da2d8] hover:text-white rounded-xl transition-colors">
                  <Thermometer size={24} className="mx-auto mb-2" />
                  <p className="text-sm font-semibold">Temperatura</p>
                </button>
                <button className="flex-1 p-4 bg-[#def3f6] hover:bg-[#1da2d8] hover:text-white rounded-xl transition-colors">
                  <Wind size={24} className="mx-auto mb-2" />
                  <p className="text-sm font-semibold">Ventos</p>
                </button>
              </div>
            </div>

            {/* Cards Laterais */}
            <div className="space-y-6">
              {/* MOCK: Card de Alertas - dados mockados */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <AlertTriangle size={24} className="text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#064273]">Alertas Ativos</h3>
                    <p className="text-sm text-[#76b6c4]">
                      Monitoramento em tempo real
                    </p>
                  </div>
                </div>

                {/* MOCK: Lista de alertas - substituir por dados reais da API */}
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                    <p className="text-sm font-semibold text-yellow-800">
                      Temperatura Elevada
                    </p>
                    <p className="text-xs text-yellow-600">
                      Pacífico Norte - +2.3°C
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                    <p className="text-sm font-semibold text-blue-800">
                      Corrente Anormal
                    </p>
                    <p className="text-xs text-blue-600">
                      Atlântico Sul - Desvio 15%
                    </p>
                  </div>
                </div>
              </div>

              {/* MOCK: Card de Métricas - dados mockados */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-bold text-[#064273] mb-4">
                  Métricas Oceânicas
                </h3>

                {/* MOCK: Dados de temperatura - substituir por API real */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-[#76b6c4]">
                        Temperatura Média
                      </span>
                      <span className="text-sm font-bold text-[#064273]">
                        18.7°C
                      </span>
                    </div>
                    <div className="h-2 bg-[#def3f6] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#1da2d8]"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                  </div>

                  {/* MOCK: Dados de salinidade */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-[#76b6c4]">Salinidade</span>
                      <span className="text-sm font-bold text-[#064273]">
                        35.2 PSU
                      </span>
                    </div>
                    <div className="h-2 bg-[#def3f6] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#7fcdff]"
                        style={{ width: "88%" }}
                      ></div>
                    </div>
                  </div>

                  {/* MOCK: Dados de pH */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-[#76b6c4]">
                        pH Oceânico
                      </span>
                      <span className="text-sm font-bold text-[#064273]">
                        8.1
                      </span>
                    </div>
                    <div className="h-2 bg-[#def3f6] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#76b6c4]"
                        style={{ width: "81%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* MOCK: Card de Níveis - dados mockados */}
              <div className="bg-gradient-to-br from-[#1da2d8] to-[#7fcdff] rounded-2xl shadow-lg p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Droplet size={32} />
                  <div>
                    <h3 className="font-bold">Nível do Mar</h3>
                    <p className="text-sm opacity-90">Medição global</p>
                  </div>
                </div>

                {/* MOCK: Valor do nível do mar - substituir por dados reais */}
                <div className="text-center py-4">
                  <div className="text-5xl font-bold mb-2">+3.4mm</div>
                  <p className="text-sm opacity-90">Aumento anual médio</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: VIDA MARINHA */}
        {activeTab === "vida-marinha" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* MOCK: Cards de espécies - substituir por dados reais da API */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#064273]">Baleias Jubarte</h3>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  Estável
                </span>
              </div>

              {/* MOCK: Imagem da espécie */}
              <div className="bg-gradient-to-br from-[#def3f6] to-[#7fcdff] rounded-xl h-48 mb-4 flex items-center justify-center">
                <Fish size={64} className="text-[#064273] opacity-50" />
              </div>

              {/* MOCK: Estatísticas */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#76b6c4]">População estimada:</span>
                  <span className="font-bold text-[#064273]">25.000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#76b6c4]">Tendência anual:</span>
                  <span className="font-bold text-green-600">+3.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#76b6c4]">Última atualização:</span>
                  <span className="font-bold text-[#064273]">Hoje</span>
                </div>
              </div>
            </div>

            {/* MOCK: Mais cards de espécies - copiar estrutura acima */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#064273]">Tubarões</h3>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                  Atenção
                </span>
              </div>

              <div className="bg-gradient-to-br from-[#def3f6] to-[#7fcdff] rounded-xl h-48 mb-4 flex items-center justify-center">
                <Fish size={64} className="text-[#064273] opacity-50" />
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#76b6c4]">População estimada:</span>
                  <span className="font-bold text-[#064273]">180.000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#76b6c4]">Tendência anual:</span>
                  <span className="font-bold text-yellow-600">-1.8%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#76b6c4]">Última atualização:</span>
                  <span className="font-bold text-[#064273]">Ontem</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#064273]">
                  Tartarugas Marinhas
                </h3>
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                  Crítico
                </span>
              </div>

              <div className="bg-gradient-to-br from-[#def3f6] to-[#7fcdff] rounded-xl h-48 mb-4 flex items-center justify-center">
                <Fish size={64} className="text-[#064273] opacity-50" />
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#76b6c4]">População estimada:</span>
                  <span className="font-bold text-[#064273]">42.000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#76b6c4]">Tendência anual:</span>
                  <span className="font-bold text-red-600">-5.7%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#76b6c4]">Última atualização:</span>
                  <span className="font-bold text-[#064273]">Hoje</span>
                </div>
              </div>
            </div>

            {/* MOCK: Card de resumo geral */}
            <div className="md:col-span-2 lg:col-span-3 bg-gradient-to-r from-[#064273] to-[#1da2d8] rounded-2xl shadow-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">
                Resumo da Biodiversidade Marinha
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {/* MOCK: Estatísticas gerais - substituir por API */}
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">5.247</div>
                  <p className="text-sm opacity-90">Espécies Catalogadas</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">342</div>
                  <p className="text-sm opacity-90">Ameaçadas</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">1.8M</div>
                  <p className="text-sm opacity-90">Avistamentos</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">94%</div>
                  <p className="text-sm opacity-90">Precisão IA</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: RELATÓRIOS */}
        {activeTab === "relatorios" && (
          <div className="space-y-6">
            {/* MOCK: Lista de relatórios - substituir por dados reais */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-[#def3f6]">
                <h2 className="text-2xl font-bold text-[#064273]">
                  Relatórios Disponíveis
                </h2>
                <p className="text-[#76b6c4]">
                  Análises e previsões geradas pela IA
                </p>
              </div>

              <div className="divide-y divide-[#def3f6]">
                {/* MOCK: Item de relatório - repetir estrutura para mais relatórios, deve ser transformado em componente para melhor utilização */}
                <div className="p-6 hover:bg-[#def3f6] transition-colors cursor-pointer">
                  <div className="flex flex-col md:flex-row gap-2 items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#1da2d8] rounded-xl flex items-center justify-center text-white">
                        <FileText size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#064273]">
                          Previsão de Tsunami - Pacífico Norte
                        </h3>
                        <p className="text-sm text-[#76b6c4]">
                          Análise preditiva para próximas 72h
                        </p>
                        <p className="text-xs text-[#76b6c4] mt-1">
                          Gerado em: 01/06/2026 08:30
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-semibold">
                        Baixo Risco
                      </span>
                      <button className="px-4 py-2 bg-[#1da2d8] text-white rounded-lg hover:bg-[#064273] transition-colors">
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6 hover:bg-[#def3f6] transition-colors cursor-pointer">
                  <div className="flex flex-col md:flex-row gap-2 items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#1da2d8] rounded-xl flex items-center justify-center text-white">
                        <FileText size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#064273]">
                          Análise de Correntes - Atlântico Sul
                        </h3>
                        <p className="text-sm text-[#76b6c4]">
                          Mudanças detectadas nas correntes marinhas
                        </p>
                        <p className="text-xs text-[#76b6c4] mt-1">
                          Gerado em: 31/05/2026 14:20
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-semibold">
                        Atenção
                      </span>
                      <button className="px-4 py-2 bg-[#1da2d8] text-white rounded-lg hover:bg-[#064273] transition-colors">
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6 hover:bg-[#def3f6] transition-colors cursor-pointer">
                  <div className="flex flex-col md:flex-row gap-2 items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#1da2d8] rounded-xl flex items-center justify-center text-white">
                        <FileText size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#064273]">
                          Temperatura Oceânica Global - Maio 2026
                        </h3>
                        <p className="text-sm text-[#76b6c4]">
                          Relatório mensal de variações térmicas
                        </p>
                        <p className="text-xs text-[#76b6c4] mt-1">
                          Gerado em: 01/06/2026 00:00
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold">
                        Informativo
                      </span>
                      <button className="px-4 py-2 bg-[#1da2d8] text-white rounded-lg hover:bg-[#064273] transition-colors">
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6 hover:bg-[#def3f6] transition-colors cursor-pointer">
                  <div className="flex flex-col md:flex-row gap-2 items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#1da2d8] rounded-xl flex items-center justify-center text-white">
                        <FileText size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#064273]">
                          Alerta de Furacão - Caribe
                        </h3>
                        <p className="text-sm text-[#76b6c4]">
                          Formação tropical detectada - Categoria 3 prevista
                        </p>
                        <p className="text-xs text-[#76b6c4] mt-1">
                          Gerado em: 31/05/2026 22:15
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-semibold">
                        Alto Risco
                      </span>
                      <button className="px-4 py-2 bg-[#1da2d8] text-white rounded-lg hover:bg-[#064273] transition-colors">
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* MOCK: Card de estatísticas de relatórios */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <FileText size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#064273]">
                      Total de Relatórios
                    </h3>
                  </div>
                </div>
                <div className="text-4xl font-bold text-[#1da2d8]">1.247</div>
                <p className="text-sm text-[#76b6c4] mt-2">Gerados este mês</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <TrendingUp size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#064273]">Precisão Média</h3>
                  </div>
                </div>
                <div className="text-4xl font-bold text-green-600">96.4%</div>
                <p className="text-sm text-[#76b6c4] mt-2">
                  Nas previsões validadas
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <AlertTriangle size={24} className="text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#064273]">Alertas Ativos</h3>
                  </div>
                </div>
                <div className="text-4xl font-bold text-yellow-600">12</div>
                <p className="text-sm text-[#76b6c4] mt-2">Requerem atenção</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
