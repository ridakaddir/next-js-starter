// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var customers_pb = require('./customers_pb.js');

function serialize_customers_AddCustomerReq(arg) {
  if (!(arg instanceof customers_pb.AddCustomerReq)) {
    throw new Error('Expected argument of type customers.AddCustomerReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_customers_AddCustomerReq(buffer_arg) {
  return customers_pb.AddCustomerReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_customers_AddCustomerRes(arg) {
  if (!(arg instanceof customers_pb.AddCustomerRes)) {
    throw new Error('Expected argument of type customers.AddCustomerRes');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_customers_AddCustomerRes(buffer_arg) {
  return customers_pb.AddCustomerRes.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_customers_ListCustomersReq(arg) {
  if (!(arg instanceof customers_pb.ListCustomersReq)) {
    throw new Error('Expected argument of type customers.ListCustomersReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_customers_ListCustomersReq(buffer_arg) {
  return customers_pb.ListCustomersReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_customers_ListCustomersRes(arg) {
  if (!(arg instanceof customers_pb.ListCustomersRes)) {
    throw new Error('Expected argument of type customers.ListCustomersRes');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_customers_ListCustomersRes(buffer_arg) {
  return customers_pb.ListCustomersRes.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_customers_UpdateCustomerReq(arg) {
  if (!(arg instanceof customers_pb.UpdateCustomerReq)) {
    throw new Error('Expected argument of type customers.UpdateCustomerReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_customers_UpdateCustomerReq(buffer_arg) {
  return customers_pb.UpdateCustomerReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_customers_UpdateCustomerRes(arg) {
  if (!(arg instanceof customers_pb.UpdateCustomerRes)) {
    throw new Error('Expected argument of type customers.UpdateCustomerRes');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_customers_UpdateCustomerRes(buffer_arg) {
  return customers_pb.UpdateCustomerRes.deserializeBinary(new Uint8Array(buffer_arg));
}


var CustomerServiceService = exports.CustomerServiceService = {
  listCustomers: {
    path: '/customers.CustomerService/ListCustomers',
    requestStream: false,
    responseStream: false,
    requestType: customers_pb.ListCustomersReq,
    responseType: customers_pb.ListCustomersRes,
    requestSerialize: serialize_customers_ListCustomersReq,
    requestDeserialize: deserialize_customers_ListCustomersReq,
    responseSerialize: serialize_customers_ListCustomersRes,
    responseDeserialize: deserialize_customers_ListCustomersRes,
  },
  addCustomer: {
    path: '/customers.CustomerService/AddCustomer',
    requestStream: false,
    responseStream: false,
    requestType: customers_pb.AddCustomerReq,
    responseType: customers_pb.AddCustomerRes,
    requestSerialize: serialize_customers_AddCustomerReq,
    requestDeserialize: deserialize_customers_AddCustomerReq,
    responseSerialize: serialize_customers_AddCustomerRes,
    responseDeserialize: deserialize_customers_AddCustomerRes,
  },
  updateCustomer: {
    path: '/customers.CustomerService/UpdateCustomer',
    requestStream: false,
    responseStream: false,
    requestType: customers_pb.UpdateCustomerReq,
    responseType: customers_pb.UpdateCustomerRes,
    requestSerialize: serialize_customers_UpdateCustomerReq,
    requestDeserialize: deserialize_customers_UpdateCustomerReq,
    responseSerialize: serialize_customers_UpdateCustomerRes,
    responseDeserialize: deserialize_customers_UpdateCustomerRes,
  },
};

exports.CustomerServiceClient = grpc.makeGenericClientConstructor(CustomerServiceService, 'CustomerService');
