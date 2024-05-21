const express = require('express');
const {
    createProduct,
    getAllProducts,
    getOneProduct,
    updateAProduct,
    deleteAProduct
} = require('../controllers/product.controller');
const { verifyToken } = require('../utils/oauth.util');
const router = express.Router();

//Agregar verifyToken
router.get("/", verifyToken, getAllProducts);
router.post("/nuevo", verifyToken, createProduct);
router.put("/:id", verifyToken, updateAProduct);
router.delete("/eliminar/:id", verifyToken, deleteAProduct);
router.get("/:id", verifyToken, getOneProduct);

module.exports = {
    productRouter: router
}