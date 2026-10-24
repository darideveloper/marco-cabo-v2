FROM node:22.23.4-alpine AS base
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

FROM deps AS build
WORKDIR /app
COPY . .

# Build-time variables (must match Coolify vars)
ARG PUBLIC_API_BASE_URL
ARG PUBLIC_BASE_URL
ARG PUBLIC_TOKEN_KEY
ARG PUBLIC_GOOGLE_PLACES_API_KEY
ARG PUBLIC_GOOGLE_PLACES_BUSINESS_ID

ENV PUBLIC_API_BASE_URL=$PUBLIC_API_BASE_URL
ENV PUBLIC_BASE_URL=$PUBLIC_BASE_URL
ENV PUBLIC_TOKEN_KEY=$PUBLIC_TOKEN_KEY
ENV PUBLIC_GOOGLE_PLACES_API_KEY=$PUBLIC_GOOGLE_PLACES_API_KEY
ENV PUBLIC_GOOGLE_PLACES_BUSINESS_ID=$PUBLIC_GOOGLE_PLACES_BUSINESS_ID

RUN corepack enable pnpm && pnpm run build

FROM base AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

EXPOSE 3000

CMD ["node", "./dist/server/entry.mjs"]
