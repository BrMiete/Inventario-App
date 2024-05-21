const {Product} = require('../models/product.model');

module.exports.createProduct = (request, response) => {
    Product.create(request.body)
        .then(newProduct => response.json({product: newProduct}))
        .catch(error => response.status(500).json({message: "Something went wrong while creating a new product", error: error}));
}

module.exports.getAllProducts = (request, response) => {
    Product.find()
        .then(allProducts => response.json({products: allProducts}))
        .catch(error => response.status(500).json({message: "Something went wrong while finding all products", error}))
}

module.exports.getOneProduct = (request, response) => {
    Product.findOne({_id: request.params.id})
        .then(oneProduct => response.json({product: oneProduct}))
        .catch(error => response.status(500).json({message: "Something went wrong while finding a single product", error: error}))
}

module.exports.updateAProduct = (request, response) => {
    Product.findOneAndUpdate({_id: request.params.id}, request.body, {runValidators: true, new: true})
        .then(updatedProduct => response.json({product: updatedProduct}))
        .catch(error => response.status(500).json({message: "Something went wrong while updating the product", error: error}))
}

module.exports.deleteAProduct = (request, response) => {
    Product.deleteOne({_id: request.params.id})
        .then(deletedProduct => response.json({product: deletedProduct}))
        .catch(error => response.status(500).json({message: "Something went wrong while deleting the product", error: error}))
}