/// <reference types="node" />

import { defineConfig, devices } from '@playwright/test'

// Mirrors `devServer.port` in nuxt.config; `PORT` moves preview and tests together.
const port = Number(process.env.PORT || 2023)
const baseURL = `http://localhost:${port}`

export default defineConfig({
  testDir: './e2e',
  // Keep generated artifacts inside the ignored node_modules cache. Playwright
  // clears this directory at the start of every run.
  outputDir: './node_modules/.cache/playwright',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    // The PWA registers a service worker; keep each test on a clean load.
    serviceWorkers: 'block',
  },
  expect: { timeout: 10_000 },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    // Production build, not `dev`: it drops Nuxt DevTools (its overlay covers
    // the bottom of the viewport), the html-validator and the dev PWA setup.
    // `nuxt preview` takes the port from `PORT` when no `--port` is passed.
    command: 'bun run build && bunx nuxt preview',
    url: baseURL,
    env: { PORT: String(port) },
    // Always start a fresh preview, so the run never silently targets `dev`.
    reuseExistingServer: false,
    timeout: 180_000,
  },
})
