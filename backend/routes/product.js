// routes/product.js
const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const productController = require("../controllers/productController");


router.post("/", upload.single("image"), productController.create);
router.get("/", productController.getAll);
router.put("/:id", upload.single("image"), productController.update);
router.delete("/:id", productController.delete);
router.get('/:id', productController.getProductById);

module.exports = router;
