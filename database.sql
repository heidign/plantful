-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "avatar_image" TEXT,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "plants" (
	"id" serial NOT NULL,
	"api_id" varchar(255) NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"nickname" varchar(30) NOT NULL,
	"notes" serial(255) NOT NULL,
	"dateWatered" TIMESTAMP NOT NULL,
	"dateFertilized" TIMESTAMP NOT NULL,
	"dateRepotted" serial NOT NULL,
	"plantImage" varchar(255) NOT NULL,
	"isOffered" BOOLEAN NOT NULL,
	CONSTRAINT "plants_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "comments" (
	"id" serial NOT NULL,
	"created_at" TIMESTAMP NOT NULL,
	"updated_at" TIMESTAMP NOT NULL,
	"plant_id" int,
	"user_id" int NOT NULL,
	"parent_id" int,
	"comment" TEXT NOT NULL,
	CONSTRAINT "comments_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

-- * database query to add 'path' to "comments" table
-- CREATE EXTENSION for ltree
CREATE EXTENSION IF NOT EXISTS ltree;
ALTER TABLE "comments" ADD COLUMN path ltree;


ALTER TABLE "plants" ADD CONSTRAINT "plants_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("plant_id") REFERENCES "plants"("id");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk1" FOREIGN KEY ("user_id") REFERENCES "user"("id");




