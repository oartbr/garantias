import { cp, mkdir, symlink, access, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { buildPwa } from './build-pwa.mjs';

// Build a copy without developer .env files. No production secrets are loaded.
const root = process.cwd();
const stage = path.join(root, '.test-app');
const command = process.argv[2] || 'build';
await mkdir(stage, { recursive: true });
if (command !== 'start') {
  for (const name of ['src', 'public', 'package.json', 'tsconfig.json', 'next.config.js']) {
    await cp(path.join(root, name), path.join(stage, name), { recursive: true, force: true });
  }
  await writeFile(path.join(stage, 'next-env.d.ts'), '/// <reference types="next" />\n/// <reference types="next/image-types/global" />\n');
  try { await access(path.join(stage, 'node_modules')); } catch {
    await symlink(path.join(root, 'node_modules'), path.join(stage, 'node_modules'), 'junction');
  }
}
const env = {
  ...process.env,
  NODE_ENV: 'production',
  NEXT_TELEMETRY_DISABLED: '1',
  NEXT_PUBLIC_API_URL: 'http://127.0.0.1:4010',
  NEXT_PUBLIC_THEME: 'wse',
  NEXT_PUBLIC_IS_SIGN_UP_ENABLED: 'true',
  NEXT_PUBLIC_IS_GOOGLE_AUTH_ENABLED: 'false',
  NEXT_PUBLIC_IS_FACEBOOK_AUTH_ENABLED: 'false',
};
const args = command === 'start' ? ['start', '-p', '3100', '-H', '127.0.0.1'] : ['build', '--webpack'];
const child = spawn(process.execPath, [path.join(root, 'node_modules/next/dist/bin/next'), ...args], { cwd: stage, env, stdio: 'inherit' });
for (const signal of ['SIGTERM', 'SIGINT']) process.on(signal, () => child.kill(signal));
child.on('exit', async code => {
  if (code === 0 && command !== 'start') {
    try { await buildPwa(stage); } catch (error) { console.error(error); process.exit(1); }
  }
  process.exit(code ?? 1);
});
