import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Customer as CustomerServer } from '@/lib/grpc/customers_pb'
import { createCustomer, getAllCustomersFromgRPC, updateCustomer } from './customers.server'

export type Customer = Pick<CustomerServer.AsObject, 'id' | 'name' | 'email'>


type CustomerActions = {
    addCustomerAsync: (customer: Omit<Customer, 'id'>) => Promise<void>
    fetchCustomersAsync: () => Promise<void>
    updateCustomerAsync: (customer: Customer) => Promise<void>
}

type CustomersState = {
    items: Customer[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
    actions: CustomerActions
}

const useCustomer = create<CustomersState>()(devtools((set) => ({
    items: [],
    status: 'idle',
    error: null,
    actions: {
        addCustomerAsync: async (customer: Omit<Customer, 'id'>) => {
            set((state: CustomersState) => ({ ...state, status: 'loading' }))
            try {
                const created = await createCustomer(customer);
                set((state: CustomersState): CustomersState => ({
                    ...state,
                    status: 'succeeded',
                    items: [...state.items, created],
                }))
            } catch (error) {
                set((state: CustomersState): CustomersState => ({
                    ...state,
                    status: 'failed',
                    error: (error as Error).message,
                }))
                throw error
            }
        },
        fetchCustomersAsync: async () => {
            set((state: CustomersState) => ({ ...state, status: 'loading' }))
            try {
                const customers = await getAllCustomersFromgRPC()
                set((state: CustomersState): CustomersState => ({
                    ...state,
                    status: 'succeeded',
                    items: customers,
                }))
            } catch (error) {
                set((state: CustomersState): CustomersState => ({
                    ...state,
                    status: 'failed',
                    error: (error as Error).message,
                }))
                throw error
            }
        },
        updateCustomerAsync: async (customer: Customer) => {
            set((state: CustomersState) => ({ ...state, status: 'loading' }))
            try {
                const updated = await updateCustomer(customer.id, customer)
                set((state: CustomersState): CustomersState => ({
                    ...state,
                    status: 'succeeded',
                    items: state.items.map((c) => (c.id === updated.id ? updated : c)),
                }))
            } catch (error) {
                set((state: CustomersState): CustomersState => ({
                    ...state,
                    status: 'failed',
                    error: (error as Error).message,
                }))
                throw error
            }
        }
    }
})))

export const useCustomerActions = () => useCustomer((state) => state.actions)
export const useCustomers = () => useCustomer((state) => (state))