ALTER TABLE "account" RENAME COLUMN "users_id" TO "user_id";--> statement-breakpoint
ALTER TABLE "session" RENAME COLUMN "users_agent" TO "user_agent";--> statement-breakpoint
ALTER TABLE "session" RENAME COLUMN "users_id" TO "user_id";--> statement-breakpoint
ALTER TABLE "account" DROP CONSTRAINT "account_users_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "session" DROP CONSTRAINT "session_users_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;