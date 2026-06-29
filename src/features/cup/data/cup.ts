export interface CupMatch {
  id: string;
  date: string;
  venue: string;
  home: string;
  homeCode: string;
  away: string;
  awayCode: string;
  matchNumber: number;
}

export interface CupArticle {
  id: string;
  title: string;
  summary: string;
}

export const upcomingMatches: CupMatch[] = [
  { id: "m74", date: "29 jun", venue: "Boston Stadium", home: "Alemanha", homeCode: "ALE", away: "Paraguai", awayCode: "PAR", matchNumber: 74 },
  { id: "m75", date: "29 jun", venue: "Estadio Monterrey", home: "Holanda", homeCode: "HOL", away: "Marrocos", awayCode: "MAR", matchNumber: 75 },
  { id: "m76", date: "29 jun", venue: "Houston Stadium", home: "Brasil", homeCode: "BRA", away: "Japão", awayCode: "JAP", matchNumber: 76 },
];

export const cupArticles: CupArticle[] = [
  { id: "copa-brasil-japao", title: "Brasil x Japão: os caminhos para controlar o mata-mata", summary: "Velocidade pelos lados e pressão na saída devem definir o duelo em Houston." },
  { id: "copa-alemanha-paraguai", title: "Alemanha e Paraguai abrem a rodada decisiva de segunda", summary: "Confronto em Boston coloca posse de bola e força defensiva frente a frente." },
  { id: "copa-holanda-marrocos", title: "Holanda x Marrocos promete um dos jogos mais equilibrados", summary: "As duas seleções chegam ao mata-mata com sistemas compactos e transição rápida." },
];

export const fifaScheduleUrl = "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/match-schedule-fixtures-results-teams-stadiums";
