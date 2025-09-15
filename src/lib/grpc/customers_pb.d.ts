// package: customers
// file: customers.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Customer extends jspb.Message { 
    getId(): string;
    setId(value: string): Customer;
    getName(): string;
    setName(value: string): Customer;
    getEmail(): string;
    setEmail(value: string): Customer;
    getCreatedat(): string;
    setCreatedat(value: string): Customer;
    getUpdatedat(): string;
    setUpdatedat(value: string): Customer;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Customer.AsObject;
    static toObject(includeInstance: boolean, msg: Customer): Customer.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Customer, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Customer;
    static deserializeBinaryFromReader(message: Customer, reader: jspb.BinaryReader): Customer;
}

export namespace Customer {
    export type AsObject = {
        id: string,
        name: string,
        email: string,
        createdat: string,
        updatedat: string,
    }
}

export class AddCustomerReq extends jspb.Message { 

    hasCustomer(): boolean;
    clearCustomer(): void;
    getCustomer(): Customer | undefined;
    setCustomer(value?: Customer): AddCustomerReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddCustomerReq.AsObject;
    static toObject(includeInstance: boolean, msg: AddCustomerReq): AddCustomerReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddCustomerReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddCustomerReq;
    static deserializeBinaryFromReader(message: AddCustomerReq, reader: jspb.BinaryReader): AddCustomerReq;
}

export namespace AddCustomerReq {
    export type AsObject = {
        customer?: Customer.AsObject,
    }
}

export class AddCustomerRes extends jspb.Message { 

    hasCustomer(): boolean;
    clearCustomer(): void;
    getCustomer(): Customer | undefined;
    setCustomer(value?: Customer): AddCustomerRes;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddCustomerRes.AsObject;
    static toObject(includeInstance: boolean, msg: AddCustomerRes): AddCustomerRes.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddCustomerRes, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddCustomerRes;
    static deserializeBinaryFromReader(message: AddCustomerRes, reader: jspb.BinaryReader): AddCustomerRes;
}

export namespace AddCustomerRes {
    export type AsObject = {
        customer?: Customer.AsObject,
    }
}

export class UpdateCustomerReq extends jspb.Message { 

    hasCustomer(): boolean;
    clearCustomer(): void;
    getCustomer(): Customer | undefined;
    setCustomer(value?: Customer): UpdateCustomerReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateCustomerReq.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateCustomerReq): UpdateCustomerReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateCustomerReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateCustomerReq;
    static deserializeBinaryFromReader(message: UpdateCustomerReq, reader: jspb.BinaryReader): UpdateCustomerReq;
}

export namespace UpdateCustomerReq {
    export type AsObject = {
        customer?: Customer.AsObject,
    }
}

export class UpdateCustomerRes extends jspb.Message { 

    hasCustomer(): boolean;
    clearCustomer(): void;
    getCustomer(): Customer | undefined;
    setCustomer(value?: Customer): UpdateCustomerRes;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateCustomerRes.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateCustomerRes): UpdateCustomerRes.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateCustomerRes, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateCustomerRes;
    static deserializeBinaryFromReader(message: UpdateCustomerRes, reader: jspb.BinaryReader): UpdateCustomerRes;
}

export namespace UpdateCustomerRes {
    export type AsObject = {
        customer?: Customer.AsObject,
    }
}

export class ListCustomersReq extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListCustomersReq.AsObject;
    static toObject(includeInstance: boolean, msg: ListCustomersReq): ListCustomersReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListCustomersReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListCustomersReq;
    static deserializeBinaryFromReader(message: ListCustomersReq, reader: jspb.BinaryReader): ListCustomersReq;
}

export namespace ListCustomersReq {
    export type AsObject = {
    }
}

export class ListCustomersRes extends jspb.Message { 
    clearCustomersList(): void;
    getCustomersList(): Array<Customer>;
    setCustomersList(value: Array<Customer>): ListCustomersRes;
    addCustomers(value?: Customer, index?: number): Customer;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListCustomersRes.AsObject;
    static toObject(includeInstance: boolean, msg: ListCustomersRes): ListCustomersRes.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListCustomersRes, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListCustomersRes;
    static deserializeBinaryFromReader(message: ListCustomersRes, reader: jspb.BinaryReader): ListCustomersRes;
}

export namespace ListCustomersRes {
    export type AsObject = {
        customersList: Array<Customer.AsObject>,
    }
}
