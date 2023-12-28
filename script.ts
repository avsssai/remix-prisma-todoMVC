import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	const todos = await prisma.todo.findMany();
	console.log(todos);
}

main()
	.then(async () => await prisma.$disconnect())
	.catch(async (e) => {
		console.log(e);
		await prisma.$disconnect();
		process.exit(1);
	});
