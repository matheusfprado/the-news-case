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
- Adicionar um livro não deveria exigir digitação manual de todos os dados.
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
- Adição por modal sem cadastro manual.
- Exclusão por gesto de arrastar.
- Atualização de páginas e percentual.
- Sessão de leitura com timer.

## Decisões de produto

- **Mobile como plataforma principal:** a interface permanece limitada a 430 px até no desktop, simulando o aplicativo.
- **Biblioteca vazia por padrão:** demonstra onboarding e evita conteúdo artificial apresentado como dado do usuário.
- **Catálogo externo:** reduz fricção e melhora a qualidade dos dados adicionados.
- **Ações contextuais:** adição usa modal; leitura e progresso usam telas dedicadas.
- **Feedback imediato:** filtros, checklists, toasts, loading e erros respondem diretamente às ações.

## Decisões de engenharia

- React 18 e TypeScript estrito.
- Tailwind CSS puro, sem shadcn/ui ou Radix UI.
- Componentes separados por domínio.
- Contratos explícitos para payload externo e modelos internos.
- `AbortController` e debounce nas buscas.
- Portals para modais e telas que não podem ser recortados pelo shell.
- Elementos semânticos, labels e `aria-label` nas ações de ícone.
- Sem `any` e sem dependências desnecessárias.

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

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Ambiente local |
| `npm run lint` | Validação estática |
| `npm run build` | Typecheck e build de produção |
| `npm run preview` | Preview da build |

## Rotas

| Rota | Situação |
| --- | --- |
| `/habitos` | Implementada |
| `/biblioteca` | Implementada |
| `/inicio` | Placeholder |
| `/copa` | Placeholder |
| `/mais` | Placeholder |

## Arquitetura resumida

```text
src/
  app/             bootstrap, rotas, páginas globais e estilos
  features/
    habits/        componentes, dados, regras e página de hábitos
    library/       catálogo, livros, timer, progresso e integração
  shared/
    components/    layout e primitivas reutilizáveis
    lib/           utilitários sem dependência de domínio
```

Detalhes: [Arquitetura](docs/ARCHITECTURE.md) · [API e integração](docs/API.md) · [Case completo](docs/CASE-STUDY.md)

## Persistência e escopo

Este case é um frontend sem autenticação e sem backend próprio:

- Livros e progresso ficam em estado React e são reiniciados ao recarregar.
- O timer é reiniciado ao fechar a tela.
- O check-in semanal usa `localStorage`.
- Catálogo, capas e recomendações dependem da Open Library.

Essa separação é intencional: a implementação demonstra o fluxo completo sem fingir uma persistência inexistente. A documentação de API descreve os contratos necessários para evolução.

## Qualidade e validação

Antes da entrega:

```bash
npm run lint
npm run build
```

Também foram considerados:

- viewport mobile e ausência de overflow horizontal;
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
