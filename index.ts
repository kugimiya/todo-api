import { App as Server, Request, Response, bodyParser } from "https://raw.githubusercontent.com/NMathar/deno-express/master/mod.ts";
import { store } from "./store.ts";
import { Todo } from "./models.ts";

const server = new Server();

server.use(bodyParser.json());

server.get('/api/todo', async (req: Request, res: Response) => {
    await res.json(store.todos);
});

server.post('/api/todo', async (req: Request, res: Response) => {
    const data = req.data as Todo;
    store.todos.push(data);
});

server.delete('/api/todo/{todoId}', async (req: Request, res: Response) => {
    const id = +req.params.todoId as number;
    store.todos = store.todos.filter(todo => todo.id !== id);
});

server.put('/api/todo/{todoId}', async (req: Request, res: Response) => {
    const id = +req.params.todoId as number;
    const data = req.data as Todo;
    store.todos = store.todos.map(todo => todo.id === id ? { ...data, id } : todo);
})

server.listen(8080);
