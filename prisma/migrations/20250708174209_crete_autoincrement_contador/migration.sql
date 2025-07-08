-- AlterTable
CREATE SEQUENCE contadores_id_seq;
ALTER TABLE "contadores" ALTER COLUMN "id" SET DEFAULT nextval('contadores_id_seq');
ALTER SEQUENCE contadores_id_seq OWNED BY "contadores"."id";
