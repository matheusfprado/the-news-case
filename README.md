# The News App — Case Front-end

Redesign mobile de duas experiências do The News: acompanhamento de hábitos e biblioteca pessoal de leitura.

O projeto foi desenvolvido como um produto navegável, não apenas como reprodução visual. Há busca real de livros, filtros, gestos mobile, timer, atualização de progresso e estados vazios.

## Visão rápida para avaliação

Em aproximadamente cinco minutos:

1. Abra `/habitos` e conclua ou desmarque hábitos.
2. Faça o check-in disponível no dia atual.
3. Abra `/biblioteca`; ela começa vazia intencionalmente.
4. Toque em `+`, pesquise um livro e escolha uma prateleira.
5. Troque entre `Lendo`, `Quero Ler`, `Estante` e `Abandonados`.
6. Arraste um livro para a esquerda para revelar a exclusão.
7. Abra um livro para atualizar o progresso.
8. Em um livro que está sendo lido, use o fluxo de timer.

## Problema do case

A proposta foi tornar hábitos e biblioteca menos passivos:

- Hábitos precisavam comunicar consistência diária rapidamente.
- A biblioteca precisava começar útil mesmo sem conteúdo cadastrado.
- A experiência deveria manter linguagem de aplicativo mobile.
- A interface precisava continuar funcional, acessível e tipada.

## Solução entregue

### Hábitos

- Visão resumida de sequência, conclusão diária e média semanal.
- Checklist interativo com progresso circular.
- Gráfico da semana.
- Check-in liberado somente no dia atual.
- Registro semanal salvo no navegador.

### Biblioteca

- Estado inicial sem livros.
- Busca real por título, autor ou ISBN via Open Library.
- Capas e metadados vindos da API.
- Recomendações remotas.
- Organização por status de leitura.
- Atualização de páginas e percentual.

## Decisões de produto

- **Mobile como plataforma principal:** a interface foi projetada para reproduzir a experiência de um aplicativo, mantendo largura máxima de 430 px inclusive em navegadores desktop.
- **Biblioteca vazia por padrão:** demonstra onboarding e evita conteúdo artificial apresentado como dado do usuário.
- **Catálogo externo:** reduz fricção e melhora a qualidade dos dados adicionados.
- **Feedback imediato:** filtros, checklists, toasts, loading e erros respondem diretamente às ações.

## Decisões de engenharia

- React 18 e TypeScript estrito.
- Tailwind CSS.
- Componentes separados por domínio.
- Contratos explícitos para payload externo e modelos internos.
- `AbortController` e debounce nas buscas.
- Elementos semânticos, labels e `aria-label` nas ações de ícone.

## Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Lucide React
- Sonner
- Open Library Search API e Covers API

## Como executar

Pré-requisitos: Node.js 20+ e npm 10+.

```bash
npm install
npm run dev
```

As variáveis são opcionais. Para customizar os endpoints:

```powershell
Copy-Item .env.example .env.local
```

## Scripts

| Comando           | Descrição                     |
| ----------------- | ----------------------------- |
| `npm run dev`     | Ambiente local                |
| `npm run dev:web` | Somente o frontend            |
| `npm run dev:api` | Somente a API com reload      |
| `npm run server`  | API sem reload                |
| `npm run lint`    | Validação estática            |
| `npm run build`   | Typecheck e build de produção |
| `npm run preview` | Preview da build              |

## Rotas

| Rota          | Situação                                       |
| ------------- | ---------------------------------------------- |
| `/habitos`    | Implementada                                   |
| `/biblioteca` | Implementada                                   |
| `/inicio`     | Edição diária, categorias, leitura e salvos    |
| `/copa`       | Agenda, lembretes, chaveamento e notícias      |
| `/mais`       | Salvos, lembretes, preferências e dados locais |

## Arquitetura resumida

```text
src/
  app/             bootstrap, rotas, páginas globais e estilos
  features/
    habits/        componentes, dados, regras e página de hábitos
    library/       catálogo, livros, timer, progresso e integração
    edition/       edição diária, categorias e leitura
    cup/           agenda da Copa, chaveamento e notícias
    more/          salvos, preferências e privacidade
  shared/
    components/    layout e primitivas reutilizáveis
    lib/           utilitários sem dependência de domínio
```

## Persistência e escopo

Este protótipo usa uma API Node local, sem autenticação:

- Os dados são sincronizados em `server/data/store.json` por um ID anônimo do navegador.
- O `localStorage` continua como fallback quando a API estiver indisponível.
- O timer mantém o tempo correto ao fechar a tela ou recarregar o aplicativo.
- Hábitos diários e check-ins semanais são persistidos por data.
- Notícias salvas, lembretes da Copa e preferências também usam `localStorage`.
- Catálogo, capas e recomendações dependem da Open Library.
- A agenda da Copa usa um recorte do [calendário oficial da FIFA](https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/match-schedule-fixtures-results-teams-stadiums), atualizado em 28 de junho de 2026.

Essa separação é intencional: a implementação demonstra o fluxo completo sem fingir uma persistência inexistente. A documentação de API descreve os contratos necessários para evolução.

## Qualidade e validação

Antes da entrega:

```bash
npm run lint
npm run build
```

Também foram considerados:

- áreas de toque e feedback visual;
- navegação por teclado em botões e formulários;
- loading, vazio e erro na integração externa;
- cancelamento de requisições obsoletas;
- conteúdo não oculto pela navegação fixa.

## Próximas evoluções

- Backend e autenticação.
- Persistência de biblioteca e sessões.
- Sincronização entre dispositivos.
- Testes automatizados de interação.
- Implementação das áreas Início, Copa e Mais.
- Alternativa visível ao swipe para acessibilidade completa.

## Design

A interface foi construída a partir das referências visuais fornecidas para o case. Não foi disponibilizado arquivo público do Figma.
