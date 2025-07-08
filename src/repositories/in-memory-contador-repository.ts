import { Contador, Prisma } from "generated/prisma"
import { ContadorRepository } from "./contador-repository";

export class InMemoryContadorRepository implements ContadorRepository{
	create(data: Prisma.ContadorCreateInput): Promise<Contador> {
		throw new Error("Method not implemented.");
	}

}