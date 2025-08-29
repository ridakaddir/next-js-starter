# Inspector Web Console

A Next.js web app with Prisma ORM, packaged for Docker.

## Quick Start


### 1. Build the Docker image

```sh
docker build -t next-js-starter .
```

### 2. Run the app (map port 3000)

```sh
docker run -e DATABASE_URL="postgresql://postgres:Postgres@123456@host.docker.internal:5432/mydb?schema=public" -p 3000:3000 next-js-starter
```

### 3. Connect to your database

- By default, the app expects PostgreSQL at `host.docker.internal:5432`.
- Update `DATABASE_URL` in your environment or Dockerfile as needed.

### 4. Development

First start the services defined in `docker-compose.yml`. 
```sh
docker-compose up
```
this will start the PostgreSQL and FusionAuth services.
the FusionAuth container will mount the kickstart folder from your project directory to set up the initial configuration. this same configuration is used by the Next.js app (`.env` file).

Now run the following commands to set up your development environment:

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
- [x] Google Cloud Run & Cloud SQL
- [ ] eslint-plugin-boundaries
- [ ] Replace Prisma with drizzle-orm
- [ ] shadcn/ui

## Authentication & Authorization

- FusionAuth is used for user authentication and authorization.
- The Next.js app communicates with FusionAuth using NextAuth.js.

## Deployment to GCP

First step is to create a Cloud SQL instance of PostgreSQL.

once the DB instance is created, pass the `DATABASE_URL` as an environment variable when running the container as described above.

the `build-and-deploy.sh` script automates the process of building and deploying the application to Google Cloud Platform (GCP) using Cloud Run. make sure to update the script with your specific project and database details.

```sh
./build-and-deploy.sh
```
