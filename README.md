## From Zero to Prod: Next.js + Prisma + PostgreSQL + FusionAuth on Google Cloud

This guide shows how to bootstrap a modern Next.js app, connect it to PostgreSQL via Prisma, integrate authentication with FusionAuth using Auth.js (NextAuth), and deploy both the database and app to Google Cloud (Cloud SQL + Cloud Run).

### What you’ll build
- Next.js 15 + TypeScript app
- Prisma ORM + PostgreSQL schema and migrations
- gRPC client to fetch customer data from a gRPC server
- Auth.js with FusionAuth (OIDC) login
- Local dev via Docker Compose
- Production deploy: Cloud SQL (Postgres) + Cloud Run

---
## 1) Start the gRPC test server
This repo includes a simple gRPC server in `mock-grpc-server/` that serves customer data. It uses an in-memory array for storage.
To start the server:

```
cd mock-grpc-server
protoc --go_out=. --go-grpc_out=. customers.proto
go run main.go
```
The server listens on port `50051`.

## 2) Bootstrap the Next.js app

- Create the app and install deps
	- `yarn install`
- Generate gRPC client code for TypeScript
	- `yarn grpc:generate`
- Useful scripts (package.json)
	- `yarn dev` – Next dev server
	- `yarn build` – Next build
	- `yarn start` – Start standalone build
	- `yarn prisma:generate` – Generate Prisma client
	- `yarn prisma:migrate` – Run migrations

Project includes Tailwind, Zustand, Zod, and a minimal UI kit.

---

## 3) Add Prisma + PostgreSQL

Prisma files live under `prisma/` and `src/lib/prisma.ts` creates the client.

### Environment variables
Add a `.env` file:

```
DATABASE_URL="postgresql://postgres:Postgres%40123456@localhost:5432/postgres?schema=public"
```

Note: If your password contains special chars (like `@`), URL‑encode them (e.g., `@` → `%40`).

### Generate and migrate

```
yarn prisma:generate
yarn prisma:migrate
```

---

## 4) Auth with FusionAuth via Auth.js

The app uses Auth.js (NextAuth) configured for FusionAuth (OIDC).

Key provider settings:
- issuer: `http://localhost:9011`
- authorization: `http://localhost:9011/oauth2/authorize`
- token: `http://localhost:9011/oauth2/token`
- userinfo: `http://localhost:9011/oauth2/userinfo`

Make sure your FusionAuth application allows the redirect URL:
`http://localhost:3000/api/auth/callback/fusionauth`

Wrap client components using `useSession` with `<SessionProvider/>`.

---

## 5) Local development with Docker Compose

Use `docker-compose.yaml` to run Postgres and FusionAuth locally. The FusionAuth container mounts the `kickstart/` folder to auto‑configure an app and user. Then, run the app locally:

```
yarn dev
```

Or run via Docker:

```
docker build -t next-js-starter .
docker run --rm -p 3000:3000 \
	-e DATABASE_URL="postgresql://postgres:Postgres%40123456@host.docker.internal:5432/postgres?schema=public" \
	next-js-starter
```

On macOS, use `host.docker.internal` for host DB access from containers if not running in a shared network.

---

## 6) Production on Google Cloud

### 6.1 Create Cloud SQL (Postgres)
- Create an instance in your GCP project
- Choose Public IP or Private IP
- Record the connection name: `PROJECT:REGION:INSTANCE`

### 6.2 Prefer the Cloud SQL connector from Cloud Run (Unix socket)

- Use this `DATABASE_URL` shape (no SSL needed with the connector):

```
DATABASE_URL="postgresql://postgres:Postgres%40123456@localhost/postgres?schema=public&host=/cloudsql/PROJECT:REGION:INSTANCE&connection_limit=5"
```

Keep passwords URL‑encoded and set env vars at deploy time (don’t bake into the image).

### 6.3 Build and deploy to Cloud Run

Build the image with Docker or Cloud Build, then deploy with env vars:

```
gcloud run deploy inspector-web-console \
	--image gcr.io/PROJECT_ID/inspector-web-console \
	--region REGION \
	--allow-unauthenticated \
	--add-cloudsql-instances PROJECT:REGION:INSTANCE \
	--set-env-vars DATABASE_URL="postgresql://postgres:Postgres%40123456@localhost/postgres?schema=public&host=/cloudsql/PROJECT:REGION:INSTANCE&connection_limit=5"
```

This repo includes a `build-and-deploy.sh` you can adapt with your project, region and instance.

### 6.4 Prisma migrations in production

Run migrations during release (init job) or on startup with caution:

```
yarn prisma migrate deploy
```