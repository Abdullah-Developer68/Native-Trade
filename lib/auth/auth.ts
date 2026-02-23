import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/drizzle/db.connect"; // your drizzle instance
import * as schema from "@/drizzle/db/index.schema"; // import your schema

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema, // pass the schema here
  }),
  emailAndPassword: {
    enabled: true,
  },
});
