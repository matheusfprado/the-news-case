export type ArticleCategory = "destaques" | "brasil" | "mundo" | "negócios" | "tecnologia" | "esportes";

export interface EditionArticle {
  id: string;
  category: ArticleCategory;
  title: string;
  summary: string;
  content: string[];
  readingMinutes: number;
}

export const editionCategories: Array<{ value: ArticleCategory | "salvos"; label: string }> = [
  { value: "destaques", label: "Destaques" },
  { value: "brasil", label: "Brasil" },
  { value: "mundo", label: "Mundo" },
  { value: "negócios", label: "Negócios" },
  { value: "tecnologia", label: "Tecnologia" },
  { value: "esportes", label: "Esportes" },
  { value: "salvos", label: "Salvos" },
];

export const editionArticles: EditionArticle[] = [
  {
    id: "brasil-japao-mata-mata",
    category: "esportes",
    title: "Brasil encara o Japão no primeiro mata-mata da Copa",
    summary: "A Seleção entra na fase eliminatória com pressão alta, ataque móvel e pouco espaço para erro.",
    content: [
      "O confronto abre uma nova etapa para a Seleção: agora, qualquer detalhe pode definir a permanência no torneio.",
      "A comissão técnica trabalha com variações no meio-campo e atenção especial às transições rápidas do Japão.",
    ],
    readingMinutes: 3,
  },
  {
    id: "automacao-pequenas-empresas",
    category: "tecnologia",
    title: "Pequenas empresas aceleram a automação de tarefas",
    summary: "Atendimento, análise de vendas e produção de conteúdo puxam a adoção entre negócios menores.",
    content: [
      "Ferramentas mais simples e baratas reduziram a barreira de entrada para equipes sem área técnica dedicada.",
      "O desafio agora é organizar dados, revisar resultados e criar regras claras para o uso responsável.",
    ],
    readingMinutes: 4,
  },
  {
    id: "pagamentos-recorrentes",
    category: "negócios",
    title: "Pagamentos automáticos redesenham a disputa pelas assinaturas",
    summary: "Empresas ajustam cobrança e benefícios para reduzir cancelamentos e manter clientes ativos.",
    content: [
      "A conveniência aumenta, mas transparência e controle continuam decisivos para conquistar a confiança do consumidor.",
      "Modelos flexíveis, pausas e alertas antes da cobrança ganham espaço nas experiências mais bem avaliadas.",
    ],
    readingMinutes: 3,
  },
  {
    id: "cidades-calor",
    category: "brasil",
    title: "Cidades aceleram planos para enfrentar ondas de calor",
    summary: "Mais sombra, áreas verdes e alertas de saúde entram no planejamento urbano de capitais brasileiras.",
    content: [
      "As medidas combinam intervenções de longo prazo com protocolos rápidos para escolas, postos de saúde e transporte.",
      "Especialistas defendem que os bairros mais vulneráveis recebam prioridade nos investimentos.",
    ],
    readingMinutes: 4,
  },
  {
    id: "semana-global",
    category: "mundo",
    title: "A semana global em cinco movimentos para acompanhar",
    summary: "Comércio, energia, eleições e tecnologia concentram as decisões que podem mexer com os mercados.",
    content: [
      "Negociações comerciais e novas regras digitais seguem no centro da agenda internacional.",
      "O impacto no Brasil passa por câmbio, exportações e custos de tecnologia para empresas e consumidores.",
    ],
    readingMinutes: 5,
  },
  {
    id: "trabalho-hibrido",
    category: "destaques",
    title: "O trabalho híbrido entra em uma fase mais pragmática",
    summary: "Empresas trocam regras genéricas por acordos definidos conforme equipe, tarefa e resultado esperado.",
    content: [
      "A discussão deixa de ser apenas sobre presença e passa a considerar colaboração, concentração e custo de deslocamento.",
      "Equipes maduras documentam decisões e reservam os encontros presenciais para atividades que realmente se beneficiam deles.",
    ],
    readingMinutes: 4,
  },
];
