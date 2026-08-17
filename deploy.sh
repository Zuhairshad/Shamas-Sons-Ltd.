#!/usr/bin/env bash
#
# Deploy the storefront on a server with pm2.
#
#   ./deploy.sh              pull, install, build, (re)start under pm2
#   SKIP_PULL=1 ./deploy.sh  skip git pull
#
# Env vars go in .env.production (created manually on the server). NEXT_PUBLIC_*
# values are inlined at build time, so editing that file needs a re-deploy.
#
# First time on a fresh server: npm i -g pnpm pm2 && ./deploy.sh && pm2 startup
#
set -euo pipefail

cd "$(dirname "$0")"

if [[ "${SKIP_PULL:-0}" != "1" ]]; then
  git pull --ff-only
fi

pnpm install --frozen-lockfile
pnpm build

pm2 startOrReload ecosystem.config.js --update-env
pm2 save

pm2 status shams-amazon
