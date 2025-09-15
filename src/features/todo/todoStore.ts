import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createTodo, deleteTodo, getAllTodos, updateTodo } from "./todos.server";

interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

interface TodoActions {
    fetchTodos: () => Promise<void>;
    addTodo: (text: string) => Promise<void>;
    removeTodo: (id: string) => Promise<void>;
    toggleTodo: (id: string) => Promise<void>;
}

interface TodoState {
    items: Todo[];
    status: "idle" | "loading" | "error";
    error: string | null;
    actions: TodoActions;
}


export const useTodoStore = create<TodoState>()(
    devtools((set) => ({
        items: [],
        status: "idle",
        error: null,
        actions: {
            fetchTodos: async () => {
                set({ status: "loading", error: null });
                try {
                    const todos = await getAllTodos();
                    set({ items: todos, status: "idle" });
                } catch (error) {
                    set({ status: "error", error: 'Error fetching todos' });
                    throw error;
                }
            },
            addTodo: async (text: string) => {
                set({ status: "loading", error: null });
                try {
                    const newTodo = await createTodo(text);
                    set((state) => ({ items: [...state.items, newTodo], status: "idle" }));
                } catch (error) {
                    set({ status: "error", error: 'Error creating todo' });
                    throw error;
                }
            },
            removeTodo: async (id: string) => {
                set({ status: "loading", error: null });
                try {
                    await deleteTodo(id);
                    set((state) => ({
                        items: state.items.filter((todo) => todo.id !== id),
                        status: "idle",
                    }));
                } catch (error) {
                    set({ status: "error", error: 'Error deleting todo' });
                    throw error;
                }
            },
            toggleTodo: async (id: string) => {
                set({ status: "loading", error: null });
                try {
                    const todo = get().items.find((t) => t.id === id);
                    if (!todo) throw new Error("Todo not found");
                    const updatedTodo = await updateTodo(id, !todo.completed);
                    set((state) => ({
                        items: state.items.map((t) =>
                            t.id === id ? updatedTodo : t
                        ),
                        status: "idle",
                    }));
                } catch (error) {
                    set({ status: "error", error: 'Error toggling todo' });
                    throw error;
                }
            },
        }
    }))
);

const get = useTodoStore.getState;

export const useTodos = () =>
    useTodoStore((state) => state);

export const useTodoActions = () =>
    useTodoStore((state) => state.actions);


