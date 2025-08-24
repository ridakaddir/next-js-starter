import { createCustomer, deleteCustomer, getAllCustomers, updateCustomer } from '@/features/customers/customers.server'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Customer = {
  id: string
  name: string
  email: string
}

type CustomersState = {
  items: Customer[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: CustomersState = {
  items: [],
  status: 'idle',
  error: null,
}

// GET /api/customers
export const fetchCustomersAsync = createAsyncThunk<Customer[]>(
  'customers/fetchAll',
  async () => {
    return getAllCustomers();
  }
)

// POST /api/customers
export const addCustomerAsync = createAsyncThunk<Customer, Omit<Customer, 'id'>>(
  'customers/add',
  async (data) => {
    return createCustomer(data);
  }
)

// PUT /api/customers
export const updateCustomerAsync = createAsyncThunk<Customer, Customer>(
  'customers/update',
  async (customer) => {
    return updateCustomer(customer.id, customer);
  }
)

// DELETE /api/customers
export const deleteCustomerAsync = createAsyncThunk<string, string>(
  'customers/delete',
  async (id) => {
    return await deleteCustomer(id);
  }
)

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomersAsync.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchCustomersAsync.fulfilled, (state, action: PayloadAction<Customer[]>) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchCustomersAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Error'
      })
      .addCase(addCustomerAsync.fulfilled, (state, action: PayloadAction<Customer>) => {
        state.items.unshift(action.payload)
      })
      .addCase(updateCustomerAsync.fulfilled, (state, action: PayloadAction<Customer>) => {
        const idx = state.items.findIndex((c) => c.id === action.payload.id)
        if (idx !== -1) state.items[idx] = action.payload
      })
      .addCase(deleteCustomerAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((c) => c.id !== action.payload)
      })
  },
})

export default customersSlice.reducer
