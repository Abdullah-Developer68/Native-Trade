import { pgTable, serial, text, varchar, boolean } from "drizzle-orm/pg-core";

const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("full_name"),
  phone: varchar("phone", { length: 256 }),
  password: varchar("password", { length: 256 }),
  isActive: boolean("is_active").default(true),
  role: text("role").default("user"),
});

export { users };
