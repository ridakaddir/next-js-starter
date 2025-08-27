# Inspector Web Console

A Next.js web app with Prisma ORM, packaged for Docker.

## Quick Start


### 1. Build the Docker image

```sh
docker build -t next-js-starter .
```

### 2. Run the app (map port 3000)

```sh
docker run --rm -p 3000:3000 next-js-starter
```

### 3. Connect to your database

- By default, the app expects PostgreSQL at `host.docker.internal:5432`.
- Update `DATABASE_URL` in your environment or Dockerfile as needed.

### 4. Development

```sh
yarn install
yarn prisma:generate
yarn prisma:migrate
yarn dev
```

## Environment Variables (WIP)

- `DATABASE_URL` – PostgreSQL connection string


## Tech Stack

- [x] Next.js
- [x] TypeScript
- [x] Redux Toolkit
- [x] Tailwind CSS
- [x] Zod
- [x] React Hook Form
- [x] Docker
- [x] Prisma
- [x] PostgreSQL
- [x] Jest & React Testing Library
- [x] ESLint
- [x] Auth.js & FusionAuth integration
- [ ] eslint-plugin-boundaries
- [ ] Replace Prisma with drizzle-orm
- [ ] shadcn/ui
