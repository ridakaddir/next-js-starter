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
- [ ] eslint-plugin-boundaries
- [ ] Replace Prisma with drizzle-orm
- [ ] shadcn/ui

## Authentication & Authorization

- FusionAuth is used for user authentication and authorization.
- The Next.js app communicates with FusionAuth using NextAuth.js.

## Deployment to GCP

First step is to create a Cloud SQL instance of PostgreSQL.

the `Dockerfile` defines the db connection settings. since the db is hosted on Cloud SQL, and the Next.js app runs in Cloud run, the connection string needs to use the Cloud SQL connector (Unix socket).

once the DB instance is created, update the connection string in the `Dockerfile` then run the following command to build and deploy the application:

```sh
./build-and-deploy.sh
```

`build-and-deploy.sh` script automates the process of building and deploying the application to Google Cloud Platform (GCP) using Cloud Run.

