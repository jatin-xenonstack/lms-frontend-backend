package handlers

import (
	"library-management1/database"
	"library-management1/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CheckUser(c *gin.Context) {
	type ExistUser struct {
		Email string `json:"email" binding:"required"`
	}
	var existUser ExistUser
	if err := c.ShouldBindJSON(&existUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var check models.User
	database.DB.Model(&models.User{}).Where("email = ?", existUser.Email).Find(&check)
	if check.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "User not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": check.ID})
}
