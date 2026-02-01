package main

import (
	"database/sql"
	"fmt"
	"log"
	"kingdom-business-letsroll/donation-auth-service/config"
	"kingdom-business-letsroll/donation-auth-service/handlers"
	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
)

func setupDatabase(dbPath string) *sql.DB {
	db, err := sql.Open("sqlite3", dbPath)
	if err != nil {
		log.Fatal("Failed to open database:", err)
	}

	// Test connection
	if err := db.Ping(); err != nil {
		log.Fatal("Failed to ping database:", err)
	}

	// Create users table
	createUsersTable := `
	CREATE TABLE IF NOT EXISTS users (
		id TEXT PRIMARY KEY,
		email TEXT UNIQUE NOT NULL,
		password_hash TEXT NOT NULL,
		first_name TEXT,
		last_name TEXT,
		phone TEXT,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
	);
	`

	// Create donations table
	createDonatiosTable := `
	CREATE TABLE IF NOT EXISTS donations (
		id TEXT PRIMARY KEY,
		user_id TEXT NOT NULL,
		amount REAL NOT NULL,
		currency TEXT DEFAULT 'USD',
		status TEXT DEFAULT 'pending',
		payment_method TEXT,
		stripe_payment_id TEXT,
		message TEXT,
		anonymous BOOLEAN DEFAULT FALSE,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY (user_id) REFERENCES users(id)
	);
	`

	if _, err := db.Exec(createUsersTable); err != nil {
		log.Fatal("Failed to create users table:", err)
	}

	if _, err := db.Exec(createDonatiosTable); err != nil {
		log.Fatal("Failed to create donations table:", err)
	}

	log.Println("Database initialized successfully")
	return db
}

func main() {
	// Load configuration
	cfg := config.LoadConfig()
	log.Printf("Starting server on port %s", cfg.Port)

	// Setup database
	db := setupDatabase(cfg.DatabasePath)
	defer db.Close()

	// Create handlers
	authHandler := handlers.NewAuthHandler(cfg, db)
	donationHandler := handlers.NewDonationHandler(cfg, db)

	// Setup router
	r := gin.Default()

	// Add CORS middleware
	r.Use(func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	// Health check endpoint
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "healthy", "service": "donation-auth-service"})
	})

	// Auth routes
	auth := r.Group("/auth")
	{
		auth.POST("/register", authHandler.Register)
		auth.POST("/login", authHandler.Login)
	}

	// Protected donation routes
	donations := r.Group("/donations")
	donations.Use(authHandler.AuthMiddleware())
	{
		donations.POST("/", donationHandler.CreateDonation)
		donations.GET("/", donationHandler.GetDonations)
		donations.GET("/stats", donationHandler.GetDonationStats)
	}

	// Stripe webhook (public endpoint)
	r.POST("/webhook/stripe", donationHandler.ProcessStripeWebhook)

	// Start server
	log.Printf("Server running on http://localhost:%s", cfg.Port)
	r.Run(fmt.Sprintf(":%s", cfg.Port))
}

