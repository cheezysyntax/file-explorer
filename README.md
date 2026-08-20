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

Production uses the checked-in `data/mockdata.json` file and does not connect to SQL Server. Docker and Prisma are used only during local development. Deploy the project to Vercel normally; no production `DATABASE_URL` is required.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

