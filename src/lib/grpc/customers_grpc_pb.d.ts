// package: customers
// file: customers.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as customers_pb from "./customers_pb";

interface ICustomerServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    listCustomers: ICustomerServiceService_IListCustomers;
    addCustomer: ICustomerServiceService_IAddCustomer;
    updateCustomer: ICustomerServiceService_IUpdateCustomer;
}

interface ICustomerServiceService_IListCustomers extends grpc.MethodDefinition<customers_pb.ListCustomersReq, customers_pb.ListCustomersRes> {
    path: "/customers.CustomerService/ListCustomers";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<customers_pb.ListCustomersReq>;
    requestDeserialize: grpc.deserialize<customers_pb.ListCustomersReq>;
    responseSerialize: grpc.serialize<customers_pb.ListCustomersRes>;
    responseDeserialize: grpc.deserialize<customers_pb.ListCustomersRes>;
}
interface ICustomerServiceService_IAddCustomer extends grpc.MethodDefinition<customers_pb.AddCustomerReq, customers_pb.AddCustomerRes> {
    path: "/customers.CustomerService/AddCustomer";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<customers_pb.AddCustomerReq>;
    requestDeserialize: grpc.deserialize<customers_pb.AddCustomerReq>;
    responseSerialize: grpc.serialize<customers_pb.AddCustomerRes>;
    responseDeserialize: grpc.deserialize<customers_pb.AddCustomerRes>;
}
interface ICustomerServiceService_IUpdateCustomer extends grpc.MethodDefinition<customers_pb.UpdateCustomerReq, customers_pb.UpdateCustomerRes> {
    path: "/customers.CustomerService/UpdateCustomer";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<customers_pb.UpdateCustomerReq>;
    requestDeserialize: grpc.deserialize<customers_pb.UpdateCustomerReq>;
    responseSerialize: grpc.serialize<customers_pb.UpdateCustomerRes>;
    responseDeserialize: grpc.deserialize<customers_pb.UpdateCustomerRes>;
}

export const CustomerServiceService: ICustomerServiceService;

export interface ICustomerServiceServer {
    listCustomers: grpc.handleUnaryCall<customers_pb.ListCustomersReq, customers_pb.ListCustomersRes>;
    addCustomer: grpc.handleUnaryCall<customers_pb.AddCustomerReq, customers_pb.AddCustomerRes>;
    updateCustomer: grpc.handleUnaryCall<customers_pb.UpdateCustomerReq, customers_pb.UpdateCustomerRes>;
}

export interface ICustomerServiceClient {
    listCustomers(request: customers_pb.ListCustomersReq, callback: (error: grpc.ServiceError | null, response: customers_pb.ListCustomersRes) => void): grpc.ClientUnaryCall;
    listCustomers(request: customers_pb.ListCustomersReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: customers_pb.ListCustomersRes) => void): grpc.ClientUnaryCall;
    listCustomers(request: customers_pb.ListCustomersReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: customers_pb.ListCustomersRes) => void): grpc.ClientUnaryCall;
    addCustomer(request: customers_pb.AddCustomerReq, callback: (error: grpc.ServiceError | null, response: customers_pb.AddCustomerRes) => void): grpc.ClientUnaryCall;
    addCustomer(request: customers_pb.AddCustomerReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: customers_pb.AddCustomerRes) => void): grpc.ClientUnaryCall;
    addCustomer(request: customers_pb.AddCustomerReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: customers_pb.AddCustomerRes) => void): grpc.ClientUnaryCall;
    updateCustomer(request: customers_pb.UpdateCustomerReq, callback: (error: grpc.ServiceError | null, response: customers_pb.UpdateCustomerRes) => void): grpc.ClientUnaryCall;
    updateCustomer(request: customers_pb.UpdateCustomerReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: customers_pb.UpdateCustomerRes) => void): grpc.ClientUnaryCall;
    updateCustomer(request: customers_pb.UpdateCustomerReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: customers_pb.UpdateCustomerRes) => void): grpc.ClientUnaryCall;
}

export class CustomerServiceClient extends grpc.Client implements ICustomerServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public listCustomers(request: customers_pb.ListCustomersReq, callback: (error: grpc.ServiceError | null, response: customers_pb.ListCustomersRes) => void): grpc.ClientUnaryCall;
    public listCustomers(request: customers_pb.ListCustomersReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: customers_pb.ListCustomersRes) => void): grpc.ClientUnaryCall;
    public listCustomers(request: customers_pb.ListCustomersReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: customers_pb.ListCustomersRes) => void): grpc.ClientUnaryCall;
    public addCustomer(request: customers_pb.AddCustomerReq, callback: (error: grpc.ServiceError | null, response: customers_pb.AddCustomerRes) => void): grpc.ClientUnaryCall;
    public addCustomer(request: customers_pb.AddCustomerReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: customers_pb.AddCustomerRes) => void): grpc.ClientUnaryCall;
    public addCustomer(request: customers_pb.AddCustomerReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: customers_pb.AddCustomerRes) => void): grpc.ClientUnaryCall;
    public updateCustomer(request: customers_pb.UpdateCustomerReq, callback: (error: grpc.ServiceError | null, response: customers_pb.UpdateCustomerRes) => void): grpc.ClientUnaryCall;
    public updateCustomer(request: customers_pb.UpdateCustomerReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: customers_pb.UpdateCustomerRes) => void): grpc.ClientUnaryCall;
    public updateCustomer(request: customers_pb.UpdateCustomerReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: customers_pb.UpdateCustomerRes) => void): grpc.ClientUnaryCall;
}
