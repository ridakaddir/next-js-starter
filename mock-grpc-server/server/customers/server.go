package customers

import (
	"context"
	"log"
)

type Server struct {
	UnimplementedCustomerServiceServer
	customers []*Customer
}

// initalize with some dummy data
func NewServer() *Server {
	return &Server{
		customers: []*Customer{
			{Id: "1", Name: "John Doe", Email: "john@example.com"},
			{Id: "2", Name: "Jane Smith", Email: "jane@example.com"},
		},
	}
}

func (s *Server) ListCustomers(ctx context.Context, req *ListCustomersReq) (*ListCustomersRes, error) {
	// Dummy data - replace with actual data retrieval logic
	// customers := []*Customer{
	// 	{Id: "1", Name: "John Doe", Email: "john@example.com"},
	// 	{Id: "2", Name: "Jane Smith", Email: "jane@example.com"},
	// }
	log.Println("ListCustomers called")

	return &ListCustomersRes{Customers: s.customers}, nil
}

func (s *Server) AddCustomer(ctx context.Context, req *AddCustomerReq) (*AddCustomerRes, error) {
	log.Println("AddCustomer called")
	customer := req.GetCustomer()
	newID := len(s.customers) + 1
	customer.Id = string(rune(newID))

	// Here you would typically add the customer to your database
	// For this example, we just log and return the same customer
	log.Printf("Adding customer: %v", customer)

	s.customers = append(s.customers, customer)
	return &AddCustomerRes{Customer: customer}, nil
}

func (s *Server) UpdateCustomer(ctx context.Context, req *UpdateCustomerReq) (*UpdateCustomerRes, error) {
	log.Println("UpdateCustomer called")
	customer := req.GetCustomer()
	// Here you would typically update the customer in your database
	// For this example, we just log and return the same customer
	log.Printf("Updating customer: %v", customer)
	// Dummy update logic: replace the customer in the slice if it exists
	for i, c := range s.customers {
		if c.Id == customer.Id {
			s.customers[i] = customer
			break
		}
	}

	return &UpdateCustomerRes{Customer: customer}, nil
}
