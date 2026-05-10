const express = require('express');
const { AuthMiddleWare, isAdmin } = require('../middleware/authMiddleware');
const { CreateCategory,  UpdateCategory, getallCategories, getSingleCategory, DeleteCategory } = require('../controllers/categoryController');

const route = express.Router();

route.post("/create-category",AuthMiddleWare,isAdmin,CreateCategory);

route.put("/update-category/:id",AuthMiddleWare,isAdmin,UpdateCategory);

route.get("/get-categories",getallCategories);

route.get("/get-category/:slug",getSingleCategory)

route.delete("/delete-category/:id",AuthMiddleWare, isAdmin, DeleteCategory )

module.exports = route;