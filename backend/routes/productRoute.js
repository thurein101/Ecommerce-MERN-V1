const express = require("express");
const { AuthMiddleWare, isAdmin } = require("../middleware/authMiddleware");
const {
  createProductController,
  getAllProductsController,
  getSingleProductsController,
  getPhotoController,
  deleteProductController,
  updateProductController,
  filterProduct,
  countProduct,
  productList,
  searchFilterController,
  similarProduct,
  categoryList,
} = require("../controllers/productController");
const formidable = require("express-formidable");

const route = express.Router();

route.post(
  "/create-product",
  AuthMiddleWare,
  isAdmin,
  formidable({ maxFileSize: 5 * 1024 * 1024 }), // 5MB,
  createProductController,
);

route.get("/getall-products", getAllProductsController);

route.get("/getsingle-product/:slug", getSingleProductsController);

route.get("/product-photo/:pid", getPhotoController);

route.delete(
  "/delete-product/:pid",
  AuthMiddleWare,
  isAdmin,
  deleteProductController,
);

route.put(
  "/update-product/:pid",
  AuthMiddleWare,
   formidable({ multiples: false }),
  isAdmin,
  updateProductController,
);

//filter route 

route.post('/filter-product', filterProduct);

//counting product for pagination
route.get("/count-product", countProduct)

//product list based on page
route.get("/product-list/:page", productList);

//search filter 
route.get("/search-filter/:keyword", searchFilterController );

//related product
route.get("/similar-product/:pid/:cid",similarProduct) // it based on product and category 

//category-list after choosing type 
route.get('/category-list/:slug', categoryList )

module.exports = route;
