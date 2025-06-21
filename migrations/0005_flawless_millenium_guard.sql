ALTER TABLE "posts" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now() NOT NULL;