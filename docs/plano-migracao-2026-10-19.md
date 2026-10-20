# Plano de atualização de garantias e garantiasAPI

Revisão local em 19/10/2026. Referências: `garantias` em `e2c2f83` e `garantiasAPI` em `9ee0d3a`. Ambos estavam sem alterações versionadas no início. Nenhuma dependência ou aplicação foi modificada nesta revisão.

## Decisão recomendada

Atualizar incrementalmente, preservando o contrato HTTP e os dados. Primeiro obter instalação e testes reproduzíveis; aplicar correções de segurança compatíveis; depois migrar runtime, frontend, persistência e servidor HTTP em mudanças separadas. Não executar `npm audit fix --force` nem atualizar todos os pacotes para `latest` em um único lote.

Destino principal: **Node 24 LTS, Next 16, React 19, Express 5 e Mongoose 9**, com os patches indicados abaixo e homologação obrigatória. Mongoose 9 depende de confirmar/atualizar o MongoDB real. TypeScript 7 fica fora do primeiro ciclo por incompatibilidade declarada do parser de lint. MUI e serviços externos terão ciclos próprios.

“Sem quebrar nada” é um critério de aceitação a demonstrar, não uma garantia possível pela leitura do código. Ainda não há testes suficientes para afirmar equivalência dos fluxos comerciais.

## Versões observadas e destino

Versões atuais conferidas no package-lock e node_modules; versões publicadas consultadas no registro público npm em 19/10/2026. São uma fotografia da consulta, não uma instrução para instalar `latest` no futuro. Fixar versões exatas e registrar o lockfile de cada etapa.

