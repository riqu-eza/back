import * as PrismaAll from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pkg from "pg";

const { PrismaClient } = PrismaAll;
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_POOLING_URL,
  ssl: { rejectUnauthorized: false }
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
  adapter
});
