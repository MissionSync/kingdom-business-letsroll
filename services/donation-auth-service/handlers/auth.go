package handlers

import (
	"database/sql"
	"net/http"
	"time"
	"kingdom-business-letsroll/donation-auth-service/models"
	"kingdom-business-letsroll/donation-auth-service/config"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

type AuthHandler struct {
	config *config.Config
	db     *sql.DB
}

func NewAuthHandler(cfg *config.Config, db *sql.DB) *AuthHandler {
	return &AuthHandler{
		config: cfg,
		db:     db,
	}
}

// Register handles user registration
func (h *AuthHandler) Register(c *gin.Context) {
	var req models.RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{
			Error:   "validation_error",
			Message: err.Error(),
			Code:    400,
		})
		return
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{
			Error:   "server_error",
			Message: "Failed to hash password",
			Code:    500,
		})
		return
	}

	// Create user
	user := models.User{
		ID:        uuid.New(),
		Email:     req.Email,
		Password:  string(hashedPassword),
		FirstName: req.FirstName,
		LastName:  req.LastName,
		Phone:     req.Phone,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	// TODO: Save user to Supabase database
	// For now, we'll simulate successful registration

	// Generate JWT token
	token, expiresAt, err := h.generateJWT(user.ID.String(), user.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{
			Error:   "server_error",
			Message: "Failed to generate token",
			Code:    500,
		})
		return
	}

	// Remove password from response
	user.Password = ""

	c.JSON(http.StatusCreated, models.AuthResponse{
		Token:     token,
		User:      user,
		ExpiresAt: expiresAt,
	})
}

// Login handles user authentication
func (h *AuthHandler) Login(c *gin.Context) {
	var req models.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{
			Error:   "validation_error",
			Message: err.Error(),
			Code:    400,
		})
		return
	}

	// TODO: Fetch user from Supabase database
	// For now, we'll simulate a user lookup
	user := models.User{
		ID:        uuid.New(),
		Email:     req.Email,
		FirstName: "John",
		LastName:  "Doe",
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	// TODO: Verify password against stored hash
	// For now, we'll simulate successful authentication

	// Generate JWT token
	token, expiresAt, err := h.generateJWT(user.ID.String(), user.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{
			Error:   "server_error",
			Message: "Failed to generate token",
			Code:    500,
		})
		return
	}

	c.JSON(http.StatusOK, models.AuthResponse{
		Token:     token,
		User:      user,
		ExpiresAt: expiresAt,
	})
}

// generateJWT creates a new JWT token
func (h *AuthHandler) generateJWT(userID, email string) (string, int64, error) {
	expiresAt := time.Now().Add(24 * time.Hour).Unix()
	
	claims := jwt.MapClaims{
		"user_id": userID,
		"email":   email,
		"exp":     expiresAt,
		"iat":     time.Now().Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(h.config.JWTSecret))
	if err != nil {
		return "", 0, err
	}

	return tokenString, expiresAt, nil
}

// AuthMiddleware validates JWT tokens
func (h *AuthHandler) AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.GetHeader("Authorization")
		if tokenString == "" {
			c.JSON(http.StatusUnauthorized, models.ErrorResponse{
				Error:   "unauthorized",
				Message: "Authorization header required",
				Code:    401,
			})
			c.Abort()
			return
		}

		// Remove "Bearer " prefix if present
		if len(tokenString) > 7 && tokenString[:7] == "Bearer " {
			tokenString = tokenString[7:]
		}

		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			return []byte(h.config.JWTSecret), nil
		})

		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, models.ErrorResponse{
				Error:   "unauthorized",
				Message: "Invalid token",
				Code:    401,
			})
			c.Abort()
			return
		}

		if claims, ok := token.Claims.(jwt.MapClaims); ok {
			c.Set("user_id", claims["user_id"])
			c.Set("email", claims["email"])
		}

		c.Next()
	}
}
