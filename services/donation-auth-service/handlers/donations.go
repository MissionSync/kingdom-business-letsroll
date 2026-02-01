package handlers

import (
	"database/sql"
	"net/http"
	"time"
	"kingdom-business-letsroll/donation-auth-service/models"
	"kingdom-business-letsroll/donation-auth-service/config"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type DonationHandler struct {
	config *config.Config
	db     *sql.DB
}

func NewDonationHandler(cfg *config.Config, db *sql.DB) *DonationHandler {
	return &DonationHandler{
		config: cfg,
		db:     db,
	}
}

// CreateDonation handles donation creation
func (h *DonationHandler) CreateDonation(c *gin.Context) {
	var req models.DonationRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{
			Error:   "validation_error",
			Message: err.Error(),
			Code:    400,
		})
		return
	}

	// Get user ID from JWT token (set by auth middleware)
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, models.ErrorResponse{
			Error:   "unauthorized",
			Message: "User not authenticated",
			Code:    401,
		})
		return
	}

	userUUID, err := uuid.Parse(userID.(string))
	if err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{
			Error:   "invalid_user_id",
			Message: "Invalid user ID",
			Code:    400,
		})
		return
	}

	// Set default currency if not provided
	if req.Currency == "" {
		req.Currency = "USD"
	}

	// Create donation record
	donation := models.Donation{
		ID:            uuid.New(),
		UserID:        userUUID,
		Amount:        req.Amount,
		Currency:      req.Currency,
		Status:        "pending",
		PaymentMethod: req.PaymentMethod,
		Message:       req.Message,
		Anonymous:     req.Anonymous,
		CreatedAt:     time.Now(),
		UpdatedAt:     time.Now(),
	}

	// TODO: Process payment with Stripe
	// For now, we'll simulate successful payment processing
	donation.Status = "completed"
	donation.StripeID = "pi_" + uuid.New().String()

	// TODO: Save donation to Supabase database

	c.JSON(http.StatusCreated, gin.H{
		"message":  "Donation processed successfully",
		"donation": donation,
	})
}

// GetDonations retrieves user's donation history
func (h *DonationHandler) GetDonations(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, models.ErrorResponse{
			Error:   "unauthorized",
			Message: "User not authenticated",
			Code:    401,
		})
		return
	}

	// TODO: Fetch donations from Supabase database
	// For now, we'll return mock data
	donations := []models.Donation{
		{
			ID:            uuid.New(),
			UserID:        uuid.MustParse(userID.(string)),
			Amount:        50.00,
			Currency:      "USD",
			Status:        "completed",
			PaymentMethod: "card",
			Message:       "Supporting the mission",
			Anonymous:     false,
			CreatedAt:     time.Now().Add(-24 * time.Hour),
			UpdatedAt:     time.Now().Add(-24 * time.Hour),
		},
	}

	c.JSON(http.StatusOK, gin.H{
		"donations": donations,
		"total":     len(donations),
	})
}

// GetDonationStats retrieves donation statistics
func (h *DonationHandler) GetDonationStats(c *gin.Context) {
	// TODO: Calculate real stats from Supabase database
	// For now, we'll return mock data
	stats := gin.H{
		"total_donations":     15000.00,
		"donation_count":      150,
		"average_donation":    100.00,
		"monthly_donations":   2500.00,
		"top_donation":        500.00,
		"recent_donations":    5,
	}

	c.JSON(http.StatusOK, stats)
}

// ProcessStripeWebhook handles Stripe webhook events
func (h *DonationHandler) ProcessStripeWebhook(c *gin.Context) {
	// TODO: Implement Stripe webhook signature verification
	// TODO: Handle different Stripe event types (payment_intent.succeeded, etc.)
	
	c.JSON(http.StatusOK, gin.H{
		"message": "Webhook received",
	})
}
