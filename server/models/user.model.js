const mongoose = require("mongoose");
const {Schema} = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "An username is required"],
        minlength: [5, "The username must be at least 5 characters long"] //puse 5 caracteres en vez de 10
    },
    password: {
        type: String,
        required: [true, "An user's password is required"],
        minlength: [8, "The user's last name must be at least 8 characters long"]
    }
})

const User =  mongoose.model("User", UserSchema);
//Mongoose utiliza el mismo nombre del modelo, para asignar el nombre de la colección, pero utiliza la palabra
//en plural y en minúsculas. En este caso: User --> users

module.exports = {
    User
    //Student: Student
}