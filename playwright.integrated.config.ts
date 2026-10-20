import { defineConfig, devices } from '@playwright/test';
import path from 'node:path';

const apiRoot = process.env.GARANTIAS_API_ROOT || path.resolve('../garantiasAPI');
export default defineConfig({
  testDir: './tests/integration-browser', workers: 1, timeout: 30000,
  use: { baseURL: 'http://127.0.0.1:3100', trace: 'retain-on-failure', ...devices['Desktop Chrome'] },
  webServer: [
    { command: `"${process.execPath}" tests/browser-server.cjs`, cwd: apiRoot, url: 'http://127.0.0.1:4010/v1/users', timeout: 120000 },
    { command: `"${process.execPath}" scripts/test-app.mjs start`, url: 'http://127.0.0.1:3100', timeout: 60000 },
  ],
});
