import {
  pgTable,
  uuid,
  timestamp,
  varchar,
  pgEnum,
  text,
} from "drizzle-orm/pg-core";

export const ROLE_ENUM = pgEnum("role_enum", ["ADMIN", "USER"]);

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar("full_name", {
    length: 255,
  }).notNull(),
  email: varchar("email", {
    length: 255,
  })
    .notNull()
    .unique(),
  password: text("password").notNull(),
  role: ROLE_ENUM("role").default("USER"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

export const projects = pgTable("projects", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  title: varchar("title", {
    length: 255,
  }).notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  liveUrl: text("live_url").notNull(),
  tags: text("tags").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

export const posts = pgTable("posts", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  title: varchar("title", {
    length: 255,
  }).notNull(),
  content: text("content").notNull(),
  slug: varchar("slug").notNull(),
  image: text("image").notNull(),
  tags: text("tags").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
  .notNull()
  .defaultNow(),
    updatedAt: timestamp("updated_at", {
        withTimezone: true,
    })
    .notNull()
    .defaultNow(),

})

export type Project = typeof projects.$inferSelect;
export type Post = typeof posts.$inferSelect;