- **Node:** shell 22.14.0; pacote `node` instalado no frontend 22.3.0 e na API 22.6.0. Destino **24.22.0 LTS**, com npm 11.19.1 distribuído nessa release. O Node 26.12.0 é mais novo, mas ainda Current na data da revisão. Registrar o Node efetivo de produção antes da mudança. [Releases oficiais](https://nodejs.org/en/about/previous-releases), [índice de distribuições](https://nodejs.org/dist/index.json).
- **Next:** frontend 14.2.3 e API 14.2.7. Destino frontend **16.4.2**, com `eslint-config-next` igual. Na API, remover Next após substituir seu uso em uploads, em vez de carregar um framework de frontend desnecessário. [Registro](https://registry.npmjs.org/next/latest), [política de suporte](https://nextjs.org/support-policy).
- **React / React DOM:** 18.3.1 → **19.3.1**, juntos e com os tipos alinhados. Validar peers de toda a camada visual antes. [Registro](https://registry.npmjs.org/react/latest).
- **TypeScript:** 5.4.5 → **5.9.3 como ponte**, depois **6.0.3** em mudança específica. O latest consultado é 7.0.2, mas `@typescript-eslint/parser` 8.71.2 declara `>=4.8.4 <6.1.0`. Não forçar essa incompatibilidade. Preparar `tsconfig` antes do 6: hoje há `target: es5` e `moduleResolution: node`. Avaliar `target` moderno e `moduleResolution: bundler` com build e tipos, sem apenas silenciar depreciações. [TypeScript](https://registry.npmjs.org/typescript), [parser](https://registry.npmjs.org/@typescript-eslint/parser/latest).
- **Material UI / icons:** 5.15.18 → patch **5.18.0** como ponte com peer React 19; depois 6 → 7 → **9.5.0**, alinhando os dois pacotes. Material UI não tem major 8 nessa sequência. Date Pickers: 7.5.1 → versão intermediária com peers compatíveis → **9.15.0**. O picker 9 exige Material UI `^7.3.0 || ^9.0.0`. [Guia v9](https://mui.com/material-ui/migration/upgrade-to-v9/), [alinhamento de majors](https://mui.com/blog/introducing-mui-v9/), [peers dos pickers](https://registry.npmjs.org/@mui/x-date-pickers/latest).
- **Express:** 4.19.2 → último patch 4.x para contenção → **5.3.0**, em etapa independente. [Registro](https://registry.npmjs.org/express/latest).
- **Mongoose:** 5.13.22 → 6 → 7 → 8 → **9.11.2**, com testes em cada major. As versões intermediárias são checkpoints técnicos, não destinos duradouros. [Guia v9](https://mongoosejs.com/docs/migrating_to_9.html).
- **Lint:** ESLint 8.57.0 no frontend, 7.32.0 na API. Migrar configuração e plugins para flat config; ESLint 9 pode ser ponte para **10.13.0**, somente com peers compatíveis. O parser 8.71.2 aceita ESLint 8.57/9/10; isso não prova compatibilidade de todos os demais plugins. Não levar a configuração Airbnb antiga da API para ESLint 10 sem adaptação.
- **Testes:** Jest 26.6.3 → **30.5.2**, com migração de configuração e mocks; Playwright 1.44.1 → versão estável compatível, reinstalando seus navegadores e verificando o peer opcional do Next (>=1.51.1 na consulta). A API deve continuar CommonJS neste ciclo.
- **Integrações:** `@vercel/blob` 0.23.4 → **2.8.2**, Firebase 10.14.1 → **13.0.0**, em lotes próprios e somente onde usados. JWT, Nodemailer, Helmet, rate-limit, Passport, PDFKit e demais pacotes exigem revisão individual de changelog/peers; não foram certificados para suas novas majors nesta revisão.
- **PWA:** `next-pwa` já está no latest consultado, 5.6.0. Isso não comprova compatibilidade com Next 16. A estratégia inicial é preservar Webpack e testar; se o plugin falhar, concluir sua substituição em etapa dedicada antes de promover o Next novo.

## Evidências locais que condicionam a migração

### 1. Execução e instalação não são reproduzíveis entre ambientes

Frontend: `.github/workflows/e2e.yml` usa Node 18, enquanto package.json instala um pacote `node` 22.x. API: `engines.node >=12`, Travis com Node 12, Docker `node:alpine` sem versão. Pacote npm `node` não fixa o runtime da hospedagem e pode alterar qual executável é usado por scripts.

API também apresenta caminhos incoerentes:

- `start` executa `node index.js`, mas o arquivo está em `src/index.js`.
- `build` chama Webpack com `webpack.config.js`, inexistente no checkout; Webpack também não está declarado como ferramenta de build direta.
- Docker copia `yarn.lock`, inexistente, apesar de existir `package-lock.json`.
- PM2 aponta para `src/index.js`; Vercel também aponta para esse arquivo, que conecta ao banco e chama `listen`.
- O frontend não possui `engines`/arquivo de versão; há lock npm v3, e na API lock v2.

Escolher npm nos dois projetos, `npm ci`, arquivo de versão, `engines`, `packageManager` e imagem Docker fixa. Remover `node` de dependencies depois de provisionar o runtime real. Não converter o lockfile da API incidentalmente junto da migração do banco. Determinar qual dos caminhos Vercel/PM2/Docker é usado; adaptar o entrypoint ao modo de execução efetivo, sem presumir que a configuração versionada representa produção.

### 2. Next tem mudanças obrigatórias no código

Foram encontrados 35 arquivos `page.tsx`/`layout.tsx` com declarações síncronas de `params` (busca textual; inclui layouts, não significa 35 falhas executadas). Há 35 páginas no App Router. Exemplos: `src/app/[language]/layout.tsx` e `src/app/[language]/[id]/page.tsx`.

Migrar `params` e `searchParams` nas bordas do servidor, inclusive `generateMetadata`; passar objetos já resolvidos para componentes cliente. Revisar `src/services/api/types/propsType.ts` e os spreads de props. Não transformar indiscriminadamente os componentes cliente em funções assíncronas. Na página `[id]/sign-up`, substituir a mutação de `params.returnToPath` por valor derivado.

`next.config.js` usa next-pwa, configuração `eslint` e `images.domains`. No Next 16: usar ESLint CLI separado, retirar a configuração removida e adotar `remotePatterns` restritos para imagens. Preservar inicialmente `next dev --webpack` / `next build --webpack` durante a validação da PWA. A flag evita a troca simultânea de bundler, mas não garante que next-pwa funcione.

Migrar `src/middleware.ts` para `proxy.ts` quando homologar a mudança de runtime, preservando idioma, query string e encaminhamento de Authorization. Essa convenção está depreciada, não é necessário tratá-la como remoção imediata. Mudanças de cache devem ser verificadas nos fetches de servidor; muitos fetches deste projeto são executados no cliente e não recebem automaticamente as mesmas regras de cache do Next.

Não habilitar React Compiler, Cache Components ou outra mudança arquitetural durante a atualização básica. [Next 15](https://nextjs.org/docs/app/guides/upgrading/version-15), [Next 16](https://nextjs.org/docs/app/guides/upgrading/version-16).

### 3. UI precisa de regressão visual

39 arquivos importam `@mui/material/Grid`; há uso de `item`, `xs` e APIs experimentais de tema, incluindo `Experimental_CssVarsProvider` e `experimental_extendTheme`. Migrar tema, Grid e pickers com os guias de cada major. Validar temas por cliente, claro/escuro, mobile, datas, locale e formulários. Atualizar primeiro os patches/peers necessários ao React 19; fazer a migração visual completa separadamente do Next. [MUI v7](https://mui.com/material-ui/migration/upgrade-to-v7/), [MUI v9](https://mui.com/material-ui/migration/upgrade-to-v9/).

### 4. Express 5 quebraria partes concretas da API atual

- `src/app.js`: `app.options('*', cors())` precisa de wildcard nomeado, incluindo a raiz quando necessário, por exemplo `/{*splat}`.
- `src/middlewares/validate.js`: `Object.assign(req, value)` pode atribuir a `req.query`, que passa a ser getter. Usar dados validados próprios e adaptar os consumidores.
- `xss-clean` instalado atribui diretamente a `req.query`; o pipeline de sanitização deve ser substituído/adaptado, preservando proteção e validação.
- Revisar `express-mongo-sanitize`, parser de query, preflight, 404 e tratamento de erros. JSON de filtros/sort, paginação e payloads precisam manter o contrato.
- Há duas configurações CORS no app (restrita e depois genérica); congelar o comportamento esperado e testar antes de ajustar.

[Guia oficial Express 5](https://expressjs.com/en/guide/migrating-5/).

### 5. Mongoose e MongoDB são o maior risco de persistência

- `src/config/config.js`: remover `useCreateIndex`, `useNewUrlParser` e `useUnifiedTopology` na transição para Mongoose 6.
- `.remove()` em auth, usuário, SKU e garantia: substituir pelos métodos suportados, conferindo hooks e retornos.
- `.update()` em impressão e mensagens: migrar para operações explícitas e validar documentos gravados e retornos.
- Hooks `pre('save', async function(next))` em user, client, SKU e garantia: retirar `next()` antes de Mongoose 9 e testar hash de senha e efeitos derivados.
- Fixtures usam `mongoose.Types.ObjectId()` sem `new`, outro ponto a adaptar.
- Fixar/testar a semântica de `strictQuery`, populate, ids, undefined, resultados de updates e serialização. Comparar documentos reais anonimizados, não somente schemas artificiais.
- Compose declara MongoDB **4.2.1**. A tabela oficial não lista MongoDB 4.2 como compatível com Mongoose 9. A versão de produção não foi consultada.

Confirmar primeiro o MongoDB em produção. Se antigo, planejar sua atualização como operação separada, conforme versão, FCV e caminho suportado pelo fornecedor; não trocar simplesmente a imagem 4.2 por 8 sobre o volume existente. Usar snapshot/clone e ensaio de restauração. Um Mongoose intermediário compatível pode servir de ponte; a matriz oficial admite Mongoose 8 tanto para 4.2 quanto, a partir de 8.7, para MongoDB 8. Escolher versões exatas pelo caminho real, sem inferir suporte do servidor apenas pela compatibilidade do driver.

[Mongoose 6](https://mongoosejs.com/docs/migrating_to_6.html), [7](https://mongoosejs.com/docs/migrating_to_7.html), [8](https://mongoosejs.com/docs/migrating_to_8.html), [9](https://mongoosejs.com/docs/migrating_to_9.html), [matriz MongoDB](https://mongoosejs.com/docs/compatibility.html).

### 6. Remover dependências exige verificar o uso

Next não está totalmente sem uso na API: `src/services/files.service.js` cria `NextResponse` em erros. Converter esses caminhos para `ApiError`/resposta Express e testar upload sem arquivo, erro de multipart, falha do Blob e sucesso antes de removê-lo.

`aws-sdk` está declarado, mas não encontrei import em `src`/`bin`. Verificar scripts e deploy; remover se não usado, ou migrar usos reais ao SDK v3. AWS SDK v2 está fora de suporte. `latest`, ferramentas de deploy e dependências de teste também devem ser classificadas antes de removidas/movidas. [AWS SDK v2](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/welcome.html).

Há um módulo de Twilio no frontend que envia mensagem ao ser importado (`src/services/api/services/twilio.ts`); não encontrei consumidor na busca realizada. Confirmar uso antes do build isolado e mover efeitos para chamadas explícitas de servidor, se ativo. Não disparar mensagens reais para testar upgrades.

### 7. Os testes atuais não representam integralmente o produto

- Frontend tem quatro arquivos E2E de autenticação, sem cobertura dedicada dos principais fluxos de garantia, QR, impressão e upload.
- `playwright-tests/helpers/api-requests.ts` chama `/v1/auth/email/register` e espera 204. A API local expõe `/v1/auth/register`; portanto o helper precisa ser reconciliado com o contrato real antes de servir de gate.
- Fixtures e testes de usuário da API ainda usam `name` e papel textual, enquanto o modelo exige `firstName` e `lastName` e o produto possui contrato próprio de papéis.
- `src/models/whats.model.js` importa `node:test` com `run` sem uso encontrado; isso impediu o Jest 26 de carregar a suíte de User.
- O helper de integração apaga coleções com `deleteMany()`. Configurar URI explícita de banco descartável e uma trava que rejeite qualquer banco fora da allowlist de testes. O sufixo `-test` concatenado à URL não é isolamento confiável, especialmente com query string.
- Playwright depende de API e IMAP externos. O workflow inicia o frontend, mas não provisiona esta API/banco/email de teste.
- `use-fetch-base.ts` usa refresh token sem Bearer em um caminho; o Passport usa access token Bearer. Há consumidores com autenticação própria. Caracterizar cada rota e seus tokens com testes antes de unificar qualquer comportamento.

## Verificações executadas

Executadas nas dependências já instaladas, com Node do shell 22.14.0; não equivalem a `npm ci` limpo nem validam Node 24.

- Frontend: `node node_modules/typescript/bin/tsc --noEmit --incremental false --pretty false` — **passou**.
- Frontend: `node node_modules/next/dist/bin/next lint --no-cache` — **passou**, sem avisos.
- API: ESLint via CLI local — **34 erros, 1 aviso**, 85 arquivos avaliados.
- API: três suítes unitárias sem conexão de banco selecionadas (error, toJSON, user), com NODE_ENV e URI local fictícia definidos no processo. **Duas suítes passaram, 16 testes passaram; uma suíte falhou no carregamento de `node:test`**. Não são 16 testes cobrindo a API inteira. A primeira tentativa teve erro de cache do sandbox; o resultado funcional acima veio da repetição com cache sob node_modules.
- `npm audit --json --ignore-scripts`: frontend **87 apontamentos** (6 críticos, 52 altos, 25 moderados, 4 baixos); API **146** (12 críticos, 94 altos, 28 moderados, 12 baixos).

Os números do audit incluem dependências transitivas e de desenvolvimento e não correspondem a essa quantidade de falhas distintas exploráveis em produção. Avaliar alcance e grafo de cada advisory. Next aparece crítico nos dois; Mongoose aparece crítico na API. As sugestões automáticas incluem downgrades para next-pwa, imap e aws-sdk: não aplicá-las mecanicamente. O audit sugeriu Next 14.2.35 no frontend como correção dentro da major; essa é uma contenção candidata, não um destino suportado nem certificação de ausência de vulnerabilidades.

Não executei build completo, E2E, integração com banco, deploy, envio de mensagens ou upload real. Isso depende de homologação isolada e confirmação de serviços/endpoints. Não consultei dados nem segredos de produção.

## Sequência de execução e gates

Cada etapa deve ser uma mudança pequena, revisável e reversível. Etapas intermediárias podem permanecer na branch de migração; não é necessário publicar cada major intermediária em produção.

1. **Base reproduzível e contratos.** Registrar runtime/deploy real, versões de banco, envs por nome (sem valores), snapshots e artefatos atuais. Corrigir scripts/start/Docker/CI, alinhar gerenciador e lockfiles, eliminar import acidental de `node:test`, atualizar fixtures e rotas E2E. Corrigir lint existente ou documentar exceções específicas. Provisionar banco descartável, email de teste e mocks de Blob/Twilio. Gate: `npm ci`, tipos, lint e testes reais verdes na versão atual.
2. **Contenção de segurança.** Atualizar patches compatíveis e tratar advisories prioritários, com Next/config alinhados. Não aguardar toda a migração de MongoDB para corrigir o frontend. Gate: audit revisado e fluxos críticos preservados. Se um advisory não tiver correção na major atual, acelerar a etapa correspondente ou documentar mitigação temporária.
3. **Runtime.** Homologar Node 24.22.0 separadamente em cada serviço; remover o pacote npm `node`, fixar npm/runtime/CI/Docker/hospedagem. Se a stack antiga bloquear Node 24, manter temporariamente Node 22 LTS atualizado enquanto migra o componente bloqueador; não forçar uma combinação não validada. Gate: instalação limpa, inicialização, testes, build e comparativo de memória/latência. Registrar `process.version` e `process.execPath` efetivos.
4. **Preparação frontend.** Atualizar peers de React (MUI 5.18 e versão compatível dos pickers/scanner/virtuoso etc.), testar ainda em React 18, preparar TypeScript 5.9.3 e configuração de lint compatível. Gate: formulários, tema, câmera e navegação sem regressões; não usar `--legacy-peer-deps` para esconder incompatibilidades.
5. **Next/React.** Next 14 corrigido → último 15 estável como checkpoint, com React 19, async params e testes → Next 16.4.2. Revisar codemods, usar Webpack inicialmente, adaptar ESLint, imagens e proxy. Gate: build de produção e E2E passando contra API de homologação; testes de PWA instalada com cache da versão anterior. Caso next-pwa impeça esse gate, substituí-lo antes da promoção.
6. **Persistência API.** Mongoose 5 → 6 → 7 → 8 → 9, com migração do MongoDB coordenada no ponto compatível. Preservar Express 4 enquanto essa etapa é validada. Gate: CRUD, filtros, serialização, auth, geração/atribuição de garantias e PDFs equivalentes, sem alterações inesperadas nos documentos/índices. Não executar `syncIndexes()` destrutivo automaticamente.
7. **Express 5.** Migrar wildcard, validação, sanitização, query e erros; atualizar middlewares associados em lotes controlados. Gate: contratos/status/headers preservados, CORS/preflight, tokens inválidos/expirados, multipart e segurança de filtros cobertos.
8. **Bibliotecas restantes.** Material UI 6 → 7 → 9 e MUI X, Blob, Firebase, JWT/email, ferramentas de teste/lint, TypeScript 6 e demais bibliotecas. Não misturar mudança de CSS, ESM ou bundler com a atualização funcional. Gate por integração. TypeScript 7 só entra após uma solução oficialmente compatível com o conjunto de ferramentas e validação própria.
9. **Produção gradual.** Publicar um serviço por vez, com contratos compatíveis entre versão nova e anterior. Usar canário/tráfego controlado quando disponível, observar um ciclo operacional completo e só então concluir. Depois avaliar Turbopack/PWA nova/otimizações em trabalho independente.

## Testes mínimos antes de cada promoção

- Login, logout, expiração, refresh, recuperação de senha, autorização por papel e acesso entre usuários/clientes.
- Registro e confirmação de telefone/código, cadastro/consulta/edição/exclusão de garantia e SKU, atribuição e conferência.
- Filtros, sort, paginação e JSON de resposta: IDs, datas, nulos, contagens, tipos e erros iguais aos contratos aprovados.
- Upload válido, sem arquivo, grande, inválido e falha do armazenamento; download/impressão de PDF, QR gerado e leitura por câmera real.
- Idioma e links profundos, query strings, retorno após login, tema por cliente, claro/escuro, datas e telas mobile.
- PWA: instalação, offline previsto, atualização do service worker, troca de usuário/logout e acesso após deploy/rollback. Dados autenticados não podem reaparecer pelo cache após logout.
- Frontend antigo + API nova e frontend novo + API anterior, onde forem combinações possíveis durante publicação/rollback.
- Comparar taxa de 5xx, falhas de autenticação, p95, memória, conexões de banco e duração de operações com a linha de base. Definir limiares a partir do comportamento medido, não números arbitrários.

## Retorno à versão anterior

Guardar imagem/artefato anterior, configuração de runtime e lockfile, além de tag/commit. Em falha, reverter primeiro o serviço alterado e validar os fluxos. Evitar mudanças destrutivas de schema; preferir expansão compatível, migração em segundo momento e remoção só após período de compatibilidade.

Rollback de código não reverte upgrade de MongoDB, FCV, índices ou dados. O plano do banco exige procedimento próprio testado de restauração/failback e tratamento das gravações posteriores ao snapshot. PWA também exige estratégia explícita de atualização/invalidação: reverter apenas o servidor pode deixar um service worker novo no navegador.

## Informações pendentes para implementar

Confirmar hospedagem e Node efetivos dos dois serviços, versão/FCV/topologia do MongoDB de produção, mecanismo de backup/restauração, serviços externos ativos, dispositivos/navegadores dos usuários e ambiente de homologação. Os repositórios não demonstram esses fatos. Essas respostas alteram a implementação e a ordem fina do banco, mas não a recomendação de etapas acima.

**Primeira entrega sugerida:** base reproduzível + testes de contrato + contenção de segurança. Não começar por trocar o número do Next ou instalar todos os latest.
