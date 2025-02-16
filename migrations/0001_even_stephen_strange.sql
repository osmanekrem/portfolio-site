CREATE TYPE "public"."role_enum" AS ENUM('ADMIN', 'USER');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "role_enum" DEFAULT 'USER';