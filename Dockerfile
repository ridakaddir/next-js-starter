FROM node:22-alpine AS base

# Stage 1: Install dependencies
FROM base AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat openssl
COPY package*.json ./
# No lockfile present, use install (not ci)
RUN npm install

# Stage 2: Build the application
FROM base AS builder
WORKDIR /app
RUN apk add --no-cache libc6-compat openssl
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Generate Prisma client if present, then build
RUN npm run prisma:generate || npx prisma generate || true
RUN npm run build

# Stage 3: Production server
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV DATABASE_URL="postgresql://user:password@host.docker.internal:5432/mydb?schema=public"
RUN apk add --no-cache libc6-compat openssl
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]