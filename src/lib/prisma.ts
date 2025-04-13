import { PrismaClient } from "@/generated/prisma";

const isProduction = process.env.NODE_ENV === "production";

/* eslint-disable no-var */
declare global {
  var prisma: PrismaClient | undefined;
}
/* eslint-enable no-var */

let prisma: PrismaClient;

if (isProduction) {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export const db = prisma;
