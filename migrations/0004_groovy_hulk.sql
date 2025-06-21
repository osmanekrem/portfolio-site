CREATE TABLE "posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255),
	"content" text NOT NULL,
	"slug" varchar NOT NULL,
	"image" text NOT NULL,
	"tags" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "posts_id_unique" UNIQUE("id")
);
