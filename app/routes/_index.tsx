import { PrismaClient } from "@prisma/client";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, useLoaderData, useFetcher } from "@remix-run/react";

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export const loader = async () => {
	const prisma = new PrismaClient();
	const allTodos = await prisma.todo.findMany();
	console.log(allTodos, "USERS");
	await prisma.$disconnect();
	return { allTodos };
};

export const action = async ({ request }: ActionFunctionArgs) => {
	const prisma = new PrismaClient();
	const formData = await request.formData();
	const title = formData.get("title");
	if (!title) {
		return new Response("Not Found", { status: 404 });
	}
	return await prisma.todo.create({ data: { title, completed: false } });
};

export default function Index() {
	const { allTodos } = useLoaderData<typeof loader>();
	const fetcher = useFetcher();
	return (
		<div
			style={{
				fontFamily: "system-ui, sans-serif",
				lineHeight: "1.8",
			}}>
			<h1>Todos</h1>
			<Form method='post' id='input-form'>
				<input
					type='text'
					name='title'
					placeholder='What needs to be done...'
					id='input-field'
				/>
			</Form>
			<div>
				{allTodos.map((todo) => (
					<div className='todo-item' key={todo.id}>
						<fetcher.Form
							method='post'
							action={`/todos/${todo.id}`}>
							<button
								name='completed'
								type='submit'
								value={todo.completed ? "false" : "true"}>
								{!todo.completed ? "⭕" : "🟢"}
							</button>
						</fetcher.Form>
						<span>{todo.title}</span>{" "}
						<Form
							method='post'
							action={`/todos/${todo.id}/destroy`}>
							<input type='submit' value={"delete"} />
						</Form>
					</div>
				))}
			</div>
		</div>
	);
}
