const mongoose = require('mongoose');
const {Schema} = mongoose;

const SoldProducts = new Schema({
    soldQuantity: {
        type: Number,
        required: [true, "Ingrese la cantidad"],
        min: [1, "La cantidad debe ser 1 como mínimo"]
    },
    soldDate: {
        type: Date,
        required: [true, "Ingrese la fecha de adquisición del producto"],
        validate: function(input) {
            return new Date(input) >= new Date();
        },
        // message: input => `La fecha ${input} debe ser posterior a hoy`
    },
    totalCost: {
        type: String
    }
})

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, "Ingrese el nombre del producto"],
        minlength: [3, "El nombre del producto debe tener 3 letras como mínimo"]
    },
    quantity: {
        type: Number,
        required: [true, "Ingrese la cantidad"],
        min: [0, "La cantidad debe ser 0 como mínimo"]
    },
    price: {
        type: Number,
        required: [true, "Ingrese el precio unitario del producto"],
        min: [500, "El precio mínimo debe ser de 500 guaraníes"]
    },
    date: {
        type: Date,
        required: [true, "Ingrese la fecha de adquisición del producto"],
        validate: function(input) {
            return typeof new Date(input) === 'date' && new Date(input) >= new Date();
        },
        message: input => `La fecha ${input} debe ser posterior a hoy`
    },
    description: {
        type: String,
        required: [true, "Ingrese una breve descripción del producto"],
        maxlength: [300, "La descripción no debe superar los 300 caracteres"]
    },
    sales: [SoldProducts]
}, {timestamps: true})

const Product = mongoose.model("Product", ProductSchema);

module.exports = {Product};