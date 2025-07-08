import { Prisma } from "generated/prisma"

export class InMemoryContadorRepository {
	public contador: any[] = []

	async create(data: Prisma.ContadorCreateInput) {
		this.contador.push(data)
	}
}