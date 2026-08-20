This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Local SQL Server

Prisma is configured for the SQL Server instance in `docker-compose.yml`.

```bash
cp .env.example .env
npm run db:up
npm run prisma:generate
npm run db:migrate -- --name init
```

The database is exposed on `127.0.0.1:1433` only. Stop it with `npm run db:down`.

## Deploy on Vercel

Vercel Functions cannot connect to the SQL Server container running on your local machine. In the Vercel project settings, add a `DATABASE_URL` environment variable that points to a hosted SQL Server instance, such as Azure SQL:

```text
sqlserver://<your-sql-server-host>:1433;database=FilesDb;user=<user>;password=<password>;encrypt=true;trustServerCertificate=true
```

Replace every value inside `<...>` with the real hosted SQL Server details. Do not enter `HOST` literally, and do not use `localhost`, `127.0.0.1`, or the Docker service name in the Vercel value. Run the Prisma migration against the hosted database before deploying:

```bash
DATABASE_URL="<hosted SQL Server URL>" npx prisma migrate deploy
```

After adding or changing the Vercel environment variable, redeploy the project. The hosted SQL Server must allow connections from Vercel and have the `FilesDb` database and `Files` table created.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

