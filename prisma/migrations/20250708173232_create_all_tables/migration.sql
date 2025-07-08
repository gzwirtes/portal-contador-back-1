-- CreateEnum
CREATE TYPE "TipoIndicacao" AS ENUM ('PENDENTE', 'CONVERTIDO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "TipoPremio" AS ENUM ('A_RECEBER', 'PAGO');

-- CreateTable
CREATE TABLE "contadores" (
    "id" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha_hash" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contadores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clientes" (
    "id" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contador_id" INTEGER NOT NULL,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "indicacoes" (
    "id" INTEGER NOT NULL,
    "nome_indicado" TEXT NOT NULL,
    "cnpj_indicado" TEXT NOT NULL,
    "status" "TipoIndicacao" NOT NULL DEFAULT 'PENDENTE',
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contador_id" INTEGER NOT NULL,

    CONSTRAINT "indicacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "premios" (
    "id" INTEGER NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "status" "TipoPremio" NOT NULL DEFAULT 'A_RECEBER',
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contador_id" INTEGER NOT NULL,
    "indicacao_id" INTEGER NOT NULL,

    CONSTRAINT "premios_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "clientes" ADD CONSTRAINT "clientes_contador_id_fkey" FOREIGN KEY ("contador_id") REFERENCES "contadores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "indicacoes" ADD CONSTRAINT "indicacoes_contador_id_fkey" FOREIGN KEY ("contador_id") REFERENCES "contadores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "premios" ADD CONSTRAINT "premios_contador_id_fkey" FOREIGN KEY ("contador_id") REFERENCES "contadores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "premios" ADD CONSTRAINT "premios_indicacao_id_fkey" FOREIGN KEY ("indicacao_id") REFERENCES "indicacoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
