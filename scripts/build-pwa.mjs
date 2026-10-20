import { generateSW } from "workbox-build";
import path from "node:path";
import { fileURLToPath } from "node:url";

export async function buildPwa(root = process.cwd()) {
  const result = await generateSW({
    globDirectory: path.join(root, ".next/static"),
    globPatterns: ["**/*.{js,css,woff,woff2}"],
    modifyURLPrefix: { "": "/_next/static/" },
    swDest: path.join(root, "public/sw.js"),
    cleanupOutdatedCaches: true,
    clientsClaim: true,
    skipWaiting: true,
    sourcemap: false,
    runtimeCaching: [
      {
        urlPattern: ({ sameOrigin, request }) =>
          sameOrigin &&
          ["style", "script", "font", "image"].includes(request.destination),
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "static-assets-v3",
          expiration: { maxEntries: 128, maxAgeSeconds: 604800 },
        },
      },
      { urlPattern: /.*/, handler: "NetworkOnly" },
    ],
  });
  if (!result.count) throw new Error("PWA build produced an empty precache");
  for (const warning of result.warnings) console.warn(warning);
  console.log(`PWA: ${result.count} static assets generated`);
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
)
  await buildPwa();
