/**
 * PM2 process config for the production Next.js server.
 * Used by ./deploy.sh, or run directly: pm2 start ecosystem.config.js
 */
module.exports = {
  apps: [
    {
      name: 'shams-amazon',
      cwd: __dirname,

      // Call Next's binary directly instead of `pnpm start`. A package-manager
      // wrapper adds an extra process between pm2 and Next, so signals (reload,
      // stop) land on the wrapper and Next is left orphaned.
      script: './node_modules/next/dist/bin/next',
      args: 'start',

      // Keep this at 1. The mock cart in lib/shopify/client.ts is a module-level
      // singleton, so it lives per process — more instances would give the same
      // visitor a different cart depending on which worker served the request.
      instances: 1,
      exec_mode: 'fork',

      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
}
