import { PrismaMssql } from "@prisma/adapter-mssql";
import { PrismaClient } from "@prisma/client";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required to connect to SQL Server.");
}

if (
  process.env.NODE_ENV === "production" &&
  process.env.VERCEL === "1" &&
  /sqlserver:\/\/(localhost|127\.0\.0\.1|HOST)(?=[:;])/i.test(databaseUrl)
) {
  throw new Error(
    "DATABASE_URL must use a hosted SQL Server hostname in production; do not use localhost or the HOST placeholder.",
  );
}

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient({
  adapter: new PrismaMssql(databaseUrl),
});

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
