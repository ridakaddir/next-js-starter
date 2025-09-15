"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardHeader, CardBody } from 'uikit/Card'
import { TextInput, Button } from 'uikit/Form'
import { Customer, useCustomerActions, useCustomers } from './customerStore'

// Shared validation schema for create/edit
const customerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Enter a valid email'),
})

type CustomerFormValues = z.infer<typeof customerSchema>

function CustomerEditForm({ customer, onClose }: { customer: Customer; onClose: () => void }) {

  const { updateCustomerAsync } = useCustomerActions()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: { name: customer.name, email: customer.email },
  })

  const onSubmit = async (values: CustomerFormValues) => {
    await updateCustomerAsync({ ...customer, name: values.name.trim(), email: values.email.trim() })
    onClose()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3 w-full items-start">
      <div className="flex-1">
        <TextInput placeholder="Name" {...register('name')} />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
      </div>
      <div className="flex-1">
        <TextInput placeholder="Email" {...register('email')} />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
      </div>
      <div className="flex items-center gap-2">
        <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-500">Save</Button>
        <Button type="button" onClick={onClose} className="bg-neutral-200 text-neutral-800 hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700">Cancel</Button>
      </div>
    </form>
  )
}

export default function Customers() {

  const { addCustomerAsync, fetchCustomersAsync } = useCustomerActions()
  const { error, status, items } = useCustomers()

  const fetchCustomers = React.useCallback(async () => {
    await fetchCustomersAsync()
  }, [fetchCustomersAsync])

  React.useEffect(() => {
    fetchCustomers()
  }, [fetchCustomers])

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: { name: '', email: '' },
  })
  const [editing, setEditing] = React.useState<Customer | null>(null)

  const onAdd = async (values: CustomerFormValues) => {
    await addCustomerAsync({ name: values.name.trim(), email: values.email.trim() })
    reset()
  }


  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card>
        <CardHeader title="Customers" subtitle="Create, update, and remove customers." />
        <CardBody className="space-y-6">
          <form onSubmit={handleSubmit(onAdd)} className="flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <TextInput placeholder="Name" {...register('name')} />
                {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
              </div>
              <div className="flex-1">
                <TextInput placeholder="Email" {...register('email')} />
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
              </div>
              <Button type="submit" disabled={isSubmitting}>Add</Button>
            </div>
          </form>

          {status === 'loading' && <p className="text-sm text-neutral-500">Loading…</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}

          <ul className="divide-y divide-neutral-200/70 dark:divide-neutral-800/60">
            {items.map((c) => (
              <li key={c.id} className="flex items-center gap-3 py-3">
                {editing?.id === c.id ? (
                  <CustomerEditForm customer={c} onClose={() => setEditing(null)} />
                ) : (
                  <>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{c.name}</p>
                      <p className="text-xs text-neutral-500">{c.email}</p>
                    </div>
                    <Button onClick={() => setEditing(c)} className="bg-blue-600 hover:bg-blue-500">Edit</Button>
                    {/* <Button onClick={() => dispatch(deleteCustomerAsync(c.id))} className="bg-red-600 hover:bg-red-500">Delete</Button> */}
                  </>
                )}
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  )
}
