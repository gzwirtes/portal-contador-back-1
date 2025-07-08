-- AlterTable
CREATE SEQUENCE clientes_id_seq;
ALTER TABLE "clientes" ALTER COLUMN "id" SET DEFAULT nextval('clientes_id_seq');
ALTER SEQUENCE clientes_id_seq OWNED BY "clientes"."id";

-- AlterTable
CREATE SEQUENCE indicacoes_id_seq;
ALTER TABLE "indicacoes" ALTER COLUMN "id" SET DEFAULT nextval('indicacoes_id_seq');
ALTER SEQUENCE indicacoes_id_seq OWNED BY "indicacoes"."id";

-- AlterTable
CREATE SEQUENCE premios_id_seq;
ALTER TABLE "premios" ALTER COLUMN "id" SET DEFAULT nextval('premios_id_seq');
ALTER SEQUENCE premios_id_seq OWNED BY "premios"."id";
