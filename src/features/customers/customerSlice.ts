import { StateCreator } from 'zustand'
import { Customer as CustomerServer } from '@/lib/grpc/customers_pb'
import { createCustomer, getAllCustomersFromgRPC, updateCustomer } from './customers.server'

export type Customer = Pick<CustomerServer.AsObject, 'id' | 'name' | 'email'>


type CustomerActions = {
    addCustomerAsync: (customer: Omit<Customer, 'id'>) => Promise<void>
    fetchCustomersAsync: () => Promise<void>
    updateCustomerAsync: (customer: Customer) => Promise<void>
}

export type CustomersState = {
    customers: {
        items: Customer[]
        status: 'idle' | 'loading' | 'succeeded' | 'failed'
        error: string | null
        actions: CustomerActions
    }
}

export const createCustomerSlice: StateCreator<CustomersState> = ((set) => ({
    customers: {
        items: [],
        status: 'idle',
        error: null,
        actions: {
            addCustomerAsync: async (customer: Omit<Customer, 'id'>) => {
                set((state: CustomersState) => ({ ...state, customers: { ...state.customers, status: 'loading' } }))
                try {
                    const created = await createCustomer(customer);
                    set((state: CustomersState): CustomersState => ({
                        ...state,
                        customers: {
                            ...state.customers,
                            status: 'succeeded',
                            error: null,
                            items: [...state.customers.items, created],
                        },
                    }))
                } catch (error) {
                    set((state: CustomersState): CustomersState => ({
                        ...state,
                        customers: {
                            ...state.customers,
                            status: 'failed',
                            error: (error as Error).message,
                        },
                    }))
                    throw error
                }
            },
            fetchCustomersAsync: async () => {
                set((state: CustomersState) => ({ ...state, customers: { ...state.customers, status: 'loading' } }))
                try {
                    const customers = await getAllCustomersFromgRPC()
                    console.log('Fetched customers from gRPC:', customers);
                    set((state: CustomersState): CustomersState => ({
                        ...state,
                        customers: {
                            ...state.customers,
                            status: 'succeeded',
                            error: null,
                            items: customers,
                        },
                    }))
                } catch (error) {
                    set((state: CustomersState): CustomersState => ({
                        ...state,
                        customers: {
                            ...state.customers,
                            status: 'failed',
                            error: (error as Error).message,
                        }
                    }))
                    throw error
                }
            },
            updateCustomerAsync: async (customer: Customer) => {
                set((state: CustomersState) => ({ ...state, customers: { ...state.customers, status: 'loading' } }))
                try {
                    const updated = await updateCustomer(customer.id, customer)
                    set((state: CustomersState): CustomersState => ({
                        ...state,
                        customers: {
                            ...state.customers,
                            status: 'succeeded',
                            error: null,
                            items: state.customers.items.map((c) => (c.id === updated.id ? updated : c)),
                        },
                    }))
                } catch (error) {
                    set((state: CustomersState): CustomersState => ({
                        ...state,
                        customers: {
                            ...state.customers,
                            status: 'failed',
                            error: (error as Error).message,
                        }
                    }))
                    throw error
                }
            }
        }
    }
}))
