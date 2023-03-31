-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "plants" (
    id SERIAL PRIMARY KEY,
    "api_id" character varying(255),
    "nickname" character varying(30),
    "notes" character varying(255),
    "dateWatered" timestamp without time zone,
    "dateFertilized" timestamp without time zone,
    "dateRepotted" timestamp without time zone,
    "image_url" character varying(255),
    "isOffered" boolean DEFAULT false,
    user_id integer NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
);