package main

import (
	"log"
	"net"

	"grpc-server/server/customers"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

func main() {
	lis, err := net.Listen("tcp", "localhost:50051")
	if err != nil {
		log.Fatal("Could not listen on port")
	}

	customerServer := customers.NewServer()

	grpcServer := grpc.NewServer()
	reflection.Register(grpcServer)
	customers.RegisterCustomerServiceServer(grpcServer, customerServer)
	log.Println("Starting server...")
	grpcServer.Serve(lis)
}
