const express = require("express");
const router = express.Router();
const productController = require("../controller/products");

router.get("/", productController.getProducts);
router.post("/", productController.createProduct);
router.get("/:productId", productController.getProductsById);
router.put("/:productId", productController.getProductsByIdAndUpdate);

module.exports = router;
