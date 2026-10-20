# Garantias

Frontend Next.js 16 / React 19 / Material UI 9, preparado para Vercel com Node.js 24 LTS.

## Executar
Use a versão em `.nvmrc`, instale com `npm ci` e configure `.env.local` a partir de `example.env.local`.
`npm run dev` inicia desenvolvimento. `npm run build` produz o build com Webpack e gera o service worker diretamente com Workbox.

## Verificar
- `npm test`: testes de requisições, tokens, regras de fluxo e componentes.
- `npm run lint` e `npm run typecheck`: verificações estáticas.
- `npm run build:e2e`: cria `.test-app` sem carregar arquivos `.env` locais.
- `npx playwright install chromium` e `npm run test:e2e`: navegação com API simulada e rede externa bloqueada.
- `npm run test:integration`: navegador com API real e MongoDB temporário; requer a API instalada na pasta irmã `garantiasAPI` (ou `GARANTIAS_API_ROOT`) e o build isolado pronto. Execute depois da suíte E2E, pois usam as mesmas portas.

A CI executa os testes e o build com Node 24. Os testes antigos em `playwright-tests` dependem de serviços
externos e não fazem parte da suíte isolada. A nova suíte não envia mensagens nem modifica o Atlas.

## Vercel
Importe este repositório como projeto Next.js separado da API. Use Node 24.x, Install Command `npm ci`
e Build Command `npm run build`. Configure `NEXT_PUBLIC_API_URL` e demais variáveis de `example.env.local`
para cada ambiente. Variáveis `NEXT_PUBLIC_*` são públicas e incorporadas ao build: nunca coloque segredos nelas.

Valide o Preview com uma API e contas de homologação antes de promover. A migração não realiza deploy.
Para rollback, promova novamente o deployment anterior da Vercel, mantendo frontend/API compatíveis.

O service worker guarda recursos estáticos; páginas e API precisam de rede. Chrome/Edge/Firefox atuais
ou Safari 17+ são necessários para os componentes atualizados.

Detalhes, resultados e limitações: [registro da migração](docs/migracao-implementada-2026-10-19.md).
