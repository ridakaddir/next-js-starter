// Custom thunk to add a todo and then fetch todos from backend
import { createTodo, deleteTodo, getAllTodos, updateTodo } from "@/features/todo/todos.server";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

export const fetchTodos = createAsyncThunk<Todo[]>(
    "todo/fetchTodos",
    async () => {
        return getAllTodos();
    }
);

export const addTodoAsync = createAsyncThunk<Todo, Omit<Todo, "id">>(
    "todo/addTodo",
    async (todo) => {
        return createTodo(todo.text);
    }
);

export const removeTodoAsync = createAsyncThunk<void, string>(
    "todo/removeTodo",
    async (id) => {
        return deleteTodo(id);
    }
);

export const toggleTodoAsync = createAsyncThunk<void, Todo>(
    "todo/toggleTodo",
    async (todo) => {
        return updateTodo(todo.id, !todo.completed);
    }
);

const initialState: Todo[] = [];

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        // toggleTodo: (state, action: PayloadAction<number>) => {
        //     const todo = state.find((t: Todo) => t.id === action.payload);
        //     if (todo) {
        //         todo.completed = !todo.completed;
        //     }
        // },
        // removeTodo: (state, action: PayloadAction<number>) => {
        //     return state.filter((t: Todo) => t.id !== action.payload);
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(addTodoAsync.fulfilled, (state, action) => {
            state.push(action.payload);
        });
        builder.addCase(removeTodoAsync.fulfilled, (state, action) => {
            return state.filter((t: Todo) => t.id !== action.meta.arg);
        });
        builder.addCase(toggleTodoAsync.fulfilled, (state, action) => {
            const index = state.findIndex((t: Todo) => t.id === action.meta.arg.id);
            if (index !== -1) {
                state[index] = { ...state[index], completed: !state[index].completed };
            }
        });
    },
});

// export const { toggleTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;
