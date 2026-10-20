# Migração implementada — conclusão em 20/10/2026

Alterações locais em `O:\garantias` e `O:\garantiasAPI`. Nenhum deployment, mensagem real,
upload de produção ou alteração de dados do Atlas foi executado.

## Versões e compatibilidade

| Camada | Versão adotada |
| --- | --- |
| Node | 24 LTS; desenvolvimento/CI 24.22.0; Vercel 24.x |
| npm | 11.19.1 |
| Next / React | 16.4.2 / 19.3.1 |
| Material UI / Date Pickers | 9.5.0 / 9.15.0 |
| TypeScript | 6.0.3 |
| Express / Mongoose | 5.3.0 / 9.11.2 |
| Jest / Vitest / Playwright | 30.5.2 / 5.0.5 / 1.64.1 |
| MongoDB | Atlas consultado: 8.0.34; testes isolados: 8.0.16 |

Node 24 foi escolhido como LTS; Node 26 é a linha Current. TypeScript 7 não foi adotado:
o parser TypeScript do ESLint utilizado declara suporte abaixo de 6.1. As versões instaladas
e suas dependências estão registradas nos dois `package-lock.json`.

## Mudanças

- Páginas/layouts usam os parâmetros assíncronos do Next; middleware virou `proxy.ts`.
- ESLint usa configuração flat; `next lint` foi substituído por ESLint independente.
- Grid, temas, campos e date pickers usam as APIs atuais do MUI. Layouts verticais usam Stack.
- Atualizados SDKs Firebase/Blob e bibliotecas principais da API. Removidos Docker, Compose e PM2.
- A API possui handler específico da Vercel com conexão Atlas compartilhada por instância,
  espera pela conexão, resposta 503 em falha e índices automáticos desativados em produção.
- Express 5 mantém validação/sanitização sem escrever no getter `req.query`.
- Removidas operações e hooks incompatíveis com Mongoose 9, incluindo `execPopulate`.
- Corrigidos renovação de token, espera do upload de PDF e recarga infinita ao negar câmera.
- O PWA usa Workbox 7 diretamente, sem plugin Next PWA, e Webpack explícito. Cache de execução
  limitado a recursos estáticos; API e páginas exigem rede para evitar reutilização de dados de outra sessão.

## Validação

- API: 106 testes, 19 suítes; cobertura observada de linhas 81,88% e branches 60,22%.
- Frontend: 43 testes unitários/de componentes, incluindo requisições, tokens, fluxos e campos MUI.
- Chromium: 25 testes de login, perfil, telas públicas/administrativas e PWA.
- Integração real: 1 teste de navegador com frontend + API + MongoDB temporário, validando login,
  acesso administrativo autenticado e persistência da alteração de perfil após recarregar.
- Total: 175 testes passando. Isso não equivale a cobertura de 100% do sistema.
- Build Next 16/MUI 9/TypeScript 6 e verificação de tipos passaram.
- Lint dos dois projetos sem erros; permanecem avisos de código legado e recomendações do React Compiler.
- A API usa MongoDB real temporário. Os 25 testes de navegador simulam a API; o teste adicional
  usa a API real. Twilio, Blob e outros serviços externos são simulados.
- Instalações limpas com `npm ci` passaram nos dois projetos. A API passou novamente nos 106 testes
  com essas dependências; o frontend passou nos 43 testes unitários e no build com dependências limpas.
  O hook de instalação da API agora ignora CI, Vercel e arquivos-fonte sem `.git`.
- A CI dos dois repositórios executa as verificações com Node 24. Os testes não carregam `.env` de produção.
- O Jest necessita `--experimental-vm-modules` para dependências ESM. O adaptador OS nos testes
  contorna [NODE-7832](https://jira.mongodb.org/browse/NODE-7832); o código de produção não usa esse contorno.

A cobertura segue a configuração do Jest: exclui configuração, bootstrap do app e testes; não inclui automaticamente arquivos nunca carregados. Os números acima não representam cobertura total. Mensageria/assistente, permissões de todos os papéis,
câmera em aparelhos reais, grandes lotes de PDF e falhas dos provedores ainda exigem homologação.

## Segurança e limitações

`npm audit --omit=dev`: zero vulnerabilidades nos dois projetos na verificação final.
O plugin Next PWA foi removido, eliminando sua cadeia vulnerável; Workbox é dependência de desenvolvimento.
As ferramentas de desenvolvimento também possuem alertas transitivos. Não foi aplicado `audit fix --force`.
Overrides de gRPC e serialização fixam versões corrigidas; reavaliar quando os pacotes pais atualizarem.

Rotas administrativas agora exigem sessão e papel: ADMIN gerencia usuários, SKUs e lotes;
ADMIN/QA executam atribuição e inspeção. Consultas pessoais validam titularidade. O registro de garantia
usa atualização atômica para impedir apropriação concorrente por usuários diferentes. Tokens Bearer e o
refresh token legado são aceitos, com verificação de revogação no banco para este último.
Webhooks de WhatsApp e chamadas verificam assinatura Twilio. A consulta pública de código mantém
somente informações resumidas de status. O rate limit em memória não é global entre instâncias da Vercel.

## Publicação e rollback na Vercel

1. Use dois projetos Vercel separados, ambos em Node 24.x. Instale com `npm ci`.
2. Publique primeiro a API em Preview: entrada `api/index.js`, rotas em `vercel.json`, Build Command
   `npm run build`, sem preset Next.js. A Function está configurada para até 60 segundos.
   Depois publique o frontend: preset Next.js e `npm run build`.
3. Configure variáveis por ambiente. Nunca exponha segredos em `NEXT_PUBLIC_*`.
4. Configure `NEXT_PUBLIC_API_URL` do frontend com a URL da API Preview e `CORS_ORIGIN` da API com
   a origem exata do frontend, sem barra final. Uma mudança de `NEXT_PUBLIC_*` exige novo build.
   Configure no Twilio as URLs públicas HTTPS exatas dos webhooks para a assinatura funcionar.
   Preview deve apontar para Atlas e provedores de homologação. Verifique acesso de rede ao Atlas,
   login/renovação, perfis, SKU, ciclo de garantia, WhatsApp, upload, QR/PDF e leitura em celular.
5. Verifique limites de corpo/duração da Function nos uploads e lotes de impressão. Uploads maiores
   precisam de envio direto ao Blob; operações longas podem exigir fila.
6. O código está pronto para deploy de Preview. Produção depende da homologação das credenciais,
   webhooks, uploads e dispositivos reais acima, que não pode ser substituída pelos testes locais.
   Promova só após essa homologação. Para rollback, restaure os deployments anteriores dos dois projetos.
   Não houve migração de schema ou dados que precise de reversão.

Referências: [Next 16](https://nextjs.org/docs/app/guides/upgrading/version-16),
[MUI 9](https://mui.com/material-ui/migration/upgrade-to-v9/),
[Express 5](https://expressjs.com/en/guide/migrating-5.html),
[Mongoose 9](https://mongoosejs.com/docs/migrating_to_9.html).

