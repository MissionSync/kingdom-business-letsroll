package models

import (
	"time"
	"github.com/google/uuid"
)

// User represents a user in the system
type User struct {
	ID        uuid.UUID `json:"id" db:"id"`
	Email     string    `json:"email" db:"email" binding:"required,email"`
	Password  string    `json:"password,omitempty" db:"password_hash" binding:"required,min=8"`
	FirstName string    `json:"first_name" db:"first_name"`
	LastName  string    `json:"last_name" db:"last_name"`
	Phone     string    `json:"phone" db:"phone"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
}

// LoginRequest represents login credentials
type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

// RegisterRequest represents user registration data
type RegisterRequest struct {
	Email     string `json:"email" binding:"required,email"`
	Password  string `json:"password" binding:"required,min=8"`
	FirstName string `json:"first_name" binding:"required"`
	LastName  string `json:"last_name" binding:"required"`
	Phone     string `json:"phone"`
}

// Donation represents a donation record
type Donation struct {
	ID            uuid.UUID `json:"id" db:"id"`
	UserID        uuid.UUID `json:"user_id" db:"user_id"`
	Amount        float64   `json:"amount" db:"amount" binding:"required,min=1"`
	Currency      string    `json:"currency" db:"currency"`
	Status        string    `json:"status" db:"status"`
	PaymentMethod string    `json:"payment_method" db:"payment_method"`
	StripeID      string    `json:"stripe_id,omitempty" db:"stripe_payment_id"`
	Message       string    `json:"message" db:"message"`
	Anonymous     bool      `json:"anonymous" db:"anonymous"`
	CreatedAt     time.Time `json:"created_at" db:"created_at"`
	UpdatedAt     time.Time `json:"updated_at" db:"updated_at"`
}

// DonationRequest represents a donation request
type DonationRequest struct {
	Amount        float64 `json:"amount" binding:"required,min=1"`
	Currency      string  `json:"currency"`
	PaymentMethod string  `json:"payment_method" binding:"required"`
	Message       string  `json:"message"`
	Anonymous     bool    `json:"anonymous"`
}

// AuthResponse represents authentication response
type AuthResponse struct {
	Token     string `json:"token"`
	User      User   `json:"user"`
	ExpiresAt int64  `json:"expires_at"`
}

// ErrorResponse represents error response
type ErrorResponse struct {
	Error   string `json:"error"`
	Message string `json:"message"`
	Code    int    `json:"code"`
}
