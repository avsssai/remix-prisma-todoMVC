import { ActionFunctionArgs } from "@remix-run/node";
import invalidate from "tiny-invariant";
import { PrismaClient } from "@prisma/client";

export const action = async ({ params, request }: ActionFunctionArgs) => {
	invalidate(params.todoId, "Missing todo Id");
	const prisma = new PrismaClient();
	const formData = await request.formData();
	await prisma.todo.update({
		where: {
			id: parseInt(params.todoId),
		},
		data: {
			completed: formData.get("completed") === "true",
		},
	});
	return "updated";
};
