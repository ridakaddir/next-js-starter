'use server'
import * as grpc from '@grpc/grpc-js';
import { prisma } from "@/lib/prisma";
import { Customer as CustomerProto, UpdateCustomerReq } from '@/lib/grpc/customers_pb';
import { CustomerServiceClient } from "@/lib/grpc/customers_grpc_pb";
import { AddCustomerReq, ListCustomersReq } from '@/lib/grpc/customers_pb';
import { Customer } from './customerSlice';

export const getAllCustomers = async () => {
    const customers = await prisma.customer.findMany({
        orderBy: { createdAt: 'desc' },
    })
    return customers;
};

const GRPC_SERVER_ADDRESS = process.env.GRPC_SERVER_ADDRESS || 'localhost:50051';

const customerServiceClient = new CustomerServiceClient(GRPC_SERVER_ADDRESS, grpc.credentials.createInsecure());

const listCustomers = (): Promise<Customer[]> => {
    return new Promise((resolve, reject) => {
        const request = new ListCustomersReq();
        customerServiceClient.listCustomers(request, (err: grpc.ServiceError | null, response) => {
            if (err) {
                return reject(err);
            }
            const customers = response.getCustomersList().map((c) => ({
                id: c.getId(),
                name: c.getName(),
                email: c.getEmail(),
            }));
            resolve(customers);
        });
    });
}

export const getAllCustomersFromgRPC = async () => {
    const customers = await listCustomers();
    return customers.map((c) => ({
        id: c.id,
        name: c.name,
        email: c.email,
    }));
};

// export const createCustomer = async (data: Omit<Customer, "id">) => {
//     const customer = await prisma.customer.create({
//         data,
//     });
//     return customer;
// };

export const createCustomer = async (data: Omit<Customer, "id">) => {
    const req = new AddCustomerReq();
    ;
    req.setCustomer(
        new CustomerProto()
            .setName(data.name)
            .setEmail(data.email)
            .setCreatedat(new Date().toISOString())
            .setUpdatedat(new Date().toISOString())
    );
    customerServiceClient.addCustomer(req, (err, response) => {
        if (err) {
            console.error('Error adding customer via gRPC:', err);
            throw err;
        }
        const addedCustomer = response.getCustomer();
        return {
            id: addedCustomer?.getId(),
            name: addedCustomer?.getName(),
            email: addedCustomer?.getEmail(),
        };
    });
    // return the created customer object
    return {
        id: 'temp-id', // replace with actual id from response
        name: data.name,
        email: data.email,
    };
};

export const deleteCustomer = async (id: string) => {
    await prisma.customer.delete({
        where: { id },
    });
    return id;
};

// export const updateCustomer = async (id: string, data: Partial<Omit<Customer, "id">>) => {
//     const customer = await prisma.customer.update({
//         where: { id },
//         data,
//     });
//     return customer;
// };

export const updateCustomer = async (id: string, data: Partial<Omit<Customer, "id">>) => {
    const req = new UpdateCustomerReq();
    req.setCustomer(
        new CustomerProto()
            .setId(id)
            .setName(data.name || '')
            .setEmail(data.email || '')
            .setUpdatedat(new Date().toISOString())
    );

    customerServiceClient.updateCustomer(req, (err, response) => {
        if (err) {
            console.error('Error updating customer via gRPC:', err);
            throw err;
        }
        const updatedCustomer = response.getCustomer();
        return {
            id: updatedCustomer?.getId(),
            name: updatedCustomer?.getName(),
            email: updatedCustomer?.getEmail(),
        };
    });
    // return the updated customer object
    return {
        id,
        name: data.name || '',
        email: data.email || '',
    };
}

