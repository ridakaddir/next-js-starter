import { createCustomerSlice } from "@/features/customers/customerSlice";
import { createTodoSlice } from "@/features/todo/todoSlice";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type StoreState = ReturnType<typeof createCustomerSlice> & ReturnType<typeof createTodoSlice>

export const useBoundStore = create<StoreState>()(devtools((...a) => ({
    ...createCustomerSlice(...a),
    ...createTodoSlice(...a),
})));



export const useTodoActions = () => useBoundStore((state) => state.todos.actions);
export const useTodos = () => useBoundStore((state) => state.todos);


export const useCustomerActions = () => useBoundStore((state) => state.customers.actions);
export const useCustomers = () => useBoundStore((state) => state.customers);