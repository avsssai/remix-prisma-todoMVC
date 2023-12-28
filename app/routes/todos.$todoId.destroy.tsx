import { PrismaClient } from "@prisma/client";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

export const action = async ({ params }: ActionFunctionArgs) => {
	invariant(params.todoId, "Missing todo id from params.");
	let prisma = new PrismaClient();
	await prisma.todo.delete({
		where: {
			id: parseInt(params.todoId),
		},
	});
	return redirect("/");
};
