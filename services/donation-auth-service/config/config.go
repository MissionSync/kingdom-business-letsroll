package config

import (
	"os"
	"log"
	"github.com/joho/godotenv"
)

type Config struct {
	Port                string
	DatabasePath        string
	JWTSecret           string
	StripeSecretKey     string
	StripeWebhookSecret string
}

func LoadConfig() *Config {
	// Load .env file if it exists
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using environment variables")
	}

	return &Config{
		Port:                getEnv("PORT", "8080"),
		DatabasePath:        getEnv("DATABASE_PATH", "./database.db"),
		JWTSecret:           getEnv("JWT_SECRET", "your-secret-key"),
		StripeSecretKey:     getEnv("STRIPE_SECRET_KEY", ""),
		StripeWebhookSecret: getEnv("STRIPE_WEBHOOK_SECRET", ""),
	}
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}
