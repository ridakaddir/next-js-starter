import { StateCreator } from "zustand";
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

export interface TodoState {
    todos: {
        items: Todo[];
        status: "idle" | "loading" | "error";
        error: string | null;
        actions: TodoActions;
    }
}


export const createTodoSlice: StateCreator<TodoState> = (
    (set, get) => ({
        todos: {
            items: [],
            status: "idle",
            error: null,
            actions: {
                fetchTodos: async () => {
                    set({
                        todos: { ...get().todos, status: "loading", error: null }
                    });
                    try {
                        const todos = await getAllTodos();
                        set({ todos: { ...get().todos, items: todos, status: "idle" } });
                    } catch (error) {
                        set({ todos: { ...get().todos, status: "error", error: 'Error fetching todos' } });
                        throw error;
                    }
                },
                addTodo: async (text: string) => {
                    set({ todos: { ...get().todos, status: "loading", error: null } });
                    try {
                        const newTodo = await createTodo(text);
                        set((state) => ({ todos: { ...state.todos, items: [...state.todos.items, newTodo], status: "idle" } }));
                    } catch (error) {
                        set({ todos: { ...get().todos, status: "error", error: 'Error creating todo' } });
                        throw error;
                    }
                },
                removeTodo: async (id: string) => {
                    set({ todos: { ...get().todos, status: "loading", error: null } });
                    try {
                        await deleteTodo(id);
                        set((state) => ({ todos: { ...state.todos, items: state.todos.items.filter((t) => t.id !== id), status: "idle" } }));
                    } catch (error) {
                        set({ todos: { ...get().todos, status: "error", error: 'Error deleting todo' } });
                        throw error;
                    }
                },
                toggleTodo: async (id: string) => {
                    set({ todos: { ...get().todos, status: "loading", error: null } });
                    try {
                        const todo = get().todos.items.find((t) => t.id === id);
                        if (!todo) throw new Error("Todo not found");
                        const updatedTodo = await updateTodo(id, !todo.completed);
                        set((state) => ({ todos: { ...state.todos, items: state.todos.items.map((t) => t.id === id ? updatedTodo : t), status: "idle" } }));
                    } catch (error) {
                        set({ todos: { ...get().todos, status: "error", error: 'Error toggling todo' } });
                        throw error;
                    }
                },
            }
        }
    })
);
