package handlers

import (
	// "encoding/json"
	"library-management1/database"
	"library-management1/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// CreateLibrary handles the creation of a new library.
// @Summary Create a new library
// @Description Create a new library if it does not already exist
// @Tags libraries
// @Accept json
// @Produce json
// @Param Authorization header string true "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDE3NjU0NDEsImlkIjo5fQ.nyTxmaeg1AFFBmj1rBZ5GAvWl3A153mZXaNGiHYFUt8"
// @Param library body models.AuthLibrary true "Library to create"
// @Success 200 {object} models.Library "Library created successfully"
// @Failure 400 {object} string
// @Router /owner/create-library [post]
// @Security Bearer
func CreateLibrary(c *gin.Context) {
	// var authLibrary models.AuthLibrary
	type CreateAndAssign struct {
		Name  string `json:"name" binding:"required"`
		Email string `json:"email" binding:"required"`
	}
	var giveLibrary CreateAndAssign
	err := c.ShouldBindJSON(&giveLibrary)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var libraryFound models.Library
	database.DB.Where("name = ?", giveLibrary.Name).Find(&libraryFound)

	if libraryFound.ID != 0 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "library Already Exist"})
		return
	}

	var checkExistUser models.User
	database.DB.Where("email = ?", giveLibrary.Email).Find(&checkExistUser)
	if checkExistUser.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "User not found"})
		return
	}
	user, _ := c.Get("currentUser")
	var userData models.User
	userData = user.(models.User)

	var library models.LibraryUser
	// fmt.Println("name:", userData.Name)
	database.DB.Where("user_id = ?", userData.ID).Find(&library)
	// fmt.Println("lib", library.LibraryId)

	// To check there should be one admin only
	type adminUsers []struct {
		UserId int `json:"id"`
	}

	var users adminUsers
	database.DB.Table("library_users as lb").
		Select("lb.user_id").
		Joins("join libraries as l on lb.library_id = l.id").
		Joins("join users as u on u.id = lb.user_id").
		Where("l.id = ?", library.LibraryId).
		Where("u.role = ?", "admin").
		Find(&users)

	if len(users) != 0 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Admin is already assigned"})
		return
	}

	// to check already assigned a admin
	var checkAdmin models.User
	database.DB.Where("id = ?", checkExistUser.ID).Where("role = ?", "admin").Find(&checkAdmin)
	if checkAdmin.ID != 0 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "User is already Admin"})
		return
	}

	library_data := models.Library{
		Name: giveLibrary.Name,
	}

	database.DB.Create(&library_data)
	// user, _ := c.Get("currentUser")

	//took out library data
	var libraryData models.Library
	database.DB.Where("name = ?", library_data.Name).Find(&libraryData)

	// var userData models.User
	// userData = user.(models.User)

	userData.Role = "Owner"
	database.DB.Model(models.User{}).Where("id = ?", userData.ID).Update("Role", userData.Role)
	user_library := models.LibraryUser{
		UserId:    userData.ID,
		LibraryId: libraryData.ID,
	}
	database.DB.Create(&user_library)
	var userUpdate models.User
	database.DB.Where("ID = ?", userData.ID).Find(&userUpdate)

	c.Set("currentUser", userUpdate)

	checkUser, _ := c.Get("currentUser")
	var userAssign models.User
	userAssign = checkUser.(models.User)

	// var user models.User
	// userData = user.(models.User)
	if userAssign.Role == "Owner" {
		// var admin models.Admin
		// if err := c.ShouldBindJSON(&admin); err != nil {
		// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		// 	return
		// }
		// var changeRole models.User
		// database.DB.Where("id = ?", checkExistUser.ID).Find(&changeRole)
		// if changeRole.ID == 0 {
		// 	c.JSON(http.StatusBadRequest, gin.H{"message": "User do not exist"})
		// 	return
		// }

		database.DB.Model(models.User{}).Where("id = ?", checkExistUser.ID).Update("Role", "admin")
		libraryData := models.LibraryUser{
			UserId:    checkExistUser.ID,
			LibraryId: library.LibraryId,
		}
		database.DB.Create(&libraryData)
		c.JSON(http.StatusOK, gin.H{"message": "Admin Assigned Successfully"})
		c.Set("currentUser", userAssign)
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Request Rejected"})
	}

	// var userData models.User
	// userBytes, err := json.Marshal(user)
	// if err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	// if err := json.Unmarshal(userBytes, &userData); err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }
	// userData = user.(models.User)

	// c.JSON(http.StatusOK, gin.H{"data": libraryData})
}
