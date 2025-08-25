'use server'

import { prisma } from "@/lib/prisma";
import { Customer } from "@/_features/customers/customerSlice";

export const getAllCustomers = async () => {
    const customers = await prisma.customer.findMany({
        orderBy: { createdAt: 'desc' },
    })
    return customers;
};

export const createCustomer = async (data: Omit<Customer, "id">) => {
    const customer = await prisma.customer.create({
        data,
    });
    return customer;
};

export const deleteCustomer = async (id: string) => {
    await prisma.customer.delete({
        where: { id },
    });
    return id;
};

export const updateCustomer = async (id: string, data: Partial<Omit<Customer, "id">>) => {
    const customer = await prisma.customer.update({
        where: { id },
        data,
    });
    return customer;
};
